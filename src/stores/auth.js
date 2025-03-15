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

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
    error: null
  }),
  actions: {
    // Add this method to initialize auth from localStorage on page load
    async initAuth() {
      console.log('Initializing auth state');
      // If we already have a user, don't do anything
      if (this.user) return;
      
      try {
        // Try to get user data from localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log('Found stored user data, restoring session');
          this.user = parsedUser;
          
          // Optional: Verify the token with your backend
          // await this.verifyToken();
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
        // Clear potentially corrupt data
        localStorage.removeItem('userData');
        this.user = null;
      }
    },
    
    // Make sure login saves user data to localStorage
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const userData = await firebaseService.getUserProfile(userCredential.user.uid)
        
        // Initialize admin status if needed
        if (!userData?.adminUpdatedAt) {
          await adminSetup.initializeAdminStatus()
        }
        
        // Get fresh user data after potential admin setup
        const updatedUserData = await firebaseService.getUserProfile(userCredential.user.uid)
        
        this.user = {
          ...userCredential.user,
          ...updatedUserData,
          isAdmin: Boolean(updatedUserData?.isAdmin)
        }

        // Store admin status in localStorage for persistence
        if (this.user.isAdmin) {
          localStorage.setItem('userIsAdmin', 'true')
        }

        // After successful login, store user in localStorage
        if (this.user) {
          localStorage.setItem('userData', JSON.stringify(this.user));
        }
        
        // Handle redirect after login
        const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/account';
        if (redirectPath) {
          sessionStorage.removeItem('redirectAfterLogin');
          return redirectPath; // Return the path to redirect to
        }
        
        return '/account'; // Default redirect
      } catch (error) {
        console.error('Login error:', error)
        throw error
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
    }
  },
  getters: {
    isAdmin: (state) => {
      console.log('Checking isAdmin:', state.user?.isAdmin)
      return Boolean(state.user?.isAdmin)
    },
    isAuthenticated: (state) => !!state.user
  }
})