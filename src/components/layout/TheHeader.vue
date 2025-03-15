<template>
  <div class="bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary transition-colors duration-200">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-light-secondary dark:bg-dark-secondary pb-12 shadow-xl">
              <div class="flex px-4 pt-5 pb-2">
                <button type="button" class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-light-neutral-500 dark:text-dark-neutral-500" @click="closeMobileMenu">
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="size-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <div class="space-y-6 px-4 py-6">
                <div class="flow-root">
                  <RouterLink to="/products" class="-m-2 block p-2 font-medium text-light-text-primary dark:text-dark-text-primary" @click="closeMobileMenu">Shop</RouterLink>
                </div>
                <div class="flow-root">
                  <RouterLink to="/about" class="-m-2 block p-2 font-medium text-light-text-primary dark:text-dark-text-primary" @click="closeMobileMenu">About Us</RouterLink>
                </div>
                <div class="flow-root">
                  <RouterLink to="/contact" class="-m-2 block p-2 font-medium text-light-text-primary dark:text-dark-text-primary" @click="closeMobileMenu">Contact</RouterLink>
                </div>
              </div>

              <div class="space-y-6 border-t border-light-neutral-300 dark:border-dark-neutral-600 px-4 py-6">
                <div class="flow-root">
                  <RouterLink v-if="!authStore.user" to="/login" class="-m-2 block p-2 font-medium text-light-text-primary dark:text-dark-text-primary" @click="closeMobileMenu">Sign in</RouterLink>
                  <div v-else class="space-y-2">
                    <div class="-m-2 block p-2 font-medium text-light-text-primary dark:text-dark-text-primary">{{ authStore.user.displayName || authStore.user.email }}</div>
                    <RouterLink to="/account" class="-m-2 block p-2 text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary pl-4" @click="closeMobileMenu">Account</RouterLink>
                    <RouterLink v-if="isAdmin" to="/admin" class="-m-2 block p-2 text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary pl-4" @click="closeMobileMenu">Shop Manager</RouterLink>
                    <RouterLink v-if="isAdmin" to="/admin/users" class="-m-2 block p-2 text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary pl-4" @click="closeMobileMenu">User Manager</RouterLink>
                    <button @click="logout" class="-m-2 block p-2 text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary pl-4 w-full text-left">Logout</button>
                  </div>
                </div>
                
                <!-- Theme toggle in mobile menu -->
                <div class="flow-root">
                  <button 
                    @click="toggleTheme" 
                    class="-m-2 flex items-center p-2 font-medium text-light-text-secondary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary"
                  >
                    <SunIcon v-if="themeStore.theme === 'dark'" class="h-5 w-5 mr-2 text-accent-primary" />
                    <MoonIcon v-else class="h-5 w-5 mr-2 text-dark-primary" />
                    <span>{{ themeStore.theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}</span>
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="sticky top-0 z-40 bg-light-primary dark:bg-dark-primary transition-colors duration-200">
      <!-- Announcement Bar - 10% accent color -->
      <p class="flex h-10 items-center justify-center bg-orange-600 dark:bg-orange-700 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" aria-live="polite">Free shipping on orders over KES 10,000</p>

      <div class="border-b border-light-neutral-300 dark:border-dark-neutral-600 bg-light-primary dark:bg-dark-primary shadow-sm transition-shadow duration-300" :class="{'shadow-md': isScrolled}">
        <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center">
            <button 
              type="button" 
              class="relative rounded-md bg-light-primary dark:bg-transparent p-2 text-light-neutral-500 dark:text-dark-neutral-500 hover:text-light-text-primary dark:hover:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md lg:hidden" 
              @click="toggleMobileMenu" 
              aria-expanded="false" 
              :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Toggle menu</span>
              <Bars3Icon class="size-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <RouterLink to="/" class="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md">
                <span class="sr-only">Beabed Art</span>
                <img :src="getPublicImageUrl('images/sticky.PNG')" alt="Beaded Art Logo" class="h-8 w-auto" />
              </RouterLink>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <RouterLink 
                  to="/products" 
                  class="flex items-center text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent-primary dark:hover:border-accent-primary py-2 text-light-text-primary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md" 
                  :class="{ 'border-orange-500 dark:border-orange-500 text-light-text-primary dark:text-dark-text-primary': isCurrentRoute('/products') }" 
                  active-class="border-orange-500 dark:border-orange-500 text-light-text-primary dark:text-dark-text-primary"
                >Shop</RouterLink>
                <RouterLink 
                  to="/about" 
                  class="flex items-center text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent-primary dark:hover:border-accent-primary py-2 text-light-text-primary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md" 
                  :class="{ 'border-orange-500 dark:border-orange-500 text-light-text-primary dark:text-dark-text-primary': isCurrentRoute('/about') }" 
                  active-class="border-orange-500 dark:border-orange-500 text-light-text-primary dark:text-dark-text-primary"
                >About Us</RouterLink>
                <RouterLink 
                  to="/contact" 
                  class="flex items-center text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent-primary dark:hover:border-accent-primary py-2 text-light-text-primary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md" 
                  :class="{ 'border-orange-500 dark:border-orange-500 text-light-text-primary dark:text-dark-text-primary': isCurrentRoute('/contact') }" 
                  active-class="border-orange-500 dark:border-orange-500 text-light-text-primary dark:text-dark-text-primary"
                >Contact</RouterLink>
                <RouterLink 
                  v-if="isAdmin" 
                  to="/admin/users" 
                  class="flex items-center text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent-primary dark:hover:border-accent-primary py-2 text-light-text-primary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md" 
                  :class="{ 'border-orange-500 dark:border-orange-500 text-light-text-primary dark:text-dark-text-primary': isCurrentRoute('/admin/users') }" 
                  active-class="border-orange-500 dark:border-orange-500 text-light-text-primary dark:text-dark-text-primary"
                >User Manager</RouterLink>
              </div>
            </div>

            <div class="ml-auto flex items-center">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <RouterLink 
                  v-if="!authStore.user" 
                  to="/login" 
                  class="text-sm font-medium text-light-text-primary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md transition-colors duration-200"
                >Sign in</RouterLink>
                <Menu v-else as="div" class="relative ml-3">
                  <div>
                    <MenuButton class="flex items-center text-sm font-medium text-light-text-primary dark:text-dark-neutral-700 hover:text-light-text-primary dark:hover:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md transition-colors duration-200">
                      <span class="sr-only">Open user menu for </span>
                      {{ authStore.user.displayName || authStore.user.email }}
                      <ChevronDownIcon class="ml-1 h-5 w-5" aria-hidden="true" />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-light-secondary dark:bg-dark-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem v-slot="{ active }">
                        <RouterLink to="/account" :class="[active ? 'bg-light-neutral-100 dark:bg-dark-neutral-700' : '', 'block px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary']">Account</RouterLink>
                      </MenuItem>
                      <MenuItem v-if="isAdmin" v-slot="{ active }">
                        <RouterLink to="/admin" :class="[active ? 'bg-light-neutral-100 dark:bg-dark-neutral-700' : '', 'block px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary']">Shop Manager</RouterLink>
                      </MenuItem>
                      <MenuItem v-if="isAdmin" v-slot="{ active }">
                        <RouterLink to="/admin/users" :class="[active ? 'bg-light-neutral-100 dark:bg-dark-neutral-700' : '', 'block px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary']">User Manager</RouterLink>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button @click="logout" :class="[active ? 'bg-light-neutral-100 dark:bg-dark-neutral-700' : '', 'block w-full text-left px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary']">Logout</button>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>

                <!-- Theme toggle for desktop - 10% accent color -->
                <button 
                  @click="toggleTheme" 
                  class="p-2 text-light-neutral-500 dark:text-dark-neutral-500 hover:text-accent-primary dark:hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  <SunIcon v-if="themeStore.theme === 'dark'" class="h-5 w-5" aria-hidden="true" />
                  <MoonIcon v-else class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <a href="#" class="p-2 text-light-neutral-500 dark:text-dark-neutral-500 hover:text-accent-primary dark:hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md">
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon class="size-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <RouterLink to="/cart" class="group -m-2 flex items-center p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:rounded-md">
                  <ShoppingBagIcon class="size-6 shrink-0 text-light-neutral-500 dark:text-dark-neutral-500 group-hover:text-accent-primary dark:group-hover:text-accent-primary" aria-hidden="true" />
                  <span v-if="itemCount > 0" class="ml-2 text-sm font-medium text-light-text-primary dark:text-dark-neutral-700 group-hover:text-accent-primary dark:group-hover:text-accent-primary">
                    {{ itemCount }}
                  </span>
                  <span class="sr-only">items in cart, view bag</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useThemeStore } from '@/stores/theme'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'
import { 
  Bars3Icon, 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  XMarkIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/vue/24/outline'
import { useRouter, useRoute } from 'vue-router'
import { getPublicImageUrl } from '@/utils/imageLoader';

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const themeStore = useThemeStore()
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const itemCount = computed(() => cartStore.itemCount)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleTheme = () => {
  themeStore.toggleTheme()
  closeMobileMenu()
}

const logout = async () => {
  await authStore.logout()
  closeMobileMenu()
  router.push('/')
}

const isCurrentRoute = (path) => {
  return route.path === path || (path !== '/' && route.path.startsWith(path))
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const isAdmin = computed(() => {
  return authStore.user?.isAdmin === true
})

// Close mobile menu when route changes or on large screens
onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      mobileMenuOpen.value = false
    }
  })
  
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* Add this to improve focus visibility only for keyboard navigation */
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}

/* Custom dark mode transitions */
html.dark {
  color-scheme: dark;
}

body {
  transition: background-color 0.3s ease;
}

.dark body {
  background-color: var(--color-dark-primary);
}
</style>