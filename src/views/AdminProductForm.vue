<template>
  <div class="admin-product-form container mx-auto px-4 py-8 bg-light-primary dark:bg-dark-primary min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h1>
      <router-link 
        to="/admin/products" 
        class="text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-primary dark:hover:text-accent-primary transition-colors"
      >
        Back to Products
      </router-link>
    </div>

    <div class="bg-light-secondary dark:bg-dark-secondary rounded-lg shadow-md p-6 mb-6 border border-light-neutral-300 dark:border-dark-neutral-700">
      <form @submit.prevent="saveProduct">
        <!-- Basic Information -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Product Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="product.name" 
                required
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
            
            <div>
              <label for="category" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Category</label>
              <select 
                id="category" 
                v-model="product.category" 
                required
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
                <option value="">Select a category</option>
                <option value="Beaded Jewelry">Beaded Jewelry</option>
                <option value="String Jewelry">String Jewelry</option>
                <option value="Metal Jewelry">Metal Jewelry</option>
                <option value="Gemstones">Gemstones</option>
                <option value="Earrings">Earrings</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Rings">Rings</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label for="price" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Price (KES)</label>
              <input 
                type="number" 
                id="price" 
                v-model.number="product.price" 
                min="0.01" 
                step="0.01"
                required
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
            
            <div>
              <label for="stock" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Stock Quantity</label>
              <input 
                type="number" 
                id="stock" 
                v-model.number="product.stock" 
                min="0" 
                required
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
          </div>
        </div>
        
        <!-- Description -->
        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Description</label>
          <textarea 
            id="description" 
            v-model="product.description" 
            rows="4"
            required
            class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary resize-y"
          ></textarea>
        </div>
        
        <!-- Images -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Product Images</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              class="relative border border-light-neutral-300 dark:border-dark-neutral-600 rounded p-2 bg-light-primary dark:bg-dark-primary"
            >
              <img 
                :src="getImageSrc(image)" 
                class="w-full h-32 object-cover rounded" 
                alt="Product image"
              >
              <button 
                type="button"
                @click="removeImage(index)" 
                class="absolute top-1 right-1 bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-orange-700 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div class="border border-dashed border-light-neutral-400 dark:border-dark-neutral-500 rounded-lg p-4 flex flex-col items-center justify-center min-h-[8rem] bg-light-neutral-100/50 dark:bg-dark-neutral-800/50">
              <div class="mb-2 w-full">
                <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Upload Image</label>
                <input 
                  type="file" 
                  id="image-upload"
                  @change="handleFileUpload"
                  accept="image/*"
                  class="w-full mb-2 text-sm text-light-text-primary dark:text-dark-text-primary"
                />
                <div class="text-sm text-light-neutral-500 dark:text-dark-neutral-400 mb-2 text-center">-- OR --</div>
                <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Enter Image URL</label>
                <input 
                  type="url" 
                  v-model="newImageUrl" 
                  placeholder="Enter image URL"
                  class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded mb-2 bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
                >
                <div class="flex justify-center">
                  <button 
                    type="button"
                    @click="addImage" 
                    class="bg-accent-quaternary hover:bg-accent-quaternary/90 text-white py-1 px-3 rounded-btn shadow-btn hover:shadow-btn-hover transition-all"
                    :disabled="isUploading || !newImageUrl.trim()"
                  >
                    Add URL
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Upload progress/status -->
          <div v-if="isUploading" class="mt-2 bg-accent-quaternary/10 text-accent-quaternary px-4 py-2 rounded border border-accent-quaternary/20">
            <div class="flex items-center">
              <span class="inline-block animate-spin mr-2">⟳</span>
              <span>{{ uploadStatus }}</span>
            </div>
          </div>
          
          <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
            Add at least one product image. For best results, use images with a 1:1 aspect ratio.
            <br>
            <span class="text-accent-tertiary dark:text-accent-tertiary font-medium">High-resolution images will be automatically resized to optimize performance.</span>
          </p>
        </div>
        
        <!-- Additional Details -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Additional Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="materials" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Materials</label>
              <input 
                type="text" 
                id="materials" 
                v-model="product.materials" 
                placeholder="e.g. Sterling silver, glass beads, etc."
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
            
            <div>
              <label for="dimensions" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Dimensions</label>
              <input 
                type="text" 
                id="dimensions" 
                v-model="product.dimensions" 
                placeholder="e.g. 18 inches, 2.5cm diameter, etc."
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
          </div>
          
          <div class="mt-4">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="featured" 
                v-model="product.featured"
                class="h-4 w-4 text-accent-primary focus:ring-accent-primary border-light-neutral-300 dark:border-dark-neutral-600 rounded"
              >
              <label for="featured" class="ml-2 block text-sm text-light-text-primary dark:text-dark-text-primary">
                Featured product (display on homepage)
              </label>
            </div>
          </div>
        </div>
        
        <div class="border-t border-light-neutral-300 dark:border-dark-neutral-700 pt-6 flex justify-end space-x-4">
          <button 
            type="button" 
            @click="$router.go(-1)" 
            class="py-2 px-4 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-btn shadow-btn text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="py-2 px-4 border border-transparent rounded-btn shadow-btn text-sm font-medium text-white bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btn-primary transition-all"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Saving...' : 'Save Product' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="bg-orange-100 dark:bg-orange-900/30 border border-orange-400 dark:border-orange-700 text-orange-700 dark:text-orange-400 px-4 py-3 rounded mb-4 relative">
      <strong class="font-bold mr-1">Error:</strong>
      <span class="block sm:inline">{{ error }}</span>
      <span 
        class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" 
        @click="error = null"
      >
        <span class="text-xl">&times;</span>
      </span>
    </div>
    
    <!-- Warning for temporary images -->
    <div v-if="hasTempImages" class="bg-accent-primary/10 dark:bg-accent-primary/20 border border-accent-primary/30 dark:border-accent-primary/30 text-light-text-primary dark:text-dark-text-primary px-4 py-3 rounded mb-4">
      <strong class="font-bold">Warning:</strong>
      <span class="block sm:inline">
        Some images are temporarily stored locally due to CORS restrictions.
        They will be lost if you refresh the page. Please check the CORS settings for your Firebase Storage.
      </span>
    </div>

    <!-- Size warning -->
    <div v-if="showSizeWarning" class="bg-accent-primary/10 dark:bg-accent-primary/20 border border-accent-primary/30 dark:border-accent-primary/30 text-light-text-primary dark:text-dark-text-primary px-4 py-3 rounded mb-4">
      <strong class="font-bold">Warning:</strong>
      <span class="block sm:inline">
        Some uploaded images may be stored as base64 strings in the database, which has size limitations.
        Very large images may cause problems when saving the product.
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { firebaseService } from '../services/firebaseService';
import { formatCurrency } from '@/utils/currency';

