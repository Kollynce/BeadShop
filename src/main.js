import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { imageErrorDirective } from './utils/imageUtils'

// Handle GitHub Pages redirect from 404.html
// Check if we're being redirected from the 404 page with path info
const redirectedQuery = window.location.search.match(/[?&]p=(.*)(?:&|$)/)
if (redirectedQuery) {
  // Get the path from the query parameter and use it for routing
  const path = redirectedQuery[1]
  
  // Create a clean URL by replacing the current history state
  window.history.replaceState(null, null, 
    import.meta.env.BASE_URL + path)
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register the custom directive
app.directive('img-fallback', imageErrorDirective)

app.mount('#app')