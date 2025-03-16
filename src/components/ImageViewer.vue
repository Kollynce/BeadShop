<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/80" @click.self="close">
    <div class="absolute top-4 right-4 z-50">
      <button @click="close" class="p-2 text-white hover:text-accent-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="flex h-full items-center justify-center p-4">
      <button @click="previousImage" class="absolute left-4 p-2 text-white hover:text-accent-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <img :src="currentImage" :alt="alt" class="max-h-full max-w-full object-contain" />
      
      <button @click="nextImage" class="absolute right-4 p-2 text-white hover:text-accent-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  alt: {
    type: String,
    default: 'Product image'
  }
});

const emit = defineEmits(['update:currentIndex', 'close']);

const currentImage = ref(props.images[props.currentIndex]);

watch(() => props.currentIndex, (newIndex) => {
  currentImage.value = props.images[newIndex];
});

const nextImage = () => {
  const newIndex = (props.currentIndex + 1) % props.images.length;
  emit('update:currentIndex', newIndex);
};

const previousImage = () => {
  const newIndex = (props.currentIndex - 1 + props.images.length) % props.images.length;
  emit('update:currentIndex', newIndex);
};

const close = () => {
  emit('close');
};
</script>
