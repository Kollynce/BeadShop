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
import ShippingPolicyView from '@/views/ShippingPolicyView.vue'
import ReturnsExchangesView from '@/views/ReturnsExchangesView.vue'
import FAQsView from '@/views/FAQsView.vue'

const routes = [
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
  {
    path: '/notification-test',
    name: 'NotificationTest',
    component: () => import('@/views/NotificationTest.vue'),
    meta: {
      title: 'Notification Test'
    }
  },
  // Account routes
  {
    path: '/account/notifications',
    name: 'AccountNotifications',
    component: () => import('@/views/account/Notifications.vue'),
    meta: {
      requiresAuth: true,
      title: 'Notifications'
    }
  },
  // Privacy Policy Route
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('../views/PrivacyPolicyView.vue'),
    meta: { title: 'Privacy Policy' }
  },
  {
    path: '/shipping-policy',
    name: 'shipping-policy',
    component: ShippingPolicyView
  },
  {
    path: '/returns-exchanges',
    name: 'returns-exchanges',
    component: ReturnsExchangesView
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: FAQsView
  },
  // Catch-all route - must be last
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      console.log(`Not-found route triggered for: ${to.fullPath}`);
      
      // Check if this is a GitHub Pages SPA redirect
      if (to.query && Object.keys(to.query).length > 0 && to.query[0]?.startsWith('/')) {
        console.log('Detected GitHub Pages SPA redirect, handling specially');
        // Let the GitHub Pages redirect script handle it
        next(false);
        return;
      }
      
      // Regular 404, go to home
      next('/');
    }
  }
]

// Make sure the router instance is configured correctly
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true, // Enable strict mode for better path matching
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

// Clean up navigation guards - we need just one primary guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Skip auth checking for GitHub Pages SPA redirects
  if (window.location.search && window.location.search.startsWith('?/')) {
    console.log('GitHub Pages redirect in progress, skipping auth check');
    next();
    return;
  }

  // Try to initialize auth if not already done
  if (!authStore.user && !authStore.authChecked) {
    try {
      console.log('Initializing auth...');
      await authStore.initAuth();
    } catch (err) {
      console.error('Error initializing auth:', err);
    }
  }
  
  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      console.log(`Auth required for ${to.path}, redirecting to login`);
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }
    
    // Check for admin routes
    if (to.matched.some(record => record.meta.isAdmin) && !authStore.isAdmin) {
      console.log('Admin access denied');
      next('/');
      return;
    }
  }
  
  // Redirect already logged-in users away from login page
  if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    const redirectPath = to.query.redirect || '/account';
    console.log(`Already logged in, redirecting to ${redirectPath}`);
    next(redirectPath);
    return;
  }
  
  next();
});

export default router
