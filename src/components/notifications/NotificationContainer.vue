<template>
  <div class="fixed top-0 right-0 z-50 pointer-events-none">
    <div class="pointer-events-auto">
      <NotificationItem 
        v-for="(notification, index) in notifications" 
        :key="notification.id" 
        :notification="notification"
        :index="index"
        @close="removeNotification"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/stores/notification';
import NotificationItem from './NotificationItem.vue';

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);
const { removeNotification } = notificationStore;
</script>
