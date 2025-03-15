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

app.mount('#app')