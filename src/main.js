import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { imageErrorDirective } from './utils/imageUtils'
import { useAuthStore } from './stores/auth'

// Initialize app with pinia first for store access
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Register custom directive
app.directive('img-fallback', imageErrorDirective);

// Simple SPA navigation handler
const handleSpaNavigation = () => {
  // Check if we have a saved path
  const timestamp = sessionStorage.getItem('spaNavTimestamp');
  const savedPath = sessionStorage.getItem('spaPath');
  const savedSearch = sessionStorage.getItem('spaSearch') || '';
  const savedHash = sessionStorage.getItem('spaHash') || '';
  
  // Only proceed if we have necessary data
  if (!savedPath || !timestamp) {
    return; // No data to process
  }
  
  console.log(`SPA Navigation: Found saved path ${savedPath}${savedSearch}${savedHash}`);
  
  // Clear navigation data immediately to prevent loops
  sessionStorage.removeItem('spaNavTimestamp');
  sessionStorage.removeItem('spaPath');
  sessionStorage.removeItem('spaSearch');
  sessionStorage.removeItem('spaHash');
  
  // Verify it's recent (within last minute)
  if ((Date.now() - parseInt(timestamp)) < 60000) {
    const fullPath = savedPath + savedSearch + savedHash;
    
    // Don't redirect if we're already at the right place
    if (window.location.pathname !== savedPath) {
      console.log(`SPA Navigation: Redirecting to ${fullPath}`);
      
      // Use direct router navigation instead of the complex setup
      router.replace(fullPath).catch(err => {
        console.error('SPA Navigation error:', err);
      });
    }
  }
};

// Initialize the application
const initApp = async () => {
  // Initialize auth store before anything else
  const authStore = useAuthStore();
  try {
    await authStore.initAuth();
    console.log('Auth state initialized at app start:', authStore.user ? 'logged in' : 'not logged in');
  } catch (error) {
    console.error('Error initializing auth:', error);
  }
  
  // Wait for router to be ready before mounting
  await router.isReady();
  
  // Mount the app
  app.mount('#app');
  console.log('App mounted, checking for SPA navigation');
  
  // Handle SPA navigation after app is mounted
  setTimeout(() => {
    handleSpaNavigation();
  }, 0);
};

// Start the app
initApp().catch(err => {
  console.error('App initialization error:', err);
});