import { defineStore } from 'pinia'
import { ref } from 'vue'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { firebaseService } from '../services/firebaseService'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

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
      error.value = null
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
      return userCredential
    } catch (e) {
      error.value = e.message
      throw e
    }
  }

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (e) {
      error.value = e.message
      throw e
    }
  }

  return { user, loading, error, register, login, logout }
})