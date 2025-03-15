import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { imageErrorDirective } from './utils/imageUtils'
import { useAuthStore } from './stores/auth'

// Initialize app
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Register the custom directive
app.directive('img-fallback', imageErrorDirective)

// Initialize auth before app mount and navigation
const initApp = async () => {
  // Initialize the auth store
  const authStore = useAuthStore();
  await authStore.initAuth();
  
  // Function to handle SPA navigation
  const handleSpaNavigation = () => {
    const timestamp = sessionStorage.getItem('spaNavTimestamp');
    const savedPath = sessionStorage.getItem('spaPath');
    const savedSearch = sessionStorage.getItem('spaSearch') || '';
    const savedHash = sessionStorage.getItem('spaHash') || '';
    
    console.log(`SPA init - Found path: ${savedPath || 'none'}, timestamp: ${timestamp || 'none'}`);
    console.log(`Current route: ${router.currentRoute.value.fullPath}`);
    
    // Clear navigation data immediately to prevent reuse
    sessionStorage.removeItem('spaNavTimestamp');
    sessionStorage.removeItem('spaPath');
    sessionStorage.removeItem('spaSearch');
    sessionStorage.removeItem('spaHash');
    
    // Process saved navigation if we have a path
    if (savedPath && timestamp && (Date.now() - parseInt(timestamp)) < 60000) {
      const fullPath = savedPath + savedSearch + savedHash;
      console.log(`SPA navigation: Planning to navigate to ${fullPath}`);
      
      // Store a flag in localStorage to prevent further redirects
      localStorage.setItem('preventHomeRedirect', 'true');
      
      if (router.currentRoute.value.fullPath !== fullPath) {
        // Increase delay to ensure router is fully stable before navigation
        setTimeout(() => {
          console.log(`SPA navigation: Now navigating to ${fullPath}`);
          router.replace(fullPath).then(() => {
            console.log(`After navigation, route is: ${router.currentRoute.value.fullPath}`);
            // Set a flag to prevent further redirects for 2 seconds
            window.__navigationInProgress = true;
            setTimeout(() => {
              window.__navigationInProgress = false;
            }, 2000);
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        }, 200); // Increased delay
      }
    } else {
      // Clear localStorage flag if we're not coming from a redirect
      localStorage.removeItem('preventHomeRedirect');
    }
  };

  // Wait for router to be ready before mounting
  await router.isReady();
  console.log('Router ready, mounting app');
  
  // Add global error handler to prevent API errors from causing redirects
  window.addEventListener('error', function(event) {
    // Check if this is a script error (like Google Maps)
    if (event.target && event.target.tagName === 'SCRIPT') {
      console.log('Caught script error, preventing default behavior');
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  
  // Patch the router to prevent programmatic navigations to home
  const originalPush = router.push;
  const originalReplace = router.replace;
  
  router.push = function(location, onComplete, onAbort) {
    if (typeof location === 'string' && location === '/') {
      console.log('⚠️ Caught programmatic navigation to home page, checking stack trace');
      console.trace('Navigation stack trace');
      
      // Allow navigation if it's explicitly intended
      if (window.__allowHomeNavigation) {
        window.__allowHomeNavigation = false;
        return originalPush.call(this, location, onComplete, onAbort);
      }
      
      console.log('⛔ Blocked programmatic navigation to home');
      return Promise.resolve(false);
    }
    return originalPush.call(this, location, onComplete, onAbort);
  };
  
  router.replace = function(location, onComplete, onAbort) {
    if (typeof location === 'string' && location === '/') {
      console.log('⚠️ Caught programmatic replace to home page, checking stack trace');
      console.trace('Navigation stack trace');
      
      // Allow navigation if it's explicitly intended
      if (window.__allowHomeNavigation) {
        window.__allowHomeNavigation = false;
        return originalReplace.call(this, location, onComplete, onAbort);
      }
      
      console.log('⛔ Blocked programmatic replace to home');
      return Promise.resolve(false);
    }
    return originalReplace.call(this, location, onComplete, onAbort);
  };
  
  app.mount('#app');
  
  // Handle SPA navigation after app mount
  handleSpaNavigation();
};

// Start app initialization
initApp();