<script setup>
import { useCartStore } from '@/stores/cart'
import QuantitySelector from '@/components/product/QuantitySelector.vue'
import { Button } from '@headlessui/vue'
import { formatCurrency } from '../../utils/currency'
import { getImageUrl } from '@/utils/imageLoader'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const updateQuantity = (newQuantity) => {
  cartStore.updateQuantity(props.item.id, newQuantity)
}

const removeItem = () => {
  cartStore.removeFromCart(props.item.id)
}

// Process product image with multiple fallbacks similar to ProductCard
const processProductImage = () => {
  const defaultImage = getImageUrl('placeholder.jpg')
  
  // First try the item's images array if it exists
  if (props.item.images && props.item.images.length > 0) {
    const firstImage = props.item.images[0]
    
    // Handle both string and object formats
    if (typeof firstImage === 'string') {
      return processImageUrl(firstImage)
    } else if (firstImage.main) {
      return processImageUrl(firstImage.main)
    } else if (firstImage.url) {
      return processImageUrl(firstImage.url)
    }
  }
  
  // Then try individual image fields
  if (props.item.image) {
    return processImageUrl(props.item.image)
  }
  
  if (props.item.imageUrl) {
    return processImageUrl(props.item.imageUrl)
  }
  
  // If no product images found, use placeholder
  return defaultImage
}

// Process image URL function 
const processImageUrl = (url) => {
  if (!url) return null
  
  // Handle base64 images with the "base64://" prefix (from our upload function)
  if (typeof url === 'string' && url.startsWith('base64://')) {
    // Get the actual base64 data after the prefix
    const base64Data = url.replace('base64://', '')
    
    // Check if it already has a data URI prefix
    if (base64Data.startsWith('data:')) {
      return base64Data
    } else {
      // Add the proper data URI prefix
      return `data:image/jpeg;base64,${base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')}`
    }
  }
  
  // Handle direct base64 data
  if (typeof url === 'string' && (url.startsWith('data:image/') || url.indexOf(';base64,') !== -1)) {
    return url
  }
  
  // For normal URLs
  return url
}

// Handle image errors
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  
  // Use a locally hosted fallback image
  event.target.src = getImageUrl('placeholder.jpg')
  
  // If local fallback fails, use inline SVG as final fallback
  event.target.onerror = function() {
    const parent = event.target.parentNode
    if (parent) {
      const svgElement = document.createElement('div')
      svgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
          <rect width="100%" height="100%" fill="#f0f0f0"/>
          <path d="M12 6v12M6 12h12" stroke="#aaa" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
      svgElement.className = 'broken-image'
      parent.replaceChild(svgElement, event.target)
    }
  }
}
</script>

<template>
  <div class="flex items-center py-6 border-b border-light-neutral-200 dark:border-dark-neutral-700">
    <img 
      :src="processProductImage()" 
      :alt="item.name" 
      class="w-20 h-20 object-cover rounded-md"
      @error="handleImageError">
    
    <div class="ml-4 flex-grow">
      <h3 class="text-base font-medium text-light-text-primary dark:text-dark-text-primary">{{ item.name }}</h3>
      <p class="text-sm text-gray-600">{{ formatCurrency(item.price) }}</p>
    </div>
    
    <div class="flex items-center ml-4">
      <QuantitySelector
        :initial-value="item.quantity"
        @update:quantity="updateQuantity"
      />
      
      <Button 
        @click="removeItem"
        class="ml-4 text-red-500 hover:text-red-700"
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </Button>
    </div>
    
    <div class="text-right ml-4 w-24">
      <p class="font-medium">{{ formatCurrency(item.price * item.quantity) }}</p>
    </div>
  </div>
</template>

<style scoped>
.broken-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(243 244 246);
}

.dark .broken-image {
  background-color: rgb(31 41 55);
}
</style>
