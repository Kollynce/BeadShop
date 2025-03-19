<template>
  <div class="bg-white dark:bg-dark-secondary rounded-lg shadow-md p-5 mb-5">
    <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">Email Verification Status</h3>
    
    <div v-if="loading" class="flex items-center justify-center py-4">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
      <span class="ml-2 text-light-text-secondary dark:text-dark-text-secondary">Checking status...</span>
    </div>
    
    <div v-else>
      <div v-if="isVerified" class="flex items-center text-green-600 dark:text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>Your email address has been verified.</span>
      </div>
      
      <div v-else>
        <div class="flex items-center text-amber-600 dark:text-amber-500 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span>Your email address is not verified.</span>
        </div>
        
        <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4">
          Please verify your email address to access all features of this website. 
          A verification link has been sent to <strong>{{ userEmail }}</strong>.
        </p>
        
        <button 
          @click="resendVerificationEmail" 
          class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="resendLoading"
        >
          <div v-if="resendLoading" class="flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Sending...
          </div>
          <span v-else>Resend Verification Email</span>
        </button>
        
        <div v-if="cooldown > 0" class="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          You can request another email in {{ cooldown }} seconds.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const loading = ref(true);
const resendLoading = ref(false);
const cooldown = ref(0);
let cooldownTimer = null;

const userEmail = computed(() => {
  return authStore.user?.email || '';
});

const isVerified = computed(() => {
  return authStore.isEmailVerified;
});

const checkVerificationStatus = async () => {
  loading.value = true;
  try {
    await authStore.checkEmailVerification();
  } catch (error) {
    console.error('Error checking verification status:', error);
  } finally {
    loading.value = false;
  }
};

const resendVerificationEmail = async () => {
  if (cooldown.value > 0 || resendLoading.value) return;
  
  resendLoading.value = true;
  try {
    await authStore.sendVerificationEmail();
    // Start cooldown of 60 seconds
    cooldown.value = 60;
    startCooldownTimer();
  } catch (error) {
    console.error('Error resending verification email:', error);
  } finally {
    resendLoading.value = false;
  }
};

const startCooldownTimer = () => {
  // Clear any existing timer
  if (cooldownTimer) clearInterval(cooldownTimer);
  
  // Start a new timer that counts down every second
  cooldownTimer = setInterval(() => {
    cooldown.value -= 1;
    if (cooldown.value <= 0) {
      clearInterval(cooldownTimer);
      cooldownTimer = null;
    }
  }, 1000);
};

onMounted(async () => {
  await checkVerificationStatus();
});

onBeforeUnmount(() => {
  // Clean up timer when component is destroyed
  if (cooldownTimer) clearInterval(cooldownTimer);
});
</script>