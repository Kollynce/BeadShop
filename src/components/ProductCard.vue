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
      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-light-neutral-100 dark:bg-dark-neutral-800">
        <img 
          :src="processProductImage()" 
          :alt="product.name"
          class="h-60 w-full object-cover object-center group-hover:opacity-90" 
          @error="handleImageError">
      </div>
      <div class="p-4">
        <div class="items-start">
          <h3 class="text-light-text-primary dark:text-dark-text-primary text-lg font-medium hover:text-btn-primary">{{ product.name }}</h3>
          <p class="text-light-text-secondary dark:text-dark-text-secondary text-sm">{{ product.category }}</p>
          <div class="mt-2 flex items-center justify-between">
            <p class="text-lg font-medium text-purple-700 dark:text-accent-primary">
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
import { ref, nextTick } from 'vue';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/currency';
import { getImageUrl } from '@/utils/imageLoader';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  processImageUrl: {
    type: Function,
    default: url => url
  }
});

const cartStore = useCartStore();
const animatingItem = ref(null);
const cartAnimationEl = ref(null);

// Process product image with multiple fallbacks similar to ProductDetailView
const processProductImage = () => {
  const defaultImage = getImageUrl('placeholder.jpg');
  
  // First try the product's images array if it exists
  if (props.product.images && props.product.images.length > 0) {
    const firstImage = props.product.images[0];
    
    // Handle both string and object formats
    if (typeof firstImage === 'string') {
      return processImageUrl(firstImage);
    } else if (firstImage.main) {
      return processImageUrl(firstImage.main);
    } else if (firstImage.url) {
      return processImageUrl(firstImage.url);
    }
  }
  
  // Then try individual image fields
  if (props.product.image) {
    return processImageUrl(props.product.image);
  }
  
  if (props.product.imageUrl) {
    return processImageUrl(props.product.imageUrl);
  }
  
  // If no product images found, use placeholder
  return defaultImage;
};

// Add processImageUrl function from ProductDetailView
const processImageUrl = (url) => {
  if (!url) return null;
  
  // Handle base64 images with the incorrect prefix
  if (typeof url === 'string' && url.startsWith('base64://')) {
    return url.replace('base64://', '');
  }
  
  // For normal URLs
  return url;
}

// Improve error handler to match ProductDetailView
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  
  // Use a locally hosted fallback image
  event.target.src = getImageUrl('placeholder.jpg');
  
  // If local fallback fails, use inline SVG as final fallback
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
};

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
};
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
