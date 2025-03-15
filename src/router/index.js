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
    },
    // Catch-all route - must be last
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ],
  strict: true, // Enable strict mode for better path matching
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

// Authentication and redirect handling
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check authentication requirements
  if (to.meta.requiresAuth && !authStore.user) {
    next({ path: '/login', replace: true });
    return;
  }
  
  // Check admin requirements
  if (to.meta.isAdmin && !isUserAdmin(authStore.user)) {
    next({ path: '/', replace: true });
    return;
  }
  
  // All checks passed
  next();
})

// Helper function to check if user is an admin
function isUserAdmin(user) {
  if (!user) return false
  return user.isAdmin === true
}

// Handle initial SPA navigation
if (typeof window !== 'undefined') {
  // Initialize router with proper SPA navigation handling
  router.isReady().then(() => {
    const timestamp = sessionStorage.getItem('spaNavTimestamp');
    const savedPath = sessionStorage.getItem('spaPath');
    const savedSearch = sessionStorage.getItem('spaSearch') || '';
    const savedHash = sessionStorage.getItem('spaHash') || '';
    
    // Only process saved navigation if we're at the root and have saved data
    if (window.location.pathname === '/' && savedPath) {
      // Check if the saved navigation is recent (within last 5 seconds)
      const isRecent = timestamp && (Date.now() - parseInt(timestamp)) < 5000;
      
      if (isRecent) {
        // Clear the navigation data first to prevent loops
        sessionStorage.removeItem('spaPath');
        sessionStorage.removeItem('spaSearch');
        sessionStorage.removeItem('spaHash');
        sessionStorage.removeItem('spaNavTimestamp');
        
        // Reconstruct the full path
        const fullPath = savedPath + savedSearch + savedHash;
        
        // Use replace to avoid adding to history
        router.replace(fullPath).catch(err => {
          console.error('Navigation error:', err);
          // If navigation fails, stay on current page
        });
      }
    }
  });
}

export default router
