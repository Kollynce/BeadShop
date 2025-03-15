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
        next('/');
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

// Prevent unwanted redirects to home
router.beforeEach((to, from, next) => {
  // If navigation is in progress and we're trying to go home, prevent it
  if (window.__navigationInProgress && to.path === '/' && from.path !== '/') {
    console.log('Prevented unwanted redirect to home page');
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

// Authentication and redirect handling - keep this guard
router.beforeEach(async (to, from, next) => {
  // Print current route for debugging
  console.log(`Auth check: Navigating from ${from.path} to ${to.path}`);
  
  const authStore = useAuthStore()
  
  // Check authentication requirements
  if (to.meta.requiresAuth && !authStore.user) {
    console.log('Auth guard: Redirecting to login');
    next({ path: '/login', replace: true });
    return;
  }
  
  // Check admin requirements
  if (to.meta.isAdmin && !isUserAdmin(authStore.user)) {
    console.log('Admin guard: Redirecting to home');
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

export default router
