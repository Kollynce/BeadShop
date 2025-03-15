<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationCircleIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/20/solid'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const errorMsg = ref('')
const loading = ref(false)
const passwordMismatch = ref(false)

const validatePasswordMatch = () => {
  if (confirmPassword.value && password.value !== confirmPassword.value) {
    passwordMismatch.value = true
  } else {
    passwordMismatch.value = false
  }
}

const handleSubmit = async () => {
  errorMsg.value = ''
  loading.value = true
  
  // Validate passwords match
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match'
    loading.value = false
    return
  }
  
  try {
    // Register user with additional profile data
    await authStore.register(email.value, password.value, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    })
    router.push('/')
  } catch (error) {
    errorMsg.value = error.message || 'Failed to register. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-light-primary dark:bg-dark-primary">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary">Create your account</h2>
      <p class="mt-2 text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
        Join our jewelry community today
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-light-secondary dark:bg-dark-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-light-neutral-300 dark:border-dark-neutral-600">
        <TransitionRoot appear :show="!!errorMsg">
          <div v-if="errorMsg" class="rounded-md bg-red-50 p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <ExclamationCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Registration Error</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ errorMsg }}</p>
                </div>
              </div>
            </div>
          </div>
        </TransitionRoot>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label for="firstName" class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">First name</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon class="h-5 w-5 text-light-neutral-500 dark:text-dark-neutral-500" aria-hidden="true" />
                </div>
                <input
                  id="firstName"
                  v-model="firstName"
                  type="text"
                  required
                  class="appearance-none block w-full pl-10 pr-3 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-md shadow-sm bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary placeholder-light-neutral-400 dark:placeholder-dark-neutral-500 focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                  placeholder="First name"
                />
              </div>
            </div>
            
            <div>
              <label for="lastName" class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Last name</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon class="h-5 w-5 text-light-neutral-500 dark:text-dark-neutral-500" aria-hidden="true" />
                </div>
                <input
                  id="lastName"
                  v-model="lastName"
                  type="text"
                  required
                  class="appearance-none block w-full pl-10 pr-3 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-md shadow-sm bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary placeholder-light-neutral-400 dark:placeholder-dark-neutral-500 focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Email address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="h-5 w-5 text-light-neutral-500 dark:text-dark-neutral-500" aria-hidden="true" />
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none block w-full pl-10 pr-3 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-md shadow-sm bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary placeholder-light-neutral-400 dark:placeholder-dark-neutral-500 focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                placeholder="Your email"
              />
            </div>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-light-neutral-500 dark:text-dark-neutral-500" aria-hidden="true" />
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                minlength="6"
                class="appearance-none block w-full pl-10 pr-3 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-md shadow-sm bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary placeholder-light-neutral-400 dark:placeholder-dark-neutral-500 focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                placeholder="Create password"
              />
            </div>
            <p class="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary">Password must be at least 6 characters</p>
          </div>
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Confirm Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-light-neutral-500 dark:text-dark-neutral-500" aria-hidden="true" />
              </div>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                minlength="6"
                @input="validatePasswordMatch"
                :class="[
                  'appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-light-neutral-400 dark:placeholder-dark-neutral-500 focus:ring-2 focus:outline-none',
                  passwordMismatch ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary'
                ]"
                placeholder="Confirm password"
              />
              <div v-if="passwordMismatch" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <p v-if="passwordMismatch" class="mt-2 text-sm text-red-600">Passwords don't match</p>
          </div>
          
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              :disabled="loading || passwordMismatch"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
        </form>
        
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-light-neutral-300 dark:border-dark-neutral-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-light-secondary dark:bg-dark-secondary text-light-text-secondary dark:text-dark-text-secondary">Already have an account?</span>
            </div>
          </div>
          <div class="mt-2 text-center">
            <RouterLink to="/login" class="font-medium text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500">Sign in instead</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
