<template>
  <div class="bg-light-primary dark:bg-dark-primary">
    <div class="pt-6">
      <!-- Replace inline breadcrumbs with Breadcrumbs component -->
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Breadcrumbs :items="breadcrumbItems" />
      </div>

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
        <!-- Image gallery - Desktop Grid / Mobile Slider -->
        <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          <!-- Desktop Image Grid (hidden on mobile) -->
          <div class="hidden sm:block lg:grid lg:grid-cols-3 lg:gap-4">
            <div class="lg:grid lg:grid-rows-2 lg:gap-4">
              <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(0)">
                <img :src="processImageUrl(product.images[0]?.main) || getImageUrl('placeholder.jpg')" :alt="product.name" class="h-full w-full object-cover" @error="handleImageError" />
              </div>
              <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(1)">
                <img :src="processImageUrl(product.images[1]?.main) || getImageUrl('placeholder.jpg')" :alt="product.name" class="h-full w-full object-cover" @error="handleImageError" />
              </div>
            </div>
            <div class="lg:grid lg:grid-rows-2 lg:gap-4">
              <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(2)">
                <img :src="processImageUrl(product.images[2]?.main) || getImageUrl('placeholder.jpg')" :alt="product.name" class="h-full w-full object-cover" @error="handleImageError" />
              </div>
              <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(3)">
                <img :src="processImageUrl(product.images[3]?.main) || getImageUrl('placeholder.jpg')" :alt="product.name" class="h-full w-full object-cover" @error="handleImageError" />
              </div>
            </div>
            <div class="lg:grid lg:grid-rows-2 lg:gap-4">
              <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(4)">
                <img :src="processImageUrl(product.images[4]?.main) || getImageUrl('placeholder.jpg')" :alt="product.name" class="h-full w-full object-cover" @error="handleImageError" />
              </div>
              <div class="aspect-square overflow-hidden rounded-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary" @click="openImageViewer(5)">
                <img :src="processImageUrl(product.images[5]?.main) || getImageUrl('placeholder.jpg')" :alt="product.name" class="h-full w-full object-cover" @error="handleImageError" />
              </div>
            </div>
          </div>
          
          <!-- Mobile Image Slider (visible only on mobile) -->
          <div class="block sm:hidden relative">
            <div class="relative overflow-hidden h-[70vh] rounded-lg bg-light-secondary dark:bg-dark-secondary">
              <img :src="processImageUrl(product.images[currentMobileImageIndex]?.main) || getImageUrl('placeholder.jpg')" 
                   :alt="product.name" 
                   class="h-full w-full object-contain" 
                   @error="handleImageError" />
              
              <!-- Slide controls -->
              <button @click="prevMobileImage" 
                      class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/60 rounded-full p-2 shadow-lg text-accent-primary hover:bg-white hover:text-btn-primary-hover transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button @click="nextMobileImage" 
                      class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/60 rounded-full p-2 shadow-lg text-accent-primary hover:bg-white hover:text-btn-primary-hover transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              
              <!-- Full screen button -->
              <button @click="openImageViewer(currentMobileImageIndex)"
                      class="absolute right-2 top-2 bg-white/70 dark:bg-black/60 rounded-full p-2 shadow-lg text-accent-primary hover:bg-white hover:text-btn-primary-hover transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m9 0h4.5m-4.5 0v4.5m-9 18.75h4.5m-4.5 0v-4.5m4.5 0h9m-9 0v4.5m0 0h4.5" />
                </svg>
              </button>
            </div>
            
            <!-- Dots indicator -->
            <div class="flex justify-center mt-4">
              <button v-for="(_, index) in processedImages" :key="index" 
                      @click="currentMobileImageIndex = index"
                      :class="['w-2 h-2 mx-1 rounded-full transition-colors', 
                              currentMobileImageIndex === index ? 'bg-accent-primary' : 'bg-gray-300 dark:bg-dark-neutral-600']"
                      :aria-label="`View image ${index + 1}`">
              </button>
            </div>
          </div>
        </div>

        <!-- Image Viewer -->
        <ImageViewer v-if="product" :images="processedImages" :current-index="viewerCurrentIndex" :is-open="isViewerOpen" 
                     :alt="product.name" @update:current-index="viewerCurrentIndex = $event" @close="closeImageViewer" />

        <!-- Cart Animation -->
        <div v-if="animatingItem" class="cart-animation" ref="cartAnimationEl" 
             :style="{ backgroundImage: `url(${processImageUrl(animatingItem.images[0]?.main) || getImageUrl('placeholder.jpg')})` }"></div>

        <!-- Product info -->
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div class="lg:col-span-2">
            <h1 class="text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">{{ product.name }}</h1>
          </div>

          <!-- Options -->
          <div class="mt-4 lg:row-span-3 lg:mt-0 lg:border-l lg:border-accent-primary/30 dark:lg:border-accent-primary/20 lg:pl-8">
            <!-- Warning Messages -->
            <div v-if="hasTempImages" class="bg-accent-primary/10 border border-accent-primary/30 text-accent-primary dark:text-dark-text-primary px-4 py-3 rounded mb-4">
              <strong class="font-bold">Warning:</strong> Some images are temporarily stored locally.
            </div>

            <!-- Price Display -->
            <div class="mb-6">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl font-semibold tracking-tight text-purple-700 dark:text-white">{{ formatCurrency(totalPrice) }}</p>
              <p v-if="quantity > 1" class="text-sm text-purple-600 dark:text-dark-text-secondary mt-1">{{ formatCurrency(product.price) }} each</p>
            </div>

            <!-- Variants -->
            <div class="mt-10">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-medium text-gray-900 dark:text-dark-text-primary">Variants</h3>
                <button @click="showSuggestionForm = true" class="text-sm text-btn-primary hover:text-btn-primary-hover transition-colors">Request Custom Variant</button>
              </div>
              <div class="grid grid-cols-2 gap-3 mb-6">
                <button v-for="(variant, index) in allVariants" :key="index" @click="selectedVariantIndex = index"
                        :class="['relative flex items-center justify-center rounded-lg border-2 py-3 px-4 text-sm font-medium transition-all duration-200', 
                                 selectedVariantIndex === index ? 'border-purple-600 bg-purple-50 text-purple-700 dark:border-accent-primary dark:bg-accent-primary/10 dark:text-accent-primary shadow-sm' : 'border-gray-300 dark:border-dark-neutral-700 text-purple-700 dark:text-dark-text-primary hover:border-purple-600/50']">
                  <span>{{ variant.name }}</span>
                  
                  <!-- Suggested Tag -->
                  <span v-if="variant.isSuggested" 
                        class="absolute -top-2 -left-1 text-xs px-1.5 py-0.5 bg-amber-500 text-white rounded-full">
                    Suggested
                  </span>
                  
                  <div class="absolute -top-1 -right-1 flex -space-x-1">
                    <div v-for="(color, colorIndex) in variant.colors" :key="colorIndex" 
                         class="w-3 h-3 rounded-full border border-white dark:border-dark-neutral-800" :style="{ backgroundColor: color }"></div>
                  </div>
                </button>
              </div>

              <!-- Single Variant Suggestion Dialog -->
              <div v-if="showSuggestionForm" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" @click.self="closeSuggestionForm">
                <div class="bg-white dark:bg-dark-primary rounded-lg p-6 max-w-md w-full">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Request Custom Variant</h3>
                    <button @click="closeSuggestionForm" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Describe your desired variant</label>
                    <textarea v-model="variantSuggestion" rows="4" placeholder="Example: I'd love this in blue crystal beads with silver threading"
                              class="w-full p-3 border rounded-lg bg-white dark:bg-dark-secondary text-gray-700 dark:text-gray-200 border-gray-300 dark:border-dark-neutral-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"></textarea>
                  </div>
                  <!-- Color Selection -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Colors (Max 5)</label>
                    <div class="flex flex-wrap gap-2 items-center">
                      <div v-for="(color, index) in requestedColors" :key="index" 
                           class="flex items-center gap-2 bg-accent-primary/20 p-2 rounded-lg shadow-sm">
                        <input type="color" v-model="requestedColors[index]" class="w-8 h-8 rounded cursor-pointer border-0" />
                        <button v-if="requestedColors.length > 1" @click="removeColor(index)" 
                                class="text-gray-400 hover:text-red-500 transition-colors" title="Remove color">✕</button>
                      </div>
                      <button @click="addNewColor" :disabled="requestedColors.length >= 5" 
                              :class="['w-8 h-8 rounded-lg border-2 border-dashed flex items-center justify-center transition-colors', 
                                       requestedColors.length >= 5 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-400 hover:border-accent-primary hover:text-accent-primary']" 
                              :title="requestedColors.length >= 5 ? 'Maximum colors reached' : 'Add color'">+</button>
                    </div>
                    <p v-if="colorError" class="mt-2 text-sm text-red-500">{{ colorError }}</p>
                  </div>
                  <div class="flex justify-end gap-3">
                    <button @click="closeSuggestionForm" class="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-neutral-800 rounded-lg">Cancel</button>
                    <button @click="submitVariantSuggestion" :disabled="!variantSuggestion.trim()" 
                            class="px-4 py-2 bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white rounded-lg">Submit Request</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quantity -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3">Quantity</h3>
              <div class="flex items-center justify-center border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-light-secondary dark:bg-dark-secondary">
                <button @click="quantity > 1 ? quantity-- : null" class="w-12 h-12 flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 rounded-l-lg">−</button>
                <input v-model="quantity" type="number" min="1" :max="product.stock" class="w-16 h-12 text-center border-x border-light-neutral-200 dark:border-dark-neutral-700 bg-transparent text-light-text-primary dark:text-dark-text-primary" />
                <button @click="quantity < product.stock ? quantity++ : null" class="w-12 h-12 flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 rounded-r-lg">+</button>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <button @click="addToCart" class="w-full h-12 flex items-center justify-center rounded-lg bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white font-medium shadow-btn hover:shadow-btn-hover transition-all">Add to bag</button>
          </div>

          <!-- Description and details -->
          <div class="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Description</h3>
              <div class="space-y-6">
                <p class="text-base text-light-text-primary dark:text-dark-text-primary">{{ product.description }}</p>
              </div>
            </div>
            <div v-if="product.materials || product.dimensions" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Materials & Dimensions</h3>
              <ul class="list-disc space-y-2 pl-4 text-sm">
                <li v-if="product.materials" class="text-light-text-secondary dark:text-dark-text-secondary"><span class="font-medium text-light-text-primary dark:text-dark-text-primary">Materials:</span> {{ product.materials }}</li>
                <li v-if="product.dimensions" class="text-light-text-secondary dark:text-dark-text-secondary"><span class="font-medium text-light-text-primary dark:text-dark-text-primary">Dimensions:</span> {{ product.dimensions }}</li>
              </ul>
            </div>
            <div v-if="product.careInstructions" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Care Instructions</h3>
              <ul class="list-disc space-y-2 pl-4 text-sm">
                <li v-for="(instruction, index) in getCareInstructions" :key="index" class="text-light-text-secondary dark:text-dark-text-secondary">{{ instruction }}</li>
              </ul>
            </div>
            <div v-if="product.sizingAndFit" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Sizing & Fit</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ product.sizingAndFit }}</p>
            </div>
            <div v-if="product.shippingInfo" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Shipping</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ product.shippingInfo }}</p>
            </div>
            <div v-if="product.returnPolicy" class="mt-10">
              <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Return Policy</h3>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ product.returnPolicy }}</p>
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
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { firebaseService } from '../services/firebaseService';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth'; // Add auth store import
import { formatCurrency } from '@/utils/currency';
import { getImageUrl } from '@/utils/imageLoader';
import ImageViewer from '../components/ImageViewer.vue';
import Breadcrumbs from '../components/ui/Breadcrumbs.vue'; // Import Breadcrumbs component

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore(); // Add auth store instance

