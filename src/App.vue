<template>
  <div class="min-h-screen flex flex-col bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary transition-colors duration-200">
    <TheHeader />
    
    <main class="flex-grow">
      <RouterView />
    </main>
    
    <TheFooter />
    
    <!-- Add notification container -->
    <NotificationContainer />
    
    <!-- Cookie Consent Banner -->
    <div id="cookie-consent-banner" class="hidden fixed bottom-0 left-0 right-0 p-4 bg-black bg-opacity-90 text-white z-50 text-center">
      <div class="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <div class="flex-grow mr-4 text-left">
          <h3 class="text-lg font-bold">Cookie Notice</h3>
          <p class="text-sm">This website uses cookies to ensure you get the best experience. By continuing to use this site, you consent to our use of cookies. <RouterLink to="/privacy-policy" class="text-orange-400 hover:text-orange-300">Learn more</RouterLink></p>
        </div>
        <div class="flex gap-3">
          <button id="cookie-preferences" @click="showCookiePreferences" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-colors">Preferences</button>
          <button id="accept-cookies" @click="acceptAllCookies" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition-colors">Accept All</button>
          <button id="decline-cookies" @click="declineCookies" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded transition-colors">Decline</button>
        </div>
      </div>
    </div>

    <!-- Cookie Preferences Modal -->
    <Modal :show="cookiePreferencesVisible" :title="'Cookie Preferences'" @close="cookiePreferencesVisible = false">
      <div class="space-y-4 text-gray-800 dark:text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Necessary Cookies</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Required for the website to function properly</p>
          </div>
          <div class="relative inline-block w-10 align-middle">
            <input type="checkbox" class="toggle-checkbox absolute w-6 h-6 rounded-full bg-white appearance-none cursor-not-allowed" disabled checked />
            <div class="toggle-bg block h-6 w-10 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Functional Cookies</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Enable enhanced functionality and personalization</p>
          </div>
          <label class="relative inline-block w-10 align-middle cursor-pointer">
            <input type="checkbox" v-model="cookieConsent.functional" class="toggle-checkbox absolute w-6 h-6 rounded-full bg-white appearance-none cursor-pointer" />
            <div :class="['toggle-bg block h-6 w-10 rounded-full', cookieConsent.functional ? 'bg-green-500' : 'bg-gray-300']"></div>
          </label>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Analytics Cookies</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Help us improve by tracking site usage</p>
          </div>
          <label class="relative inline-block w-10 align-middle cursor-pointer">
            <input type="checkbox" v-model="cookieConsent.analytics" class="toggle-checkbox absolute w-6 h-6 rounded-full bg-white appearance-none cursor-pointer" />
            <div :class="['toggle-bg block h-6 w-10 rounded-full', cookieConsent.analytics ? 'bg-green-500' : 'bg-gray-300']"></div>
          </label>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Marketing Cookies</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Used for advertising and content personalization</p>
          </div>
          <label class="relative inline-block w-10 align-middle cursor-pointer">
            <input type="checkbox" v-model="cookieConsent.marketing" class="toggle-checkbox absolute w-6 h-6 rounded-full bg-white appearance-none cursor-pointer" />
            <div :class="['toggle-bg block h-6 w-10 rounded-full', cookieConsent.marketing ? 'bg-green-500' : 'bg-gray-300']"></div>
          </label>
        </div>
      </div>
      
      <template #footer>
        <div class="flex justify-end space-x-2">
          <button @click="cookiePreferencesVisible = false" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded">Cancel</button>
          <button @click="saveCookiePreferences" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded">Save Preferences</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './stores/auth'
import { firebaseService } from './services/firebaseService'
import NotificationContainer from './components/notifications/NotificationContainer.vue'
import Modal from './components/ui/Modal.vue'

const themeStore = useThemeStore()
const auth = getAuth()
const authStore = useAuthStore()

// Cookie consent state
const cookiePreferencesVisible = ref(false)
const cookieConsent = reactive({
  necessary: true, // Always required
  functional: false,
  analytics: false,
  marketing: false,
  lastUpdated: null
})

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

  // Detect user-initiated clicks on links
  document.addEventListener('click', event => {
    // Check if it's a link click
    const link = event.target.closest('a');
    if (link && link.href && (
      link.href.includes(window.location.origin + '/') || 
      link.getAttribute('href') === '/'
    )) {
      // Mark this as a user-initiated navigation
      window.__navIsUserAction = true;
      console.log('User clicked a link:', link.href);
      // Reset the flag after navigation completes (in case navigation doesn't happen)
      setTimeout(() => { window.__navIsUserAction = false; }, 500);
    }
  });

  // Detect user-initiated navigation to home
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href="/"]');
    if (link) {
      console.log('User clicked home link, marking as user action');
      // Mark as intentional navigation
      window.__navIsUserAction = true;
    }
  });
  
  // Cookie consent logic
  initCookieConsent();
})

