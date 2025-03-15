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

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  // Add explicit isAdmin computed property
  const isAdmin = computed(() => {
    console.log('Checking isAdmin:', user.value?.isAdmin)
    return Boolean(user.value?.isAdmin)
  })

  const isAuthenticated = computed(() => !!user.value)

  async function setUser(userData) {
    if (userData) {
      // Get the complete user profile including admin status
      const userProfile = await firebaseService.getUserProfile(userData.uid)
      console.log('User profile loaded:', userProfile)
      
      user.value = {
        ...userData,
        isAdmin: Boolean(userProfile?.isAdmin),
        ...userProfile
      }
      console.log('Updated user state:', user.value)
    } else {
      user.value = null
    }
  }

  // Initialize auth
  const auth = getAuth()
  
  // Monitor auth state
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    loading.value = false
  })

  // Register a new user
  const register = async (email, password, userData) => {
    try {
      error.value = null
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Create user profile in Firestore
      if (userData) {
        await firebaseService.createUserProfile(userCredential.user.uid, userData)
      }
      
      router.push('/')
      return userCredential
    } catch (e) {
      error.value = e.message
      throw e
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userData = await firebaseService.getUserProfile(userCredential.user.uid)
      
      // Initialize admin status if needed
      if (!userData?.adminUpdatedAt) {
        await adminSetup.initializeAdminStatus()
      }
      
      // Get fresh user data after potential admin setup
      const updatedUserData = await firebaseService.getUserProfile(userCredential.user.uid)
      
      user.value = {
        ...userCredential.user,
        ...updatedUserData,
        isAdmin: Boolean(updatedUserData?.isAdmin)
      }

      // Store admin status in localStorage for persistence
      if (user.value.isAdmin) {
        localStorage.setItem('userIsAdmin', 'true')
      }
      
      return user.value
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Add function to restore session
  async function restoreSession(firebaseUser) {
    if (!firebaseUser) return null

    try {
      // Get fresh user profile data
      const userProfile = await firebaseService.getUserProfile(firebaseUser.uid)
      
      user.value = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        isAdmin: Boolean(userProfile?.isAdmin),
        ...userProfile
      }

      // Update localStorage
      if (user.value.isAdmin) {
        localStorage.setItem('userIsAdmin', 'true')
      }

      return user.value
    } catch (error) {
      console.error('Error restoring session:', error)
      return null
    }
  }

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      localStorage.removeItem('userIsAdmin')
      router.push('/')
    } catch (e) {
      error.value = e.message
      throw e
    }
  }

  return { 
    user, 
    loading, 
    error, 
    register, 
    login, 
    logout,
    isAdmin,
    isAuthenticated,
    setUser,
    restoreSession
  }
})