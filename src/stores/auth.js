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

// Add a property to track initialization
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isInitializing: true,
    loading: true,
    error: null
  }),
  actions: {
    async initialize() {
      console.log("Initializing auth state");
      this.isInitializing = true;
      
      try {
        // Your existing initialization logic
        // e.g. check localStorage, Firebase, etc.
        
        // Example:
        const savedUser = localStorage.getItem('user');
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
              
              // Important: set loading to false to indicate auth is ready
              this.loading = false;
              
              // If admin status is stored separately, ensure it's consistent
              if (localStorage.getItem('userIsAdmin') && !this.user.isAdmin) {
                this.user.isAdmin = true;
              }
              
              return true;
            }
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
          }
        }
        
        // No valid user data found
        this.loading = false;
        return false;
      } catch (error) {
        console.error('Error in auth initialization:', error);
        localStorage.removeItem('userData');
        this.user = null;
        this.loading = false;
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
        console.error('Login error:', error)
        this.error = error.message
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
        await signOut(auth)
        this.user = null
        localStorage.removeItem('userIsAdmin')
        localStorage.removeItem('userData')
        router.push('/')
      } catch (e) {
        this.error = e.message
        throw e
      }
    },

    async register(email, password, userData) {
      try {
        this.error = null
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        
        // Create user profile in Firestore
        if (userData) {
          await firebaseService.createUserProfile(userCredential.user.uid, userData)
        }
        
        router.push('/')
        return userCredential
      } catch (e) {
        this.error = e.message
        throw e
      }
    },

    async setUser(userData) {
      if (userData) {
        // Get the complete user profile including admin status
        const userProfile = await firebaseService.getUserProfile(userData.uid)
        console.log('User profile loaded:', userProfile)
        
        this.user = {
          ...userData,
          isAdmin: Boolean(userProfile?.isAdmin),
          ...userProfile
        }
        console.log('Updated user state:', this.user)
      } else {
        this.user = null
      }
    },

    async restoreSession(firebaseUser) {
      if (!firebaseUser) return null

      try {
        // Get fresh user profile data
        const userProfile = await firebaseService.getUserProfile(firebaseUser.uid)
        
        this.user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          isAdmin: Boolean(userProfile?.isAdmin),
          ...userProfile
        }

        // Update localStorage
        if (this.user.isAdmin) {
          localStorage.setItem('userIsAdmin', 'true')
        }

        return this.user
      } catch (error) {
        console.error('Error restoring session:', error)
        return null
      }
    },

    // Make sure this getter is properly defined and used
    getIsLoading() {
      return this.loading;
    }
  },
  getters: {
    isAdmin: (state) => {
      console.log('Checking isAdmin:', state.user?.isAdmin)
      return Boolean(state.user?.isAdmin)
    },
    isAuthenticated() {
      return !!this.user;
    },
    isAuthenticated: (state) => !!state.user
  }
})