const router = useRouter();
const route = useRoute();

const productId = computed(() => route.params.id);
const isEditMode = computed(() => !!productId.value);

const product = ref({
  name: '',
  category: '',
  description: '',
  price: 0,
  stock: 1,
  images: [],
  featured: false,
  materials: '',
  dimensions: ''
});

const newImageUrl = ref('');
const isSaving = ref(false);
const isUploading = ref(false);
const error = ref(null);
const showSizeWarning = ref(false);
const formKey = computed(() => isEditMode.value ? `product_edit_${productId.value}` : 'product_new');
const uploadStatus = ref('Processing image...');

const hasTempImages = computed(() => {
  return product.value.images.some(img => img.startsWith('temp://'));
});

// Load product data from server or localStorage
onMounted(async () => {
  if (isEditMode.value) {
    try {
      const productData = await firebaseService.getProduct(productId.value);
      if (productData) {
        product.value = { ...productData };
      } else {
        console.error('Product not found');
        router.push('/admin/products');
      }
    } catch (err) {
      console.error('Error loading product:', err);
      error.value = 'Failed to load product';
    }
  } else {
    // For new products, try to load data from localStorage
    const savedForm = localStorage.getItem(formKey.value);
    if (savedForm) {
      try {
        product.value = JSON.parse(savedForm);
      } catch (err) {
        console.error('Error parsing saved form data:', err);
      }
    }
  }
});

