import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { imageErrorDirective } from './utils/imageUtils'

// Initialize app
const app = createApp(App)
app.use(createPinia())
app.use(router)

// Register the custom directive
app.directive('img-fallback', imageErrorDirective)

// Function to handle SPA navigation
const handleSpaNavigation = () => {
  const timestamp = sessionStorage.getItem('spaNavTimestamp');
  const savedPath = sessionStorage.getItem('spaPath');
  const savedSearch = sessionStorage.getItem('spaSearch') || '';
  const savedHash = sessionStorage.getItem('spaHash') || '';
  
  console.log(`SPA init - Found path: ${savedPath || 'none'}, timestamp: ${timestamp || 'none'}`);
  
  // Clear navigation data immediately to prevent reuse
  sessionStorage.removeItem('spaNavTimestamp');
  sessionStorage.removeItem('spaPath');
  sessionStorage.removeItem('spaSearch');
  sessionStorage.removeItem('spaHash');
  
  // Process saved navigation if we have a path
  if (savedPath && timestamp && (Date.now() - parseInt(timestamp)) < 60000) {
    const fullPath = savedPath + savedSearch + savedHash;
    console.log(`SPA navigation: Navigating to ${fullPath}`);
    
    if (router.currentRoute.value.fullPath !== fullPath) {
      // Use router.replace with a small delay to ensure it happens after initial navigation
      setTimeout(() => {
        router.replace(fullPath).catch(err => {
          console.error('Navigation error:', err);
        });
      }, 50); // Small delay to ensure router is fully initialized
    }
  }
};

// Wait for router to be ready before mounting
router.isReady().then(() => {
  console.log('Router ready, mounting app');
  app.mount('#app');
  
  // Handle SPA navigation after app mount
  handleSpaNavigation();
})