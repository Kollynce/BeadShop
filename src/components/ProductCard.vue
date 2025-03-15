<template>
  <div class="group relative bg-light-primary dark:bg-dark-primary rounded-lg shadow hover:shadow-lg transition-all duration-300">
    <!-- Animation element for cart add effect -->
    <div 
      v-if="animatingItem" 
      class="cart-animation fixed pointer-events-none z-50" 
      ref="cartAnimationEl"
      :style="{ backgroundImage: `url(${animatingItem?.imageUrl || animatingItem?.image})` }">
    </div>
    
    <router-link :to="`/product/${product.id}`" class="cursor-pointer block">
      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg">
        <img 
          :src="imageUrl" 
          :alt="product.name"
          v-img-fallback
          class="h-60 w-full object-cover object-center group-hover:opacity-90" 
          @error="handleImageError">
      </div>
      <div class="p-4">
        <div class="items-start">
          <h3 class="text-light-text-primary dark:text-dark-text-primary text-lg font-medium hover:text-accent-primary">{{ product.name }}</h3>
          <p class="text-light-text-secondary dark:text-dark-text-secondary text-sm">{{ product.category }}</p>
          <div class="mt-2 flex items-center justify-between">
            <p class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
              {{ formatCurrency(product.price) }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
    <div class="px-4 pb-4">
      <button @click="addToCart(product)" 
          class="w-full bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white py-2 rounded-btn shadow-btn hover:shadow-btn-hover transition-btn text-sm font-medium">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/currency';
import { getImageUrl } from '@/utils/imageLoader';

// Update component props to accept processImageUrl function
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  processImageUrl: {
    type: Function,
    default: url => url // Default function just returns the URL unchanged
  }
});

const cartStore = useCartStore();
const animatingItem = ref(null);
const cartAnimationEl = ref(null);

const addToCart = async (product) => {
  // Get button position as starting point
  const buttonRect = event.target.getBoundingClientRect();
  const startX = buttonRect.left + (buttonRect.width / 2);
  const startY = buttonRect.top + (buttonRect.height / 2);
  
  // Get cart icon position as ending point
  const cartIcon = document.querySelector('.group-hover\\:text-gray-500') || 
                  document.querySelector('a[href="/cart"] svg');
  let endX = window.innerWidth - 60;
  let endY = 20;
  
  if (cartIcon) {
    const cartRect = cartIcon.getBoundingClientRect();
    endX = cartRect.left + (cartRect.width / 2);
    endY = cartRect.top + (cartRect.height / 2);
  }
  
  // Start animation
  animatingItem.value = product;
  
  await nextTick();
  if (cartAnimationEl.value) {
    // Set initial position
    cartAnimationEl.value.style.top = `${startY}px`;
    cartAnimationEl.value.style.left = `${startX}px`;
    cartAnimationEl.value.style.opacity = '1';
    cartAnimationEl.value.style.transform = 'scale(1)';
    
    // Trigger animation
    setTimeout(() => {
      cartAnimationEl.value.style.top = `${endY}px`;
      cartAnimationEl.value.style.left = `${endX}px`;
      cartAnimationEl.value.style.opacity = '0';
      cartAnimationEl.value.style.transform = 'scale(0.3)';
    }, 50);
    
    // Add to cart after animation
    setTimeout(() => {
      cartStore.addToCart(product, 1);
      animatingItem.value = null;
    }, 600);
  } else {
    // Fallback if animation element is not available
    cartStore.addToCart(product, 1);
  }
}

// Handle image errors
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  event.target.src = getImageUrl('placeholder.jpg');
  
  // If the local fallback fails, use inline SVG
  event.target.onerror = function() {
    const parent = event.target.parentNode;
    if (parent) {
      const svgElement = document.createElement('div');
      svgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
          <rect width="100%" height="100%" fill="#f0f0f0"/>
          <path d="M12 6v12M6 12h12" stroke="#aaa" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      svgElement.className = 'broken-image';
      parent.replaceChild(svgElement, event.target);
    }
  };
}

// Helper function to handle different image formats
const getImageSrc = (imageUrl) => {
  if (!imageUrl) return 'https://via.placeholder.com/300x300?text=No+Image';
  
  if (typeof imageUrl === 'string') {
    // Handle base64 images
    if (imageUrl.startsWith('base64://')) {
      return imageUrl.replace('base64://', '');
    }
    // Handle temp images
    if (imageUrl.startsWith('temp://')) {
      return imageUrl.replace('temp://', '');
    }
  }
  
  return imageUrl;
};

const imageUrl = computed(() => getImageUrl(props.product.image || 'placeholder.jpg'));
</script>

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

.cart-animation {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  background-color: rgb(255 255 255);
  z-index: 9999;
  position: fixed;
  pointer-events: none;
}

.dark .cart-animation {
  background-color: rgb(17 24 39);
}
</style>
