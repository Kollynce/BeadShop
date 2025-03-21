<template>
  <div class="container mx-auto px-4 py-6 max-w-6xl">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Notifications content -->
      <div class="flex-1">
        <div class="bg-light-secondary dark:bg-dark-secondary rounded-lg shadow">
          <div class="border-b border-light-neutral-200 dark:border-dark-neutral-700 px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                Notifications
              </h2>
              <div class="flex items-center space-x-2">
                <button 
                  @click="markAllAsRead" 
                  class="inline-flex items-center px-3 py-1.5 border border-orange-600 text-sm font-medium rounded-md text-orange-600 bg-white dark:bg-dark-secondary hover:bg-orange-600 hover:text-white transition-colors"
                  :disabled="!hasUnread"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="loading" class="px-4 py-8 sm:px-6 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-r-2 border-accent-primary"></div>
            <p class="mt-2 text-light-text-secondary dark:text-dark-neutral-400">Loading notifications...</p>
          </div>

          <div v-else-if="!authStore.user" class="px-4 py-8 sm:px-6 text-center">
            <p class="text-light-text-secondary dark:text-dark-neutral-400">Please sign in to view your notifications.</p>
            <RouterLink to="/login" class="mt-2 inline-block text-accent-primary hover:underline">Sign in</RouterLink>
          </div>

          <div v-else-if="notificationStore.indexMissing" class="px-4 py-8 sm:px-6 text-center">
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
              <div class="flex">
                <div class="shrink-0">
                  <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700 dark:text-yellow-200">
                    Database setup required. The notifications system needs a database index.
                  </p>
                  <div class="mt-2">
                    <button 
                      @click="createIndex"
                      class="px-2 py-1 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium"
                    >
                      Create Index
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="notificationStore.userNotifications.length === 0" class="px-4 py-8 sm:px-6 text-center">
            <div class="mb-4">
              <BellIcon class="h-12 w-12 text-light-neutral-400 dark:text-dark-neutral-500 mx-auto" />
            </div>
            <p class="text-light-text-secondary dark:text-dark-neutral-400">You don't have any notifications yet.</p>
          </div>

          <div v-else class="divide-y divide-light-neutral-200 dark:divide-dark-neutral-700">
            <div 
              v-for="notification in sortedNotifications" 
              :key="notification.id" 
              :class="[
                'px-4 py-4 sm:px-6 flex',
                notification.read ? 'bg-light-primary dark:bg-dark-primary' : 'bg-light-neutral-50 dark:bg-dark-secondary'
              ]"
            >
              <div class="shrink-0 pt-0.5">
                <component 
                  :is="notificationIcons[notification.type] || notificationIcons.info" 
                  :class="[
                    'h-6 w-6', 
                    notificationIconColors[notification.type] || notificationIconColors.info
                  ]" 
                  aria-hidden="true" 
                />
              </div>
              <div class="ml-4 flex-1">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ notification.title }}</p>
                  <p class="text-xs text-light-text-tertiary dark:text-dark-neutral-800">{{ formatDate(notification.createdAt) }}</p>
                </div>
                <p class="mt-1 text-light-text-secondary dark:text-light-secondary">{{ notification.message }}</p>
                <div class="mt-2 flex justify-between items-center">
                  <div class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="notificationBadgeClasses[notification.type] || notificationBadgeClasses.info">
                    {{ notification.type }}
                  </div>
                  <button 
                    v-if="!notification.read"
                    @click="markAsRead(notification)" 
                    class="text-sm text-orange-600 hover:underline"
                  >
                    Mark as read
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="notificationStore.userNotifications.length > 0" class="px-4 py-3 bg-light-tertiary dark:bg-dark-tertiary sm:px-6 flex justify-between items-center">
            <span class="text-sm text-light-text-secondary dark:text-dark-neutral-400">
              {{ unreadCount }} unread notifications
            </span>
            <!-- You can add pagination or load more functionality here if needed -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import { 
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const loading = ref(true);

// Icons and colors for different notification types
const notificationIcons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationTriangleIcon
};

const notificationIconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500'
};

const notificationBadgeClasses = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
};

// Sort notifications with unread first, then by date
const sortedNotifications = computed(() => {
  return [...notificationStore.userNotifications].sort((a, b) => {
    // First sort by read status (unread first)
    if (!a.read && b.read) return -1;
    if (a.read && !b.read) return 1;
    
    // Then sort by date (newest first)
    const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
    const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
    return dateB - dateA;
  });
});

// Count of unread notifications
const unreadCount = computed(() => {
  return notificationStore.userNotifications.filter(n => !n.read).length;
});

// Check if there are any unread notifications
const hasUnread = computed(() => unreadCount.value > 0);

// Format date for display
const formatDate = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const notifDate = new Date(date);
  
  // If today, show time
  if (notifDate.toDateString() === now.toDateString()) {
    return `Today at ${notifDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // If yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (notifDate.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${notifDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // If within last week
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  if (notifDate > oneWeekAgo) {
    const options = { weekday: 'long' };
    return `${notifDate.toLocaleDateString(undefined, options)} at ${notifDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // If this year
  if (notifDate.getFullYear() === now.getFullYear()) {
    const options = { month: 'short', day: 'numeric' };
    return notifDate.toLocaleDateString(undefined, options);
  }
  
  // Otherwise show full date
  return notifDate.toLocaleDateString();
};

// Mark a single notification as read
const markAsRead = async (notification) => {
  try {
    await notificationStore.markAsRead(notification.id);
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

// Mark all notifications as read
const markAllAsRead = async () => {
  try {
    const unreadNotifications = notificationStore.userNotifications.filter(n => !n.read);
    for (const notification of unreadNotifications) {
      await notificationStore.markAsRead(notification.id);
    }
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
  }
};

// Open Firebase index creation page
const createIndex = () => {
  if (notificationStore.indexCreationUrl) {
    window.open(notificationStore.indexCreationUrl, '_blank');
  } else {
    console.warn("Index creation URL is not available");
  }
};

// Load notifications when the component mounts if user is authenticated
onMounted(() => {
  if (authStore.user) {
    notificationStore.loadUserNotifications();
  }
  loading.value = false;
});

// Watch for auth changes to reload notifications
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    loading.value = true;
    notificationStore.loadUserNotifications();
    loading.value = false;
  }
});
</script>
