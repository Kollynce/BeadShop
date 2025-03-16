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

// Make sure the router instance is configured correctly
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

// Add navigation guards to properly handle auth state
router.beforeEach((to, from, next) => {
  // Get the current auth state - adapt this to your auth system
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Save the intended destination for redirect after login
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// REMOVE all existing navigation guards
// Only keep these two simple guards:

// 1. SPA Navigation Guard - Simple version
router.beforeEach((to, from, next) => {
  // If this is a navigation from SPA redirect
  if (window.__spaRedirectInProgress && from.path === '/' && to.path === '/') {
    const targetPath = window.__spaRedirectPath;
    console.log(`SPA redirect: Redirecting from home to ${targetPath}`);
    window.__spaRedirectInProgress = false;
    window.__spaRedirectPath = null;
    next(targetPath);
    return;
  }
  
  // Allow all other navigation
  next();
});

// Replace the authentication guard with this improved version
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthRequiredRoute = to.meta.requiresAuth === true;
  
  // Check for saved path to identify SPA reloads
  const isSpaReload = sessionStorage.getItem('spaPath') !== null;
  
  console.log(`Navigation: ${from.path} → ${to.path} (Auth required: ${isAuthRequiredRoute})`);
  console.log(`Auth state: ${authStore.user ? 'Logged in' : 'Not logged in'}`);
  
  // On first load or if user isn't available yet
  if (!authStore.user) {
    try {
      console.log('Auth not initialized yet, initializing...');
      const initialized = await authStore.initAuth();
      console.log(`Auth initialization result: ${initialized ? 'success' : 'no user found'}`);
    } catch (err) {
      console.error('Error initializing auth:', err);
    }
  }
  
  // For auth-required routes on direct access or SPA reload, ensure auth is fully processed
  if (isAuthRequiredRoute && (!from.name || isSpaReload)) {
    console.log('Protected route accessed directly, ensuring auth is initialized');
    
    // Double-check auth from localStorage with a small delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    if (!authStore.user) {
      // One last attempt to restore auth
      await authStore.initAuth();
      console.log(`Final auth check: ${authStore.user ? 'User found' : 'No user'}`);
    }
  }
  
  // After ensuring auth state is properly loaded, check requirements
  if (isAuthRequiredRoute && !authStore.user) {
    console.log(`Auth required for ${to.path}, redirecting to login`);
    sessionStorage.setItem('redirectAfterLogin', to.fullPath);
    next('/login');
    return;
  }
  
  // Check admin requirements
  if (to.meta.isAdmin && (!authStore.user || !authStore.user.isAdmin)) {
    console.log('Admin access denied');
    next('/');
    return;
  }
  
  // Redirect already logged-in users away from login page
  if (to.path === '/login' && authStore.user) {
    const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/account';
    sessionStorage.removeItem('redirectAfterLogin');
    console.log(`Already logged in, redirecting to ${redirectPath}`);
    next(redirectPath);
    return;
  }
  
  next();
});

// Fix the infinite redirect loop
router.beforeEach((to, from, next) => {
  console.log(`Navigation: ${from.path} → ${to.path} (Auth required: ${to.meta.requiresAuth || false})`);
  
  // Get auth state from your auth service
  const authStore = useAuthStore(); // Adjust this to how you access your auth store
  const isLoggedIn = authStore.isAuthenticated;
  
  console.log(`Auth state: ${isLoggedIn ? 'Logged in' : 'Not logged in'}`);
  
  // Handle initialization if needed
  if (authStore.isInitializing) {
    console.log('Auth not initialized yet, initializing...');
    // You might need to await authStore.initialize() here
    // For now, let's continue without blocking
  }

  // Case 1: Route requires auth and user is not logged in
  if (to.meta.requiresAuth && !isLoggedIn) {
    console.log('Auth required but not logged in, redirecting to login');
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
  
  // Case 2: Going to login page while already logged in
  if (to.path === '/login' && isLoggedIn) {
    // If there's a requested redirect, use it
    if (to.query.redirect) {
      console.log(`Already logged in, redirecting to ${to.query.redirect}`);
      return next(to.query.redirect);
    }
    
    // Otherwise redirect to account
    console.log('Already logged in, redirecting to /account');
    return next('/account');
  }
  
  // Case 3: Detect potential redirect loops
  if (from.path === '/account' && to.path === '/login' && isLoggedIn) {
    console.log('Detected redirect loop, forcing to home page');
    return next('/');
  }
  
  // Default: allow navigation
  return next();
});

// Make sure navigation guards properly check auth status
router.beforeEach((to, from, next) => {
  // Get the authentication state from your auth store or service
  const isAuthenticated = useAuthStore().user !== null;
  
  // If route requires auth and user is not authenticated
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

// Helper function to check if user is an admin
function isUserAdmin(user) {
  if (!user) return false;
  return user.isAdmin === true;
}

export default router
