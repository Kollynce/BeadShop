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
  
  // Clear navigation data immediately
  sessionStorage.removeItem('spaNavTimestamp');
  sessionStorage.removeItem('spaPath');
  sessionStorage.removeItem('spaSearch');
  sessionStorage.removeItem('spaHash');
  
  // Verify we have valid data and it's recent (within last minute)
  if (savedPath && timestamp && (Date.now() - parseInt(timestamp)) < 60000) {
    const fullPath = savedPath + savedSearch + savedHash;
    
    console.log(`SPA Navigation: Found saved path ${fullPath}`);
    
    if (router.currentRoute.value.fullPath === '/') {
      console.log(`SPA Navigation: Setting up redirect to ${fullPath}`);
      // Set up the redirect
      window.__spaRedirectInProgress = true;
      window.__spaRedirectPath = fullPath;
      
      // Force a navigation to trigger the guard
      router.replace('/').catch(e => console.error(e));
    }
  }
};

// Initialize the application
const initApp = async () => {
  // Initialize auth store
  const authStore = useAuthStore();
  await authStore.initAuth();
  
  // Wait for router to be ready before mounting
  await router.isReady();
  
  // Mount the app
  app.mount('#app');
  console.log('App mounted, checking for SPA navigation');
  
  // Handle SPA navigation after app is mounted
  handleSpaNavigation();
};

// Start the app
initApp().catch(err => {
  console.error('App initialization error:', err);
});