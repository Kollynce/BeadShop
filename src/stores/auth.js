import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { firebaseService } from '../services/firebaseService'
import router from '../router'
import { adminSetup } from '../utils/adminSetup'
import { useNotificationStore } from './notification'

// Initialize Firebase auth instance at the module level
const auth = getAuth();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isInitializing: true,
    loading: true,
    error: null,
    authChecked: false,
  }),
  actions: {
    async initialize() {
      console.log("Initializing auth state");
      this.isInitializing = true;
      
      try {
        // Your existing initialization logic
        // e.g. check localStorage, Firebase, etc.
        
        // Example:
        const savedUser = localStorage.getItem('userData');
        if (savedUser) {
          this.user = JSON.parse(savedUser);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        this.isInitializing = false;
      }
    },
    
    // Add or update the initAuth method
    async initAuth() {
      console.log('Initializing auth state');
      this.isInitializing = true;
      
      try {
        // Try to get user data from localStorage
        const userData = localStorage.getItem('userData');
        
        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            console.log(`Restored auth from localStorage: ${parsedData?.email || 'unknown'}`);
            
            // Only set if we have valid user data with uid
            if (parsedData && parsedData.uid) {
              this.user = parsedData;
              
              // If admin status is stored separately, ensure it's consistent
              if (localStorage.getItem('userIsAdmin') && !this.user.isAdmin) {
                this.user.isAdmin = true;
              }
              
              this.authChecked = true;
              this.loading = false;
              return true;
            }
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
          }
        }
        
        // If no valid user in localStorage, check Firebase auth state
        return new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            unsubscribe(); // Stop listening immediately
            
            if (firebaseUser) {
              console.log('Firebase user found:', firebaseUser.email);
              
              try {
                // Get user profile from Firebase
                const userProfile = await firebaseService.getUserProfile(firebaseUser.uid);
                
                this.user = {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName || userProfile?.displayName,
                  isAdmin: Boolean(userProfile?.isAdmin),
                  ...userProfile
                };
                
                // Store in localStorage
                localStorage.setItem('userData', JSON.stringify(this.user));
                if (this.user.isAdmin) {
                  localStorage.setItem('userIsAdmin', 'true');
                }
                
                resolve(true);
              } catch (error) {
                console.error('Error getting user profile:', error);
                this.user = null;
                resolve(false);
              }
            } else {
              console.log('No Firebase user found');
              this.user = null;
              resolve(false);
            }
            
            this.authChecked = true;
            this.loading = false;
            this.isInitializing = false;
          }, (error) => {
            console.error('Firebase auth state error:', error);
            this.authChecked = true;
            this.loading = false;
            this.isInitializing = false;
            resolve(false);
          });
          
          // Set a timeout in case Firebase is slow to respond
          setTimeout(() => {
            this.authChecked = true;
            this.loading = false;
            this.isInitializing = false;
            resolve(false);
          }, 3000);
        });
      } catch (error) {
        console.error('Error in auth initialization:', error);
        localStorage.removeItem('userData');
        this.user = null;
        this.loading = false;
        this.isInitializing = false;
        this.authChecked = true;
        return false;
      }
    },
    
    async login(email, password) {
      const notificationStore = useNotificationStore();
      try {
        this.loading = true;
        this.error = null;
    
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          isAdmin: false
        };
        
        localStorage.setItem('userData', JSON.stringify(this.user));
        
        const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/account';
        sessionStorage.removeItem('redirectAfterLogin');
        
        this.loadUserProfileInBackground(userCredential.user.uid);

        notificationStore.addNotification({
          title: 'Welcome Back',
          message: `Successfully signed in as ${email}`,
          type: 'success',
          timeout: 3000
        });
        
        return redirectPath;
      } catch (error) {
        console.error('Login error:', error);
        this.error = error.message;
        notificationStore.addNotification({
          title: 'Login Failed',
          message: error.message,
          type: 'error',
          timeout: 5000
        });
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      const notificationStore = useNotificationStore();
      try {
        const email = this.user?.email; // Store email before clearing user
        await signOut(auth);
        this.user = null;
        localStorage.removeItem('userIsAdmin');
        localStorage.removeItem('userData');
        
        notificationStore.addNotification({
          title: 'Signed Out',
          message: `Successfully signed out${email ? ` from ${email}` : ''}`,
          type: 'info',
          timeout: 3000
        });
        
        router.push('/');
      } catch (e) {
        this.error = e.message;
        notificationStore.addNotification({
          title: 'Error',
          message: `Failed to sign out: ${e.message}`,
          type: 'error',
          timeout: 5000
        });
        throw e;
      }
    },

    async register(email, password, userData) {
      const notificationStore = useNotificationStore();
      try {
        this.error = null;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        if (userData) {
          await firebaseService.createUserProfile(userCredential.user.uid, userData);
        }
        
        notificationStore.addNotification({
          title: 'Welcome!',
          message: `Account successfully created for ${email}`,
          type: 'success',
          timeout: 3000
        });

        // Create a persisted welcome notification for the new user
        await notificationStore.addPersistedNotification({
          title: 'Welcome to BeadShop',
          message: 'Thank you for joining our community! Feel free to explore our products and start shopping.',
          type: 'info',
          userId: userCredential.user.uid
        });
        
        router.push('/');
        return userCredential;
      } catch (e) {
        this.error = e.message;
        notificationStore.addNotification({
          title: 'Registration Failed',
          message: e.message,
          type: 'error',
          timeout: 5000
        });
        throw e;
      }
    },

    // New method to load user profile in the background
    async loadUserProfileInBackground(userId) {
      try {
        // Get user profile data
        const userData = await firebaseService.getUserProfile(userId);
        
        // Initialize admin status if needed - this can happen after redirect
        if (!userData?.adminUpdatedAt) {
          await adminSetup.initializeAdminStatus();
          
          // Get fresh user data after potential admin setup
          const updatedUserData = await firebaseService.getUserProfile(userId);
          
          // Update user data with admin status
          this.user = {
            ...this.user,
            ...updatedUserData,
            isAdmin: Boolean(updatedUserData?.isAdmin)
          };
        } else {
          // Just update with existing data
          this.user = {
            ...this.user,
            ...userData,
            isAdmin: Boolean(userData?.isAdmin)
          };
        }
        
        // Update localStorage with complete data
        localStorage.setItem('userData', JSON.stringify(this.user));
        
        // Store admin status separately for quick checks
        if (this.user.isAdmin) {
          localStorage.setItem('userIsAdmin', 'true');
        }
        
        console.log('User profile loaded in background');
      } catch (error) {
        console.error('Error loading user profile in background:', error);
      }
    },
    
    // Make sure logout clears localStorage
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        localStorage.removeItem('userIsAdmin');
        localStorage.removeItem('userData');
        router.push('/');
      } catch (e) {
        this.error = e.message;
        throw e;
      }
    },
    
    async setUser(userData) {
      if (userData) {
        // Get the complete user profile including admin status
        const userProfile = await firebaseService.getUserProfile(userData.uid);
        console.log('User profile loaded:', userProfile);
        
        this.user = {
          ...userData,
          isAdmin: Boolean(userProfile?.isAdmin),
          ...userProfile
        };
        console.log('Updated user state:', this.user);
      } else {
        this.user = null;
      }
    },
    
    async restoreSession(firebaseUser) {
      if (!firebaseUser) return null;
      try {
        // Get fresh user profile data
        const userProfile = await firebaseService.getUserProfile(firebaseUser.uid);
        
        this.user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          isAdmin: Boolean(userProfile?.isAdmin),
          ...userProfile
        };
        // Update localStorage
        if (this.user.isAdmin) {
          localStorage.setItem('userIsAdmin', 'true');
        }
        return this.user;
      } catch (error) {
        console.error('Error restoring session:', error);
        return null;
      }
    },

    async updateProfile(userData) {
      const notificationStore = useNotificationStore()
      this.loading = true
      
      try {
        await firebaseService.updateUserProfile(this.user.uid, userData)
        // Update local user data
        this.user = { ...this.user, ...userData }
        
        notificationStore.addNotification({
          title: 'Profile Updated',
          message: 'Your profile has been updated successfully',
          type: 'success',
          timeout: 3000
        })
        return true
      } catch (error) {
        console.error('Profile update error:', error)
        notificationStore.addNotification({
          title: 'Update Failed',
          message: 'Failed to update profile. Please try again.',
          type: 'error',
          timeout: 5000
        })
        return false
      } finally {
        this.loading = false
      }
    }
  },
  getters: {
    isAdmin: (state) => {
      return Boolean(state.user?.isAdmin);
    },
    isAuthenticated: (state) => {
      return Boolean(state.user);
    },
    getUser: (state) => {
      return state.user;
    }
  }
});