import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'
import { requireAdmin } from './guards'

// Import all views directly to avoid lazy loading issues on GitHub Pages
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AccountView from '../views/AccountView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import AboutUs from '../views/AboutUs.vue'
import ContactView from '../views/ContactView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AdminProductsView from '../views/AdminProductsView.vue'
import AdminProductForm from '../views/AdminProductForm.vue'
import AdminOrders from '../views/AdminOrders.vue'
import AdminUsersView from '../views/AdminUsersView.vue'

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
      component: ProductsView
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    // Admin Routes
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: AdminProductsView,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/products/new',
      name: 'admin-product-new',
      component: AdminProductForm,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/products/edit/:id',
      name: 'admin-product-edit',
      component: AdminProductForm,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrders,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUsersView,
      meta: { requiresAuth: true, isAdmin: true },
      beforeEnter: requireAdmin
    }
  ],
  strict: true // Enable strict mode for better path matching
})

// Simplified catch-all route
router.addRoute({
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  redirect: (to) => {
    // Clean redirect to home page without preserving query params
    return { path: '/' }
  }
})

// Improved navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.user) {
    // Redirect to login without preserving current URL
    next({ path: '/login' })
  } else if (to.meta.isAdmin && !isUserAdmin(authStore.user)) {
    // Redirect non-admin users to home without preserving URL
    next({ path: '/' })
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
