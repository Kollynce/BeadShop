import { useAuthStore } from '../stores/auth'

export const requireAdmin = (to, from, next) => {
  const authStore = useAuthStore()
  console.log('Checking admin status:', {
    user: authStore.user,
    isAdmin: authStore.user?.isAdmin,
    authenticated: authStore.isAuthenticated
  })
  
  if (!authStore.isAuthenticated || !authStore.user?.isAdmin) {
    console.log('Access denied: User is not admin')
    next('/login')
    return
  }
  next()
}
