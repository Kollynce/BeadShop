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
router.isReady().then(() => {
  console.log('Router ready, mounting app');
  app.mount('#app');
  
  // Handle SPA navigation after app mount
  handleSpaNavigation();
})