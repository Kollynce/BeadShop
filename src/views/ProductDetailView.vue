<template>
  <div class="bg-light-primary dark:bg-dark-primary">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <li v-for="breadcrumb in product?.breadcrumbs" :key="breadcrumb.id">
            <div class="flex items-center">
              <router-link :to="breadcrumb.href" class="mr-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                {{ breadcrumb.name }}
              </router-link>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" class="h-5 w-4 text-light-neutral-300 dark:text-dark-neutral-600">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li class="text-sm">
            <span class="font-medium text-accent-primary">{{ product?.name }}</span>
          </li>
        </ol>
      </nav>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary mb-2"></div>
        <p class="text-light-text-primary dark:text-dark-text-primary">Loading your beautiful jewelry...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="bg-red-100 dark:bg-red-900/20 p-4 rounded mb-6">
          <p class="text-red-700 dark:text-red-400">{{ error }}</p>
          <button @click="goBack" class="mt-2 text-sm text-accent-primary hover:underline">← Return to previous page</button>
        </div>
      </div>

      <template v-else-if="product">
        <!-- Image gallery -->
        <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-4 lg:px-8">
          <!-- Left column with two images -->
          <div class="lg:grid lg:grid-rows-2 lg:gap-4">
            <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(0)">
              <img
                :src="processImageUrl(product.images[0]?.main) || getImageUrl('placeholder.jpg')"
                :alt="product.name"
                class="h-full w-full object-cover"
                @error="handleImageError"
              />
            </div>
            <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(1)">
              <img
                :src="processImageUrl(product.images[1]?.main) || getImageUrl('placeholder.jpg')"
                :alt="product.name"
                class="h-full w-full object-cover"
                @error="handleImageError"
              />
            </div>
          </div>
          
          <!-- Middle column with two images -->
          <div class="lg:grid lg:grid-rows-2 lg:gap-4">
            <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(2)">
              <img
                :src="processImageUrl(product.images[2]?.main) || getImageUrl('placeholder.jpg')"
                :alt="product.name"
                class="h-full w-full object-cover"
                @error="handleImageError"
              />
            </div>
            <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(3)">
              <img
                :src="processImageUrl(product.images[3]?.main) || getImageUrl('placeholder.jpg')"
                :alt="product.name"
                class="h-full w-full object-cover"
                @error="handleImageError"
              />
            </div>
          </div>
          
          <!-- Right column with two images -->
          <div class="lg:grid lg:grid-rows-2 lg:gap-4">
            <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(4)">
              <img
                :src="processImageUrl(product.images[4]?.main) || getImageUrl('placeholder.jpg')"
                :alt="product.name"
                class="h-full w-full object-cover"
                @error="handleImageError"
              />
            </div>
            <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(5)">
              <img
                :src="processImageUrl(product.images[5]?.main) || getImageUrl('placeholder.jpg')"
                :alt="product.name"
                class="h-full w-full object-cover"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>

        <!-- Image Viewer -->
        <ImageViewer
          v-if="product"
          :images="processedImages"
          :current-index="viewerCurrentIndex"
          :is-open="isViewerOpen"
          :alt="product.name"
          @update:current-index="viewerCurrentIndex = $event"
          @close="closeImageViewer"
        />

        <!-- Product info -->
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div class="lg:col-span-2">
            <h1 class="text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
              {{ product.name }}
            </h1>
          </div>

          <!-- Options -->
          <div class="mt-4 lg:row-span-3 lg:mt-0 lg:border-l lg:border-accent-primary/30 dark:lg:border-accent-primary/20 lg:pl-8">
            <!-- Warning Messages -->
            <div v-if="hasTempImages" class="bg-accent-primary/10 border border-accent-primary/30 text-accent-primary dark:text-dark-text-primary px-4 py-3 rounded mb-4">
              <strong class="font-bold">Warning:</strong>
              <span class="block sm:inline">
                Some images are temporarily stored locally.
              </span>
            </div>

            <!-- Price Display -->
            <div class="mb-6">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl font-semibold tracking-tight text-purple-700 dark:text-white">
                {{ formatCurrency(totalPrice) }}
              </p>
              <p v-if="quantity > 1" class="text-sm text-purple-600 dark:text-dark-text-secondary mt-1">
                {{ formatCurrency(product.price) }} each
              </p>
            </div>

            <!-- Variants -->
            <div class="mt-10">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-medium text-gray-900 dark:text-dark-text-primary">Variants</h3>
                <button 
                  @click="suggestVariant"
                  class="text-sm text-btn-primary hover:text-btn-primary-hover transition-colors"
                >
                  Request Custom Variant
                </button>
              </div>
          
              <div class="grid grid-cols-2 gap-3 mb-6">
                <button
                  v-for="(variant, index) in product.variants"
                  :key="index"
                  @click="selectedVariantIndex = index"
                  :class="[
                    'relative flex items-center justify-center rounded-lg border-2 py-3 px-4 text-sm font-medium transition-all duration-200',
                    selectedVariantIndex === index 
                      ? 'border-purple-600 bg-purple-50 text-purple-700 dark:border-accent-primary dark:bg-accent-primary/10 dark:text-accent-primary shadow-sm' 
                      : 'border-gray-300 dark:border-dark-neutral-700 text-purple-700 dark:text-dark-text-primary hover:border-purple-600/50'
                  ]"
                >
                  <span>{{ variant.name }}</span>
                  <div class="absolute -top-1 -right-1 flex -space-x-1">
                    <div 
                      v-for="(color, colorIndex) in variant.colors" 
                      :key="colorIndex"
                      class="w-3 h-3 rounded-full border border-white dark:border-dark-neutral-800"
                      :style="{ backgroundColor: color }"
                    ></div>
                  </div>
                </button>
              </div>
          
              <!-- Variant Suggestion Dialog -->
              <div v-if="showVariantSuggestionForm" 
                class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                @click.self="closeVariantSuggestion"
              >
                <div class="bg-white dark:bg-dark-primary rounded-lg p-6 max-w-md w-full">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Request Custom Variant</h3>
                    <button @click="closeVariantSuggestion" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      ✕
                    </button>
                  </div>
                  
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Describe your desired variant
                    </label>
                    <textarea
                      v-model="variantSuggestion"
                      rows="4"
                      placeholder="Example: I'd love this in blue crystal beads with silver threading"
                      class="w-full p-3 border rounded-lg bg-white dark:bg-dark-secondary text-gray-700 dark:text-gray-200 border-gray-300 dark:border-dark-neutral-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    ></textarea>
                  </div>
          
                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-gray-500 dark:text-gray-400">Preferred colors:</span>
                      <div class="flex gap-2">
                        <input 
                          v-for="(color, index) in requestedColors"
                          :key="index"
                          type="color"
                          v-model="requestedColors[index]"
                          class="w-8 h-8 rounded cursor-pointer"
                        />
                        <button 
                          @click="requestedColors.push('#ffffff')"
                          class="w-8 h-8 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:text-gray-600"
                        >+</button>
                      </div>
                    </div>
                  </div>
          
                  <div class="mt-6 flex justify-end gap-3">
                    <button
                      @click="closeVariantSuggestion"
                      class="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-neutral-800 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      @click="submitVariantSuggestion"
                      :disabled="!variantSuggestion.trim()"
                      class="px-4 py-2 bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white rounded-lg shadow-btn hover:shadow-btn-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          
            <!-- Quantity -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3">Quantity</h3>
              <div class="flex items-center justify-center border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-light-secondary dark:bg-dark-secondary">
                <button 
                  @click="quantity > 1 ? quantity-- : null"
                  class="w-12 h-12 flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 rounded-l-lg"
                >−</button>
                <input 
                  v-model="quantity" 
                  type="number" 
                  min="1"
                  :max="product.stock"
                  class="w-16 h-12 text-center border-x border-light-neutral-200 dark:border-dark-neutral-700 bg-transparent text-light-text-primary dark:text-dark-text-primary"
                >
                <button 
                  @click="quantity < product.stock ? quantity++ : null"
                  class="w-12 h-12 flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 rounded-r-lg"
                >+</button>
              </div>
            </div>
          
            <!-- Add to Cart Button -->
            <button
              type="submit"
              @click="addToCart"
              class="w-full h-12 flex items-center justify-center rounded-lg bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white font-medium shadow-btn hover:shadow-btn-hover transition-all"
            >
              Add to bag
            </button>
          
            <!-- Variant Suggestion Dialog -->
            <div v-if="showSuggestionForm" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div class="bg-white dark:bg-dark-primary rounded-lg p-6 max-w-md w-full">
                <h3 class="text-lg font-medium mb-4 text-gray-900 dark:text-dark-text-primary">Suggest a Variant</h3>
                <textarea
                  v-model="variantSuggestion"
                  rows="4"
                  placeholder="Describe your desired variant (e.g., 'I'd love this in blue beads with silver strings')"
                  class="w-full p-3 border rounded-lg mb-4 bg-white dark:bg-dark-secondary text-gray-700 dark:text-dark-text-primary border-gray-300 dark:border-dark-neutral-600"
                ></textarea>
                <div class="flex justify-end gap-3">
                  <button
                    @click="showSuggestionForm = false"
                    class="px-4 py-2 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    @click="submitVariantSuggestion"
                    class="px-4 py-2 bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white rounded-lg"
                  >
                    Submit Suggestion
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
            <!-- Description and details -->
            <div>
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Description</h3>
              <div class="space-y-6">
                <p class="text-base text-light-text-primary dark:text-dark-text-primary">{{ product.description }}</p>
              </div>
            </div>

            <!-- Materials & Dimensions -->
            <div v-if="product.materials || product.dimensions" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Materials & Dimensions</h3>
              <ul class="list-disc space-y-2 pl-4 text-sm">
                <li v-if="product.materials" class="text-light-text-secondary dark:text-dark-text-secondary">
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Materials:</span> 
                  {{ product.materials }}
                </li>
                <li v-if="product.dimensions" class="text-light-text-secondary dark:text-dark-text-secondary">
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Dimensions:</span> 
                  {{ product.dimensions }}
                </li>
              </ul>
            </div>

            <!-- Care Instructions -->
            <div v-if="product.careInstructions" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Care Instructions</h3>
              <ul class="list-disc space-y-2 pl-4 text-sm">
                <li v-for="(instruction, index) in getCareInstructions" 
                    :key="index"
                    class="text-light-text-secondary dark:text-dark-text-secondary">
                  {{ instruction }}
                </li>
              </ul>
            </div>

            <!-- Sizing & Fit -->
            <div v-if="product.sizingAndFit" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Sizing & Fit</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {{ product.sizingAndFit }}
              </p>
            </div>

            <!-- Shipping -->
            <div v-if="product.shippingInfo" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Shipping</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {{ product.shippingInfo }}
              </p>
            </div>

            <!-- Returns -->
            <div v-if="product.returnPolicy" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Return Policy</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {{ product.returnPolicy }}
              </p>
            </div>
          </div>
        </div>
      </template>

      <!-- Not found state -->
      <div v-else class="text-center py-8">
        <p class="text-light-text-primary dark:text-dark-text-primary">Product not found.</p>
        <button @click="goBack" class="mt-4 bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-white px-4 py-2 rounded">Return to Shop</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { firebaseService } from '../services/firebaseService'
