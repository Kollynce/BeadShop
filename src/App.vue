<template>
  <div class="min-h-screen flex flex-col bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary transition-colors duration-200">
    <TheHeader />
    
    <main class="flex-grow">
      <RouterView />
    </main>
    
    <TheFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './stores/auth'
import { firebaseService } from './services/firebaseService'

const themeStore = useThemeStore()
const auth = getAuth()
const authStore = useAuthStore()

// Make sure theme is applied right away
onMounted(async () => {
  // Re-apply theme to ensure it's properly set after hydration
  if (themeStore.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  try {
    // Seed default admin on app startup
    await firebaseService.seedDefaultAdmin()
  } catch (error) {
    console.error('Failed to seed default admin:', error)
  }

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // Restore the session including admin status
      await authStore.restoreSession(firebaseUser)
    } else {
      authStore.logout()
    }
  })
})
</script>

<style>
@import './assets/main.css';

/* Base theme variables using 60-30-10 color rule */
:root {
  /* Light Theme - 60% primary colors */
  --color-light-primary: #FFF5E1;
  --color-light-secondary: #F8F1E9;
  
  /* Light Theme - 30% secondary/neutral colors */
  --color-light-neutral-100: #F9F9F9;
  --color-light-neutral-500: #9A9A9A;
  --color-light-neutral-700: #4A4A4A;
  
  /* Light Theme - 10% accent colors */
  --color-light-accent: #FFD60A;
  --color-light-text-primary: #2A1B3D;
  --color-light-text-secondary: #6B4E9B;

  /* Dark Theme - 60% primary colors */
  --color-dark-primary: #2A1B3D;
  --color-dark-secondary: #3B2A50;
  
  /* Dark Theme - 30% secondary/neutral colors */
  --color-dark-neutral-200: #2C2C2C;
  --color-dark-neutral-700: #ADADAD;
  
  /* Dark Theme - 10% accent colors */
  --color-dark-accent: #FFD60A;
  --color-dark-text-primary: #F8F1E9;
  --color-dark-text-secondary: #DADADA;
  
  /* Shared accent colors - 10% */
  --color-accent-primary: #FFD60A; /* Yellow */
  --color-accent-secondary: #FF69B4; /* Pink */
  --color-accent-tertiary: #32CD32; /* Green */
  --color-accent-quaternary: #1E90FF; /* Blue */
  
  /* Button colors - Orange */
  --color-orange-500: #F97316;
  --color-orange-600: #EA580C;
  --color-orange-700: #C2410C;
}

html {
  transition: color-scheme 0.3s ease;
}

html.dark {
  color-scheme: dark;
}

body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
