<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  alt: {
    type: String,
    default: 'Product image'
  }
})

// If a single image string is passed, convert to array
const imageArray = computed(() => {
  if (typeof props.images === 'string') {
    return [props.images]
  }
  
  // If image array is empty, use a placeholder
  if (!props.images.length) {
    return ['https://via.placeholder.com/500x500?text=No+Image+Available']
  }
  
  return props.images
})

const selectedImage = ref(0)

const selectImage = (index) => {
  selectedImage.value = index
}
</script>

<template>
  <div>
    <!-- Main image display -->
    <div class="mb-4">
      <img 
        :src="imageArray[selectedImage]" 
        :alt="alt"
        class="w-full h-96 object-cover rounded-lg"
      >
    </div>
    
    <!-- Thumbnail navigation -->
    <div v-if="imageArray.length > 1" class="flex space-x-2 overflow-x-auto pb-2">
      <button 
        v-for="(image, index) in imageArray" 
        :key="index"
        @click="selectImage(index)"
        :class="[
          'w-20 h-20 rounded-md focus:outline-none',
          { 'ring-2 ring-black': selectedImage === index }
        ]"
      >
        <img 
          :src="image" 
          :alt="`${alt} thumbnail ${index + 1}`"
          class="w-full h-full object-cover rounded-md"
        >
      </button>
    </div>
  </div>
</template>
