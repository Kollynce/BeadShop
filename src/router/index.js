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
      component: HomeView, // Use component instead of redirect
      beforeEnter: (to, from, next) => {
        console.log(`Not-found route triggered for: ${to.fullPath}`);
        // Avoid redirect if we're coming from a SPA navigation
        if (localStorage.getItem('preventHomeRedirect')) {
          localStorage.removeItem('preventHomeRedirect');
          next(false);
          return;
        }
        // Otherwise go to home
        //next('/');
      }
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

// More aggressive protection against unwanted redirects to home
router.beforeEach((to, from, next) => {
  // Log all navigations for debugging
  console.log(`Navigation requested: ${from.path} → ${to.path}`);
  
  // Block unwanted navigations to home
  if (to.path === '/' && from.path !== '/' && from.name !== undefined) {
    // Check if this navigation was recently blocked to avoid loops
    const lastBlockTime = window.__lastHomeBlockTime || 0;
    const now = Date.now();
    
    // Only block if we haven't recently blocked (prevent infinite loops)
    if (now - lastBlockTime > 500) {
      console.log(`⛔ Blocked unexpected navigation to home from ${from.path}`);
      window.__lastHomeBlockTime = now;
      next(false);
      return;
    }
  }
  
  // If navigation is in progress and we're trying to go home, prevent it
  if (window.__navigationInProgress && to.path === '/' && from.path !== '/') {
    console.log('Prevented unwanted redirect to home page during navigation');
    next(false);
    return;
  }
  
  // Check localStorage for navigation flag
  if (localStorage.getItem('preventHomeRedirect')) {
    // Only apply this prevention once
    localStorage.removeItem('preventHomeRedirect');
    
    if (to.path === '/' && from.name === undefined) {
      // We're at initial load and going to home, but we don't want that
      console.log('Initial navigation: preventing default route to home');
      next(false);
      return;
    }
  }
  
  next();
});

// Authentication and redirect handling
router.beforeEach(async (to, from, next) => {
  // Print current route for debugging
  console.log(`Auth check: Navigating from ${from.path} to ${to.path}`);
  
  const authStore = useAuthStore()
  
  // Try to restore the auth state if we don't have a user yet
  if (!authStore.user) {
    await authStore.initAuth();
  }
  
  // Check authentication requirements after potentially restoring auth
  if (to.meta.requiresAuth && !authStore.user) {
    console.log('Auth guard: Redirecting to login');
    // Store the intended destination to redirect after login
    sessionStorage.setItem('redirectAfterLogin', to.fullPath);
    next({ path: '/login', replace: true });
    return;
  }
  
  // Check admin requirements
  if (to.meta.isAdmin && !isUserAdmin(authStore.user)) {
    console.log('Admin guard: Redirecting to home');
    next({ path: '/', replace: true });
    return;
  }
  
  // Handle redirect after login
  if (to.path === '/login' && authStore.user) {
    const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/account';
    console.log(`User already logged in, redirecting to: ${redirectPath}`);
    sessionStorage.removeItem('redirectAfterLogin');
    next({ path: redirectPath });
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

// Fix the catch-all route
const catchAllRoute = router.options.routes.find(r => r.path === '/:pathMatch(.*)*');
if (catchAllRoute) {
  catchAllRoute.beforeEnter = (to, from, next) => {
    console.log(`Not-found route triggered for: ${to.fullPath}`);
    // Just display the 404 component without redirecting
    next();
  };
}

export default router