// Cookie consent functionality
function initCookieConsent() {
  // Check if user has already made a choice
  const savedConsent = localStorage.getItem('cookieConsent');
  
  if (savedConsent) {
    try {
      // Handle both old string format and new JSON format
      if (savedConsent === 'accepted' || savedConsent === 'declined') {
        // Handle legacy string format
        if (savedConsent === 'accepted') {
          // If using old format with 'accepted', enable all cookies
          cookieConsent.functional = true;
          cookieConsent.analytics = true;
          cookieConsent.marketing = true;
          cookieConsent.lastUpdated = new Date().toISOString();
          
          // Migrate to new format
          localStorage.setItem('cookieConsent', JSON.stringify(cookieConsent));
          
          // Initialize services
          initializeAnalytics();
          initializeMarketing();
        }
      } else {
        // Parse saved preferences (new JSON format)
        const savedPreferences = JSON.parse(savedConsent);
        
        // Apply saved preferences to our state
        Object.assign(cookieConsent, savedPreferences);
        
        // Initialize services based on saved consent
        if (savedPreferences.analytics) {
          initializeAnalytics();
        }
        
        if (savedPreferences.marketing) {
          initializeMarketing();
        }
      }
    } catch (error) {
      console.error('Error parsing saved cookie consent:', error);
      showCookieBanner();
    }
  } else {
    // If no saved preference, show the banner
    showCookieBanner();
  }
}

function showCookieBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.classList.remove('hidden');
  }
}

function hideCookieBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.classList.add('hidden');
  }
}

function showCookiePreferences() {
  cookiePreferencesVisible.value = true;
}

async function acceptAllCookies() {
  // Enable all cookie types
  cookieConsent.functional = true;
  cookieConsent.analytics = true;
  cookieConsent.marketing = true;
  cookieConsent.lastUpdated = new Date().toISOString();
  
  // Save to localStorage
  localStorage.setItem('cookieConsent', JSON.stringify(cookieConsent));
  
  // Hide the banner
  hideCookieBanner();
  
  // Initialize all services
  initializeAnalytics();
  initializeMarketing();
  
  // Log consent to Firebase if user is logged in
  await saveConsentToFirebase('accept_all');
  
  console.log('All cookies accepted');
}

async function declineCookies() {
  // Disable optional cookies, keep necessary ones
  cookieConsent.functional = false;
  cookieConsent.analytics = false;
  cookieConsent.marketing = false;
  cookieConsent.lastUpdated = new Date().toISOString();
  
  // Save to localStorage
  localStorage.setItem('cookieConsent', JSON.stringify(cookieConsent));
  
  // Hide the banner
  hideCookieBanner();
  
  // Log consent to Firebase if user is logged in
  await saveConsentToFirebase('decline_all');
  
  console.log('Cookies declined');
}

async function saveCookiePreferences() {
  // Save current preferences
  cookieConsent.lastUpdated = new Date().toISOString();
  
  // Save to localStorage
  localStorage.setItem('cookieConsent', JSON.stringify(cookieConsent));
  
  // Hide the preferences modal and banner
  cookiePreferencesVisible.value = false;
  hideCookieBanner();
  
  // Initialize services based on preferences
  if (cookieConsent.analytics) {
    initializeAnalytics();
  }
  
  if (cookieConsent.marketing) {
    initializeMarketing();
  }
  
  // Log consent to Firebase if user is logged in
  await saveConsentToFirebase('custom_preferences');
  
  console.log('Cookie preferences saved', cookieConsent);
}

async function saveConsentToFirebase(consentType) {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    // Prepare consent data
    const consentData = {
      ...cookieConsent,
      consentType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language
    };
    
    if (currentUser) {
      // If user is logged in, associate consent with their ID
      await firebaseService.recordUserCookieConsent(currentUser.uid, consentData);
    } else {
      // For anonymous users, just store to localStorage
      // You could also store anonymous consent in Firebase with a generated ID if needed
      localStorage.setItem('cookieConsentDetails', JSON.stringify(consentData));
    }
  } catch (error) {
    console.error('Error saving consent to Firebase:', error);
  }
}

// Placeholder functions to initialize various services
function initializeAnalytics() {
  console.log('Analytics initialized based on consent');
  // Here you would initialize Google Analytics or similar services
}

function initializeMarketing() {
  console.log('Marketing cookies initialized based on consent');
  // Here you would initialize marketing/advertising related services
}
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

/* Cookie consent toggle switches */
.toggle-bg {
  position: relative;
  transition: background-color 0.2s;
}

.toggle-bg:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

input:checked + .toggle-bg:after {
  transform: translateX(100%);
}

/* Improved toggle switch styling */
.toggle-checkbox {
  transition: transform 0.3s ease;
  z-index: 10;
}

.toggle-checkbox:checked {
  transform: translateX(100%);
}

.toggle-bg {
  transition: background-color 0.3s ease;
  position: relative;
}
</style>
