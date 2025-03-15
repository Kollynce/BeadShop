import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'
import { requireAdmin } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutUs.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    // Admin Routes
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboard.vue'),
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/AdminProductsView.vue'),
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/products/new',
      name: 'admin-product-new',
      component: () => import('../views/AdminProductForm.vue'),
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/products/edit/:id',
      name: 'admin-product-edit',
      component: () => import('../views/AdminProductForm.vue'),
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('../views/AdminOrders.vue'),
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/AdminUsersView.vue'),
      meta: { requiresAuth: true, isAdmin: true },
      beforeEnter: requireAdmin
    }
  ]
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login')
  } else if (to.meta.isAdmin && !isUserAdmin(authStore.user)) {
    // Redirect non-admin users trying to access admin pages
    next('/')
  } else {
    next()
  }
})

// Helper function to check if user is an admin
function isUserAdmin(user) {
  if (!user) return false
  return user.isAdmin === true
}

export default router