const product = ref(null);
const loading = ref(true);
const error = ref(null);
const quantity = ref(1);
const selectedVariantIndex = ref(0);
const isViewerOpen = ref(false);
const viewerCurrentIndex = ref(0);
const animatingItem = ref(null);
const cartAnimationEl = ref(null);
const showSuggestionForm = ref(false);
const variantSuggestion = ref('');
const requestedColors = ref(['#ffffff']);
const colorError = ref('');
const suggestedVariants = ref([]); // Add state for suggested variants
const loadingSuggestions = ref(false); // Loading state for suggested variants
const currentMobileImageIndex = ref(0);

const productId = computed(() => route.params.id);
const totalPrice = computed(() => product.value ? product.value.price * quantity.value : 0);
const processedImages = computed(() => product.value?.images?.map(img => processImageUrl(img.main) || getImageUrl('placeholder.jpg')) || []);
const getCareInstructions = computed(() => product.value?.careInstructions?.split('\n').filter(line => line.trim()) || []);
const hasTempImages = computed(() => product.value?.images?.some(img => img.main?.startsWith('temp://')) || false);

const processImageUrl = (url) => {
  if (!url) return getImageUrl('placeholder.jpg');
  if (typeof url === 'string' && url.startsWith('base64://')) return url.replace('base64://', '');
  return url;
};

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  try {
    const productData = await firebaseService.getProduct(productId.value);
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
    await fetchVariantSuggestions(); // Fetch variant suggestions after fetching product
  } catch (err) {
    console.error("Error fetching product:", err);
    error.value = "Failed to load product details";
  } finally {
    loading.value = false;
  }
};

