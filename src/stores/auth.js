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

// Initialize Firebase auth instance at the module level
// This ensures it's only created once and available to all methods
const auth = getAuth();

// Add a property to track initialization
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isInitializing: true,
    loading: true,
    error: null,
    authChecked: false, // Track if auth has been checked
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
    
    // Update the login method to be more efficient
    async login(email, password) {
      try {
        // Set loading state
        this.loading = true;
        this.error = null;
    
        // First get user credentials - this is the critical path
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Set basic user data immediately for faster UI response
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          // Set a default non-admin status initially
          isAdmin: false
        };
        
        // Store this basic data immediately
        localStorage.setItem('userData', JSON.stringify(this.user));
        
        // Calculate redirect path early so we can return it
        const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/account';
        sessionStorage.removeItem('redirectAfterLogin');
        
        // Load additional profile data in the background
        this.loadUserProfileInBackground(userCredential.user.uid);
        
        return redirectPath;
      } catch (error) {
        console.error('Login error:', error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
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
    
    async register(email, password, userData) {
      try {
        this.error = null;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create user profile in Firestore
        if (userData) {
          await firebaseService.createUserProfile(userCredential.user.uid, userData);
        }
        
        router.push('/');
        return userCredential;
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