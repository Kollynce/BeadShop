<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h1 class="text-2xl font-bold mb-6 text-light-text-primary dark:text-dark-text-primary">
      Notification System Test
    </h1>

    <!-- Firebase Index Warning -->
    <div 
      v-if="notificationStore.indexMissing" 
      class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6"
    >
      <div class="flex items-start">
        <ExclamationTriangleIcon class="h-6 w-6 text-yellow-500 mr-3" />
        <div>
          <p class="font-bold text-light-text-primary dark:text-dark-text-primary">
            Firebase Index Required
          </p>
          <p class="text-sm text-light-text-secondary dark:text-dark-neutral-400 mb-2">
            Firestore needs an index to query notifications properly. Until this is fixed, notifications cannot be loaded.
          </p>
          <button 
            @click="createIndex" 
            class="bg-orange-600 hover:bg-orange-700 text-white py-1 px-3 rounded text-sm"
          >
            Create Index Now
          </button>
          <p class="text-xs mt-2 text-light-text-tertiary dark:text-dark-neutral-500">
            You need to be logged into the Firebase Console with appropriate permissions.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-light-secondary dark:bg-dark-secondary rounded-lg shadow p-4 mb-6">
      <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">
        Create Test Notification
      </h2>

      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-neutral-400 mb-1">
            Title
          </label>
          <input
            v-model="form.title"
            type="text"
            class="w-full p-2 border rounded-md bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary border-light-neutral-300 dark:border-dark-neutral-600"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-neutral-400 mb-1">
            Type
          </label>
          <select
            v-model="form.type"
            class="w-full p-2 border rounded-md bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary border-light-neutral-300 dark:border-dark-neutral-600"
          >
            <option value="info">Information</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-neutral-400 mb-1">
          Message
        </label>
        <textarea
          v-model="form.message"
          rows="3"
          class="w-full p-2 border rounded-md bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary border-light-neutral-300 dark:border-dark-neutral-600"
        ></textarea>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          @click="createInAppNotification"
          class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Show In-App Notification
        </button>
        
        <button
          @click="createPersistedNotification"
          class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          :disabled="!authStore.user"
        >
          Create Persisted Notification
        </button>
        
        <button
          @click="reloadNotifications"
          class="px-4 py-2 bg-light-neutral-200 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary rounded-md hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary"
        >
          Reload Notifications
        </button>
      </div>
    </div>

    <div class="bg-light-secondary dark:bg-dark-secondary rounded-lg shadow p-4">
      <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">
        Current Notifications
      </h2>

      <div v-if="!authStore.user" class="mb-4 text-light-text-secondary dark:text-dark-neutral-400">
        <p>Log in to see your persisted notifications</p>
      </div>
      
      <div v-else-if="notificationStore.indexMissing" class="mb-4 text-light-text-secondary dark:text-dark-neutral-400">
        <p>Cannot load notifications until the Firestore index is created</p>
      </div>
      
      <div v-else-if="notificationStore.userNotifications.length === 0" class="text-light-text-secondary dark:text-dark-neutral-400">
        <p>You have no notifications yet</p>
      </div>
      
      <div v-else class="space-y-3">
        <div 
          v-for="notification in notificationStore.userNotifications" 
          :key="notification.id"
          class="p-3 border rounded-md"
          :class="{
            'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30': notification.type === 'info',
            'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/30': notification.type === 'success',
            'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30': notification.type === 'warning',
            'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30': notification.type === 'error'
          }"
        >
          <div class="flex justify-between">
            <div class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ notification.title }}</div>
            <div class="text-xs text-light-text-secondary dark:text-dark-neutral-400">
              {{ formatDate(notification.createdAt) }}
            </div>
          </div>
          <div class="mt-1 text-light-text-secondary dark:text-dark-neutral-400">{{ notification.message }}</div>
          <div class="mt-2 flex justify-between text-xs">
            <span>Status: {{ notification.read ? 'Read' : 'Unread' }}</span>
            <button 
              @click="markAsRead(notification)" 
              v-if="!notification.read"
              class="text-accent-primary hover:underline"
            >
              Mark as read
            </button>
          </div>
        </div>
      </div>
      
      <div class="mt-6 text-sm text-light-text-secondary dark:text-dark-neutral-400">
        <h3 class="font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Troubleshooting Tips</h3>
        <ul class="list-disc list-inside space-y-1">
          <li>If notifications aren't appearing, create the required Firestore index</li>
          <li>Make sure you're logged in to see your notifications</li>
          <li>Try creating a notification and then click "Reload Notifications"</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const form = ref({
  title: 'Test Notification',
  message: 'This is a test notification',
  type: 'info'
});

// Helper to open the index creation page
const createIndex = () => {
  notificationStore.openIndexCreationUrl();
};

// Format date for display
const formatDate = (date) => {
  if (!date) return '';
  
  if (!(date instanceof Date)) {
    try {
      date = new Date(date);
    } catch (e) {
      return 'Invalid date';
    }
  }
  
  return date.toLocaleString();
};

// Create temporary in-app notification
const createInAppNotification = () => {
  notificationStore.addNotification({
    title: form.value.title,
    message: form.value.message,
    type: form.value.type,
    timeout: 5000
  });
};

// Create persisted notification
const createPersistedNotification = async () => {
  if (!authStore.user) return;
  
  await notificationStore.addPersistedNotification({
    title: form.value.title,
    message: form.value.message,
    type: form.value.type,
    userId: authStore.user.uid
  });
  
  await reloadNotifications();
};

// Mark notification as read
const markAsRead = async (notification) => {
  await notificationStore.markAsRead(notification.id);
  await reloadNotifications();
};

// Reload notifications from Firestore
const reloadNotifications = async () => {
  if (!authStore.user) return;
  await notificationStore.loadUserNotifications();
};

// Initialize when component is mounted
onMounted(() => {
  if (authStore.user) {
    notificationStore.loadUserNotifications();
  }
});

// Watch for auth changes
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    notificationStore.loadUserNotifications();
  }
});
</script>