import { useCartStore } from '../stores/cart'
import { mockDataLoader } from '../utils/mockDataLoader'
import { formatCurrency } from '@/utils/currency'
import { getImageUrl } from '@/utils/imageLoader';
import ImageViewer from '../components/ImageViewer.vue';

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const product = ref(null)
const loading = ref(true)
const error = ref(null)
const quantity = ref(1)
const selectedImageIndex = ref(0)
const selectedVariantIndex = ref(0)
const expandedSections = ref(['Description'])
const totalPrice = computed(() => product.value ? product.value.price * quantity.value : 0)

// Remove isInWishlist and rating from the state

const productId = computed(() => route.params.id)

// Add a function to process image URLs properly
const processImageUrl = (url) => {
  if (!url) return getImageUrl('placeholder.jpg');
  
  // Handle base64 images with the incorrect prefix
  if (typeof url === 'string' && url.startsWith('base64://')) {
    return url.replace('base64://', '');
  }
  
  // For normal URLs
  return url;
}

const fetchProduct = async () => {
  loading.value = true
  error.value = null
  
  try {
    const productData = await firebaseService.getProduct(productId.value);
    
    // Ensure all required fields exist with defaults
    product.value = {
      ...productData,
      careInstructions: productData.careInstructions || '',
      sizingAndFit: productData.sizingAndFit || 'Standard sizing available. Contact for custom sizes.',
      shippingInfo: productData.shippingInfo || 'Standard shipping available.',
      returnPolicy: productData.returnPolicy || 'Standard return policy applies.',
      materials: productData.materials || '',
      dimensions: productData.dimensions || '',
      variants: productData.variants || [{ name: 'Default', colors: ['#000000'] }],
      images: ensureImagesStructure(productData.images)
    };
  } catch (err) {
    console.error("Error fetching product:", err);
    error.value = "Failed to load product details";
  } finally {
    loading.value = false;
  }
};

