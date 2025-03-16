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

// Improve the initialization sequence
const initApp = async () => {
  // Initialize auth store first thing
  const authStore = useAuthStore();
  
  console.log('Starting app initialization');
  
  try {
    // Initialize auth synchronously to block until complete
    const authResult = await authStore.initAuth();
    console.log(`Auth initialization complete: ${authResult ? 'User loaded' : 'No user'}`);
  } catch (error) {
    console.error('Auth initialization error:', error);
  }
  
  // Wait for router to be ready
  await router.isReady();
  console.log('Router is ready');
  
  // Mount the app
  app.mount('#app');
  console.log('App mounted');
  
  // Give a moment for component initialization before handling SPA navigation
  setTimeout(() => {
    handleSpaNavigation();
  }, 50);
};

// Start the app
initApp().catch(err => {
  console.error('App initialization error:', err);
});

let initialized = false;

const initializeApp = async () => {
  if (initialized) return;
  console.log('Starting app initialization');
  
  await initAuth();
  console.log('Auth initialization complete');
  
  await router.isReady();
  console.log('Router is ready');
  
  initialized = true;
};

initializeApp().catch(error => {
  console.error('Failed to initialize app:', error);
});