// Save form data to localStorage when it changes
watch(() => product.value, (newValue) => {
  localStorage.setItem(formKey.value, JSON.stringify(newValue));
}, { deep: true });

// Clean up localStorage when component unmounts after successful save
onBeforeUnmount(() => {
  // Only keep localStorage if there was an error (form not successfully submitted)
  if (!error.value && !isSaving.value) {
    localStorage.removeItem(formKey.value);
  }
});

const addImage = () => {
  if (newImageUrl.value.trim()) {
    product.value.images.push(newImageUrl.value.trim());
    newImageUrl.value = '';
  }
};

const removeImage = (index) => {
  product.value.images.splice(index, 1);
};

// Convert any base64 or temp URLs to displayable images
const getImageSrc = (url) => {
  if (url.startsWith('base64://')) {
    return url.replace('base64://', '');
  } else if (url.startsWith('temp://')) {
    return url.replace('temp://', '');
  }
  return url;
};

// Handle file upload with better error handling and resize feedback
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.match('image.*')) {
    error.value = 'Please select an image file';
    return;
  }
  
  isUploading.value = true;
  error.value = null;

  try {
    // Check original file size and update status accordingly
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    
    if (file.size > 1024 * 1024) { // Larger than 1MB
      uploadStatus.value = `Resizing ${fileSizeMB}MB image for optimal performance...`;
    } else {
      uploadStatus.value = `Processing ${fileSizeMB}MB image...`;
    }
    
    // Process file - will be converted to base64
    const imageUrl = await firebaseService.uploadProductImage(file);
    product.value.images.push(imageUrl);
    
    // Show size warning if we're storing base64 data
    if (imageUrl.startsWith('base64://')) {
      showSizeWarning.value = true;
    }
    
    // Reset file input
    event.target.value = '';
  } catch (err) {
    console.error('Error processing image:', err);
    error.value = `Failed to process image: ${err.message || 'Unknown error'}`;
  } finally {
    isUploading.value = false;
  }
};

// Modified saveProduct to handle different image types
const saveProduct = async () => {
  isSaving.value = true;
  error.value = null;
  
  try {
    // Validate form
    if (!product.value.name || !product.value.category || !product.value.description || product.value.images.length === 0) {
      throw new Error('Please fill out all required fields and add at least one image');
    }
    
    // Check total size of base64 images
    const base64Images = product.value.images.filter(img => img.startsWith('base64://'));
    if (base64Images.length > 0) {
      // Calculate approximate size of all base64 strings
      const totalBase64Size = base64Images.reduce((size, img) => size + img.length, 0);
      const approxSizeInKB = totalBase64Size / 1024;
      
      // Warn if total size exceeds 700KB (to stay well under Firestore's 1MB limit)
      if (approxSizeInKB > 700) {
        if (!confirm(`Warning: Your product has approximately ${approxSizeInKB.toFixed(0)}KB of image data, which is approaching Firestore's limit. Continue anyway?`)) {
          isSaving.value = false;
          return;
        }
      }
    }
    
    // Proceed with saving
    if (isEditMode.value) {
      await firebaseService.updateProduct(productId.value, product.value);
    } else {
      await firebaseService.createProduct(product.value);
    }
    
    // Clear localStorage after successful save
    localStorage.removeItem(formKey.value);
    router.push('/admin/products');
  } catch (err) {
    console.error('Error saving product:', err);
    error.value = err.message;
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
.admin-product-form {
  min-height: 80vh;
}
</style>