// Helper function to ensure consistent image structure
const ensureImagesStructure = (images) => {
  if (!Array.isArray(images) || images.length === 0) {
    return [{ main: getImageUrl('placeholder.jpg'), thumb: getImageUrl('placeholder.jpg') }];
  }
  
  return images.map(img => {
    if (typeof img === 'string') {
      return { main: processImageUrl(img), thumb: processImageUrl(img) };
    }
    return {
      main: processImageUrl(img.main) || getImageUrl('placeholder.jpg'),
      thumb: processImageUrl(img.thumb) || getImageUrl('placeholder.jpg')
    };
  });
};

// Improve image error handler with better fallbacks
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  
  // Use a locally hosted fallback image instead of an external service
  event.target.src = getImageUrl('placeholder.jpg');
  
  // If local fallback fails, use inline SVG as final fallback
  event.target.onerror = function() {
    const parent = event.target.parentNode;
    if (parent) {
      // Replace with a minimal SVG showing a broken image
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

const loadProduct = async () => {
  try {
    const productData = await getProduct(productId);
    product.value = productData;
    
    if (productData.images && productData.images.length) {
      currentImage.value = productData.images[0];
    } else {
      currentImage.value = defaultPlaceholderImage;
    }
  } catch (error) {
    console.error('Error loading product:', error);
  }
};

onMounted(fetchProduct)

// Re-fetch when route params change
watch(() => route.params.id, fetchProduct)

const animatingItem = ref(null);
const cartAnimationEl = ref(null);

const addToCart = async (event) => {
  if (!product.value) return;

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
  animatingItem.value = product.value;
  
  await nextTick();
  if (cartAnimationEl.value) {
    cartAnimationEl.value.style.top = `${startY}px`;
    cartAnimationEl.value.style.left = `${startX}px`;
    cartAnimationEl.value.style.opacity = '1';
    cartAnimationEl.value.style.transform = 'scale(1)';
    
    setTimeout(() => {
      cartAnimationEl.value.style.top = `${endY}px`;
      cartAnimationEl.value.style.left = `${endX}px`;
      cartAnimationEl.value.style.opacity = '0';
      cartAnimationEl.value.style.transform = 'scale(0.3)';
    }, 50);
    
    setTimeout(() => {
      cartStore.addToCart(product.value, quantity.value);
      animatingItem.value = null;
    }, 600);
  } else {
    cartStore.addToCart(product.value, quantity.value);
  }
}

const toggleSection = (sectionName) => {
  if (expandedSections.value.includes(sectionName)) {
    expandedSections.value = expandedSections.value.filter(name => name !== sectionName)
  } else {
    expandedSections.value.push(sectionName)
  }
}

// Navigation helpers
const goBack = () => {
  router.back()
}

// Add a method to allow the user to suggest a variant
const suggestVariant = () => {
  showSuggestionForm.value = true;
};

// Add these refs for the image viewer
const isViewerOpen = ref(false);
const viewerCurrentIndex = ref(0);

// Add computed property for processed images
const processedImages = computed(() => {
  if (!product.value?.images) return [];
  return product.value.images.map(img => 
    processImageUrl(img.main) || getImageUrl('placeholder.jpg')
  );
});

// Add methods for image viewer
const openImageViewer = (index) => {
  viewerCurrentIndex.value = index;
  isViewerOpen.value = true;
};

const closeImageViewer = () => {
  isViewerOpen.value = false;
};

// Add these computed properties in the script section
const getCareInstructions = computed(() => {
  if (!product.value?.careInstructions) return [];
  return typeof product.value.careInstructions === 'string' 
    ? product.value.careInstructions.split('\n').filter(line => line.trim())
    : product.value.careInstructions;
});

// Add these new refs for variant suggestion
const showSuggestionForm = ref(false);
const variantSuggestion = ref('');

// Add these new refs
const showVariantSuggestionForm = ref(false);
const requestedColors = ref(['#ffffff']);

// Add these new methods
const closeVariantSuggestion = () => {
  showVariantSuggestionForm.value = false;
  variantSuggestion.value = '';
  requestedColors.value = ['#ffffff'];
};

const submitVariantSuggestion = async () => {
  if (!variantSuggestion.value.trim()) return;
  
  try {
    await firebaseService.submitVariantRequest({
      productId: product.value.id,
      productName: product.value.name,
      suggestion: variantSuggestion.value,
      colors: requestedColors.value,
      timestamp: new Date(),
      status: 'pending'
    });
    
    // Show success message
    alert('Thank you! Your custom variant request has been submitted. We\'ll review it soon.');
    closeVariantSuggestion();
  } catch (err) {
    console.error('Error submitting variant request:', err);
    alert('Failed to submit request. Please try again.');
  }
};

// Original variant handling code
const newVariantName = ref('');
const newVariantColors = ref([]);

const addNewVariantColor = () => {
  newVariantColors.value.push('#ffffff');
};

const updateVariantColor = (index, event) => {
  newVariantColors.value[index] = event.target.value;
};

const removeVariantColor = (index) => {
  newVariantColors.value.splice(index, 1);
};

const addVariant = () => {
  if(newVariantName.value.trim() && newVariantColors.value.length) {
    product.value.variants.push({
      name: newVariantName.value.trim(),
      colors: [...newVariantColors.value]
    });
    newVariantName.value = '';
    newVariantColors.value = [];
  }
};
</script>

<style scoped>
/* Add subtle animation for hover states */
.product-image-container {
  overflow: hidden;
  border-radius: 0.5rem;
  position: relative;
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  transition: transform 0.4s ease;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-image-container:hover .product-image {
  transform: scale(1.05);
}

/* Add a loading state indicator */
.product-image-container::before {
  content: "Loading...";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
  z-index: -1;
}

.broken-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Add new styles for aspect ratio support */
.aspect-h-4 {
  aspect-ratio: 3/4;
}

.aspect-h-1 {
  aspect-ratio: 1/1;
}

/* Add new aspect ratio utilities */
.aspect-h-2 { aspect-ratio: 3/2; }
.aspect-h-5 { aspect-ratio: 4/5; }
.aspect-w-3 { aspect-ratio: 3/1; }
.aspect-w-4 { aspect-ratio: 4/1; }

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
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.dark .cart-animation {
  background-color: rgb(17 24 39);
}

/* Add smooth transitions for variant buttons */
.variant-btn {
  transition: all 0.2s ease-in-out;
}

.variant-btn:hover {
  transform: translateY(-1px);
}

.variant-btn:active {
  transform: translateY(0);
}
</style>