const ensureImagesStructure = (images) => {
  if (!Array.isArray(images) || images.length === 0) {
    return [{ main: getImageUrl('placeholder.jpg'), thumb: getImageUrl('placeholder.jpg') }];
  }
  return images.map(img => ({
    main: processImageUrl(img.main || img) || getImageUrl('placeholder.jpg'),
    thumb: processImageUrl(img.thumb || img) || getImageUrl('placeholder.jpg')
  }));
};

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  event.target.src = getImageUrl('placeholder.jpg');
  event.target.onerror = () => {
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

const addToCart = async (event) => {
  if (!product.value) return;
  const buttonRect = event.target.getBoundingClientRect();
  const startX = buttonRect.left + (buttonRect.width / 2);
  const startY = buttonRect.top + (buttonRect.height / 2);
  const cartIcon = document.querySelector('.group-hover\\:text-gray-500') || document.querySelector('a[href="/cart"] svg');
  let endX = window.innerWidth - 60;
  let endY = 20;
  if (cartIcon) {
    const cartRect = cartIcon.getBoundingClientRect();
    endX = cartRect.left + (cartRect.width / 2);
    endY = cartRect.top + (cartRect.height / 2);
  }
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
};

const goBack = () => router.back();

const openImageViewer = (index) => {
  viewerCurrentIndex.value = index;
  isViewerOpen.value = true;
};

const closeImageViewer = () => {
  isViewerOpen.value = false;
};

const addNewColor = () => {
  if (requestedColors.value.length < 5) {
    requestedColors.value.push('#ffffff');
    colorError.value = '';
  } else {
    colorError.value = 'Maximum 5 colors allowed';
  }
};

const removeColor = (index) => {
  if (requestedColors.value.length > 1) {
    requestedColors.value.splice(index, 1);
    colorError.value = '';
  }
};

const closeSuggestionForm = () => {
  showSuggestionForm.value = false;
  variantSuggestion.value = '';
  requestedColors.value = ['#ffffff'];
  colorError.value = '';
};

const submitVariantSuggestion = async () => {
  if (!variantSuggestion.value.trim()) return;
  try {
    // Get current user information from auth store
    const currentUser = authStore.getUser;

    await firebaseService.submitVariantRequest({
      productId: product.value.id,
      productName: product.value.name,
      suggestion: variantSuggestion.value,
      colors: requestedColors.value,
      // Use proper user ID and email from auth store if available
      userId: currentUser?.uid || null,
      userEmail: currentUser?.email || 'Anonymous',
      timestamp: new Date()
    });
    alert('Thank you! Your custom variant request has been submitted.');
    closeSuggestionForm();
  } catch (err) {
    console.error('Error submitting variant request:', err);
    alert('Failed to submit request. Please try again.');
  }
};

// Add a function to fetch variant suggestions
const fetchVariantSuggestions = async () => {
  if (!product.value?.id) return;
  
  loadingSuggestions.value = true;
  try {
    // Fetch all variant requests
    const allRequests = await firebaseService.getVariantRequests();
    
    // Filter requests for this product
    suggestedVariants.value = allRequests
      .filter(request => request.productId === product.value.id)
      .map(request => ({
        name: request.suggestion.length > 20 
          ? request.suggestion.substring(0, 20) + '...' 
          : request.suggestion,
        colors: request.requestedColors || [],
        fullSuggestion: request.suggestion,
        isSuggested: true,
        userEmail: request.userEmail,
        createdAt: request.createdAt?.toDate?.() || new Date()
      }));
  } catch (error) {
    console.error("Error fetching variant suggestions:", error);
  } finally {
    loadingSuggestions.value = false;
  }
};

// Create a computed property that combines regular variants and suggested variants
const allVariants = computed(() => {
  const regularVariants = product.value?.variants.map(v => ({
    ...v,
    isSuggested: false
  })) || [];
  
  return [...regularVariants, ...suggestedVariants.value];
});

// Create a computed property for breadcrumb items
const breadcrumbItems = computed(() => {
  if (!product.value) return [{ text: 'Home', path: '/' }, { text: 'Products', path: '/products' }];
  
  // Convert product breadcrumbs to the format expected by Breadcrumbs component
  const items = [
    { text: 'Home', path: '/' },
    { text: 'Products', path: '/products' }
  ];
  
  // Add category if present in product
  if (product.value.category) {
    items.push({ 
      text: product.value.category, 
      path: `/products?category=${encodeURIComponent(product.value.category)}`
    });
  }
  
  // Add current product as the last item (with no path)
  items.push({ text: product.value.name });
  
  return items;
});

const nextMobileImage = () => {
  if (!product.value?.images?.length) return;
  currentMobileImageIndex.value = (currentMobileImageIndex.value + 1) % product.value.images.length;
};

const prevMobileImage = () => {
  if (!product.value?.images?.length) return;
  currentMobileImageIndex.value = (currentMobileImageIndex.value - 1 + product.value.images.length) % product.value.images.length;
};

onMounted(fetchProduct);
watch(() => route.params.id, fetchProduct);
</script>

<style scoped>
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
.broken-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
input[type="color"] {
  appearance: none;
  -webkit-appearance: none;
  padding: 0;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
</style>