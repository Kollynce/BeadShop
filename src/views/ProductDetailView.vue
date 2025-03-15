<template>
  <div class="container mx-auto p-4 bg-light-primary dark:bg-dark-primary">
    <!-- Breadcrumb navigation -->
    <nav class="text-sm mb-6">
      <ol class="flex items-center space-x-2">
        <li><router-link to="/" class="text-light-neutral-500 dark:text-dark-neutral-500 hover:text-accent-primary">Home</router-link></li>
        <li><span class="text-light-neutral-400 dark:text-dark-neutral-600 mx-1">›</span></li>
        <li><router-link to="/" class="text-light-neutral-500 dark:text-dark-neutral-500 hover:text-accent-primary">Shop</router-link></li>
        <li><span class="text-light-neutral-400 dark:text-dark-neutral-600 mx-1">›</span></li>
        <li class="text-accent-primary font-medium">{{ product?.name || 'Product' }}</li>
      </ol>
    </nav>
    
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary mb-2"></div>
      <p class="text-light-text-primary dark:text-dark-text-primary">Loading your beautiful jewelry...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-100 dark:bg-red-900/20 p-4 rounded mb-6">
      <p class="text-red-700 dark:text-red-400">{{ error }}</p>
      <button @click="goBack" class="mt-2 text-sm text-accent-primary hover:underline">← Return to previous page</button>
    </div>
    
    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Left Column: Product Images -->
      <div class="flex flex-col">
        <!-- Main product image with hover zoom effect -->
        <div class="product-image-container relative overflow-hidden rounded-lg shadow-md border border-light-neutral-100 dark:border-dark-neutral-700 mb-4 aspect-square bg-light-secondary dark:bg-dark-secondary">
          <img
            :src="processImageUrl(product.images[selectedImageIndex]?.main) || processImageUrl(product.imageUrl) || processImageUrl(product.image) || getImageUrl('placeholder.jpg')"
            :alt="product.name"
            class="product-image w-full h-full object-contain rounded-lg"
            @error="handleImageError"
          />
          <div class="absolute top-3 right-3 bg-light-secondary dark:bg-dark-neutral-700 rounded-full p-2 shadow-md">
            <button @click="selectedImageIndex = (selectedImageIndex + 1) % product.images.length" 
              class="text-light-neutral-600 dark:text-dark-neutral-400 hover:text-accent-primary dark:hover:text-accent-primary" title="Next image">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Thumbnails -->
        <div class="flex space-x-2 overflow-x-auto pb-2">
          <div
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImageIndex = index"
            :class="[
              'w-20 h-20 cursor-pointer rounded-md overflow-hidden border-2 flex-shrink-0',
              index === selectedImageIndex ? 'border-accent-primary' : 'border-transparent'
            ]"
          >
            <img
              :src="processImageUrl(image.thumb) || processImageUrl(image.main) || getImageUrl('placeholder.jpg')"
              :alt="`Thumbnail ${index + 1}`"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>

      <!-- Right Column: Product Details -->
      <div class="flex flex-col space-y-6">
        <!-- Product Name -->
        <h1 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">{{ product.name }}</h1>

        <!-- Price -->
        <div class="flex items-center">
          <p class="text-2xl text-light-text-primary dark:text-dark-text-primary">{{ formatCurrency(product.price) }}</p>
        </div>
        
        <!-- Jewelry Specific Details -->
        <div class="grid grid-cols-2 gap-4 mt-2 text-sm bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
          <div>
            <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Materials:</span>
            <p class="text-light-text-secondary dark:text-dark-text-secondary">{{ product.materials || 'Not specified' }}</p>
          </div>
          <div>
            <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Dimensions:</span>
            <p class="text-light-text-secondary dark:text-dark-text-secondary">{{ product.dimensions || 'Not specified' }}</p>
          </div>
          <div>
            <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Category:</span>
            <p class="text-light-text-secondary dark:text-dark-text-secondary">{{ product.category }}</p>
          </div>
          <div>
            <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Stock:</span>
            <p class="text-light-text-secondary dark:text-dark-text-secondary">{{ product.stock }} pieces available</p>
          </div>
        </div>

        <!-- Product Description -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">Description</h3>
          <p class="text-base text-light-text-secondary dark:text-dark-text-secondary whitespace-pre-line">{{ product.description }}</p>
        </div>

        <!-- Color Options -->
        <div v-if="product.colors && product.colors.length > 0">
          <p class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-3">Color Options</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="(color, index) in product.colors"
              :key="index"
              @click="selectedColorIndex = index"
              :class="[
                'w-12 h-12 rounded-full focus:outline-none transition-all duration-200',
                color.class,
                { 'ring-2 ring-accent-primary ring-offset-2 scale-110': index === selectedColorIndex }
              ]"
              :title="color.name"
            >
              <span class="sr-only">{{ color.name }}</span>
            </button>
          </div>
          <p class="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">Selected: {{ product.colors[selectedColorIndex].name }}</p>
        </div>
        
        <!-- Quantity Selection -->
        <div>
          <p class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-3">Quantity</p>
          <div class="flex">
            <button 
              @click="quantity > 1 ? quantity-- : null"
              class="px-4 py-2 bg-light-neutral-200 dark:bg-dark-neutral-700 hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600 rounded-l text-light-text-primary dark:text-dark-text-primary"
            >−</button>
            <input 
              id="quantity" 
              v-model="quantity" 
              type="number" 
              min="1" 
              class="w-16 text-center border-light-neutral-200 dark:border-dark-neutral-700 border-t border-b focus:ring-accent-primary focus:border-accent-primary bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary"
            >
            <button 
              @click="quantity++"
              class="px-4 py-2 bg-light-neutral-200 dark:bg-dark-neutral-700 hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600 rounded-r text-light-text-primary dark:text-dark-text-primary"
            >+</button>
          </div>
        </div>

        <!-- Add to Cart Button -->
        <button
          @click="addToCart"
          class="w-full bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-white px-6 py-3 rounded-md transition font-medium flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Add to Cart</span>
        </button>

        <!-- Handcrafted Badge -->
        <div class="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary border-t border-b border-light-neutral-200 dark:border-dark-neutral-700 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
          <span>Handcrafted with care | Unique Piece | Artisan Made</span>
        </div>

        <!-- Expandable Sections -->
        <div class="space-y-2 mt-4">
          <div
            v-for="section in product.sections"
            :key="section.name"
            class="border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg overflow-hidden"
          >
            <div
              @click="toggleSection(section.name)"
              class="flex justify-between items-center p-4 cursor-pointer hover:bg-light-neutral-100 dark:hover:bg-dark-secondary"
            >
              <h2 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">{{ section.name }}</h2>
              <span class="text-xl text-light-text-secondary dark:text-dark-text-secondary">
                {{ expandedSections.includes(section.name) ? '−' : '+' }}
              </span>
            </div>
            <div
              v-if="expandedSections.includes(section.name)"
              class="p-4 bg-light-neutral-100 dark:bg-dark-secondary border-t border-light-neutral-200 dark:border-dark-neutral-700"
            >
              <ul
                v-if="Array.isArray(section.content)"
                class="list-disc pl-5 space-y-1"
              >
                <li v-for="(item, idx) in section.content" :key="idx" class="text-light-text-secondary dark:text-dark-text-secondary">{{ item }}</li>
              </ul>
              <p v-else class="text-light-text-secondary dark:text-dark-text-secondary">{{ section.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <p class="text-light-text-primary dark:text-dark-text-primary">Product not found.</p>
      <button @click="goBack" class="mt-4 bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-white px-4 py-2 rounded">Return to Shop</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { firebaseService } from '../services/firebaseService'
import { useCartStore } from '../stores/cart'
import { mockDataLoader } from '../utils/mockDataLoader'
import { formatCurrency } from '@/utils/currency'
import { getImageUrl } from '@/utils/imageLoader';

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const product = ref(null)
const loading = ref(true)
const error = ref(null)
const quantity = ref(1)
const selectedImageIndex = ref(0)
const selectedColorIndex = ref(0)
const expandedSections = ref(['Description'])

// Remove isInWishlist and rating from the state

const productId = computed(() => route.params.id)

// Add a function to process image URLs properly
const processImageUrl = (url) => {
  if (!url) return null;
  
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
    console.log("Fetching product with ID:", productId.value)
    
    // Try to get the product (now Firebase service will already fall back to mock data)
    try {
      product.value = await firebaseService.getProduct(productId.value)
    } catch (err) {
      console.warn("Both Firebase and mock data fetch failed:", err)
      
      // Last resort: create a default product
      product.value = {
        id: productId.value,
        name: "Sample Jewelry Piece",
        description: "This is a placeholder for a product that couldn't be found.",
        price: 99.99,
        stock: 0,
        category: '',
        materials: 'Not specified',
        dimensions: 'Not specified',
        images: [],
        featured: false
      }
    }
    
    console.log("Product loaded:", product.value)
    
    // Use local default image instead of relying on external placeholder service
    const defaultImage = getImageUrl('placeholder.jpg');
    const productImage = processImageUrl(product.value.imageUrl || product.value.image) || defaultImage;
    console.log("Product image source:", productImage);
    
    // Fix image structure handling
    if (!product.value.images || !Array.isArray(product.value.images) || product.value.images.length === 0) {
      console.log("Creating image structure with:", productImage);
      product.value.images = [
        {
          main: productImage,
          thumb: productImage
        }
      ];
    } else {
      console.log("Product already has images:", product.value.images);
      // Process existing images to ensure they're in correct format
      product.value.images = product.value.images.map(img => {
        if (typeof img === 'string') {
          const processedUrl = processImageUrl(img);
          return { main: processedUrl, thumb: processedUrl };
        }
        return {
          main: processImageUrl(img.main || img.imageUrl || img.image) || defaultImage,
          thumb: processImageUrl(img.thumb || img.main || img.imageUrl || img.image) || defaultImage
        };
      });
    }
    
    // Ensure product has the necessary structure for beaded jewelry display
    if (!product.value.images) {
      product.value.images = [
        {
          main: product.value.image || 'https://via.placeholder.com/400x400?text=No+Image',
          thumb: product.value.image || 'https://via.placeholder.com/100x100?text=No+Image'
        }
      ]
    }
    
    // Default colors for beaded jewelry if not specified
    if (!product.value.colors) {
      product.value.colors = [
        { name: 'Natural', class: 'bg-amber-200' },
        { name: 'Rose', class: 'bg-rose-300' },
        { name: 'Turquoise', class: 'bg-cyan-400' }
      ]
    }
    
    // Remove old jewelry specific defaults that don't match the form
    if (!product.value.materials) {
      product.value.materials = 'Not specified'
    }
    
    if (!product.value.dimensions) {
      product.value.dimensions = 'Not specified'
    }
    
    if (!product.value.stock) {
      product.value.stock = 0
    }
    
    if (!product.value.sections) {
      product.value.sections = []
      
      // Add description section
      product.value.sections.push({ 
        name: 'Description', 
        content: product.value.description || 'Product description not available.' 
      })
      
      // Add materials section if available
      if (product.value.materials) {
        product.value.sections.push({ 
          name: 'Materials & Dimensions', 
          content: [
            `Materials: ${product.value.materials}`,
            `Dimensions: ${product.value.dimensions}`
          ]
        })
      }
      
      if (product.value.features) {
        product.value.sections.push({ name: 'Features', content: product.value.features })
      }
      
      // Add jewelry care information
      product.value.sections.push({ 
        name: 'Care Instructions', 
        content: [
          'Store in a cool, dry place away from direct sunlight',
          'Avoid contact with perfumes, lotions, and chemicals',
          'Clean gently with a soft, lint-free cloth',
          'Remove before swimming or bathing'
        ]
      })
      
      // Add sizing information
      product.value.sections.push({
        name: 'Sizing & Fit',
        content: 'Our standard bracelet length is 7.5 inches. Necklaces are available in 16, 18, and 20 inch lengths. Please contact us for custom sizing.'
      })
      
      // Add shipping information
      product.value.sections.push({ 
        name: 'Shipping', 
        content: 'Handmade to order. Please allow 1-3 business days for production plus shipping time.' 
      })
      
      // Add returns policy
      product.value.sections.push({ 
        name: 'Returns', 
        content: 'We accept returns within 14 days of delivery for unworn items in original packaging.' 
      })
    }
  } catch (err) {
    console.error("Error fetching product:", err)
    error.value = err.message || 'Failed to load product'
  } finally {
    loading.value = false
  }
}

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

onMounted(fetchProduct)

// Re-fetch when route params change
watch(() => route.params.id, fetchProduct)

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    alert(`${quantity.value} ${product.value.name}${quantity.value > 1 ? 's' : ''} added to cart!`)
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

// Remove toggleWishlist method
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
</style>
