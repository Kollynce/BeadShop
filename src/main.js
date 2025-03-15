import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { imageErrorDirective } from './utils/imageUtils'

// SPA navigation handling - must happen before app mount
if (typeof window !== 'undefined') {
  const timestamp = sessionStorage.getItem('spaNavTimestamp');
  const savedPath = sessionStorage.getItem('spaPath');
  const savedSearch = sessionStorage.getItem('spaSearch') || '';
  const savedHash = sessionStorage.getItem('spaHash') || '';
  
  // Clear navigation data immediately to prevent reuse
  sessionStorage.removeItem('spaNavTimestamp');
  sessionStorage.removeItem('spaPath');
  sessionStorage.removeItem('spaSearch');
  sessionStorage.removeItem('spaHash');
  
  // Store the intended path in a global variable for the router to use
  if (savedPath && timestamp && (Date.now() - parseInt(timestamp)) < 60000) {
    window.__spaNavigateTo = savedPath + savedSearch + savedHash;
    console.log(`SPA navigation: Will navigate to ${window.__spaNavigateTo}`);
  }
}

// Initialize app
const app = createApp(App)
app.use(createPinia())
app.use(router)

// Register the custom directive
app.directive('img-fallback', imageErrorDirective)

// Wait for router to be ready before mounting
router.isReady().then(() => {
  app.mount('#app')
})