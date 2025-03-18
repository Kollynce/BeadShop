<template>
  <div 
    :class="[
      'fixed w-72 p-4 rounded-lg shadow-lg transform transition-all duration-300',
      'right-4 flex items-center gap-3',
      typeClasses[notification.type] || typeClasses.info,
      { 'opacity-0 translate-x-full': isExiting }
    ]"
    :style="{ top: `${4 + index * 5}rem` }"
  >
    <div class="shrink-0">
      <component :is="icons[notification.type] || icons.info" class="h-5 w-5" />
    </div>
    <div class="flex-1">
      <p v-if="notification.title" class="font-medium">{{ notification.title }}</p>
      <p class="text-sm">{{ notification.message }}</p>
    </div>
    <button @click="close" class="text-sm font-medium hover:opacity-75">
      ✕
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/solid';

const props = defineProps({
  notification: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['close']);

const isExiting = ref(false);

const icons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationTriangleIcon
};

const typeClasses = {
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  info: 'bg-blue-50 text-blue-800',
  warning: 'bg-yellow-50 text-yellow-800'
};

const close = () => {
  isExiting.value = true;
  setTimeout(() => {
    emit('close', props.notification.id);
  }, 300);
};

onMounted(() => {
  if (props.notification.timeout) {
    setTimeout(() => {
      close();
    }, props.notification.timeout);
  }
});
</script>
