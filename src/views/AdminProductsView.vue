<template>
  <div class="admin-products min-h-screen bg-light-primary dark:bg-dark-primary transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <!-- Enhanced Header section -->
      <div class="flex justify-between items-center mb-12 bg-light-secondary dark:bg-dark-secondary p-6 rounded-xl shadow-lg">
        <div>
          <Breadcrumbs :items="[ { text: 'Dashboard', path: '/admin' }, { text: 'Products' }]" />
          <h1 class="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2">Manage Products</h1>
        </div>
        <router-link 
          to="/admin/products/new" 
          class="bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-white py-2 px-4 rounded-btn flex items-center shadow-btn hover:shadow-btn-hover transition-btn duration-200"
        >
          <span class="mr-2">Add New Product</span>
          <span class="text-xl">+</span>
        </router-link>
      </div>

      <!-- Enhanced metric cards with gradients -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Products card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-primary/10 dark:from-dark-secondary dark:to-accent-primary/20 rounded-xl shadow-lg p-6 border-2 border-accent-primary/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Total Products</h3>
          <p class="text-3xl font-bold text-accent-primary">{{ products.length }}</p>
          <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">Active listings</p>
        </div>

        <!-- Low Stock card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-orange-500/10 dark:from-dark-secondary dark:to-orange-500/20 rounded-xl shadow-lg p-6 border-2 border-orange-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Low Stock</h3>
          <p class="text-3xl font-bold text-orange-500">{{ lowStockCount }}</p>
          <div class="flex items-center mt-2">
            <div class="h-2 flex-grow rounded-full bg-light-neutral-200 dark:bg-dark-neutral-700">
              <div class="h-2 rounded-full bg-orange-500 transition-all duration-300" :style="`width: ${(lowStockCount / products.length) * 100}%`"></div>
            </div>
          </div>
        </div>

        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-blue-500/10 dark:from-dark-secondary dark:to-blue-500/20 rounded-xl shadow-lg p-6 border-2 border-blue-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Featured</h3>
          <p class="text-3xl font-bold text-blue-500">{{ featuredCount }}</p>
          <p class="text-xs text-accent-tertiary mt-1">
            {{ ((featuredCount / products.length) * 100).toFixed(1) }}% of products
          </p>
        </div>

        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-cyan-500/10 dark:from-dark-secondary dark:to-cyan-500/20 rounded-xl shadow-lg p-6 border-2 border-cyan-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Total Value</h3>
          <p class="text-3xl font-bold text-cyan-500">{{ formatCurrency(totalInventoryValue) }}</p>
          <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">Inventory worth</p>
        </div>
      </div>

      <!-- Enhanced Filter Section -->
      <div class="bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg p-6 mb-6 border border-light-neutral-300 dark:border-dark-neutral-700">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex-1">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search products..."
              class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
            />
          </div>
          <div>
            <select
              v-model="categoryFilter"
              class="p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
            >
              <option value="all">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Enhanced Table -->
      <div class="bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden border border-light-neutral-300 dark:border-dark-neutral-700">
        <div class="overflow-x-auto">
          <table class="min-w-full bg-light-secondary dark:bg-dark-secondary">
            <thead class="bg-light-neutral-100 dark:bg-dark-neutral-700">
              <tr>
                <th class="py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary">
                  <button @click="sortProducts('image')">
                    Image
                  </button>
                </th>
                <th class="py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary">
                  <button @click="sortProducts('name')">
                    Name
                  </button>
                </th>
                <th class="py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary">
                  <button @click="sortProducts('category')">
                    Category
                  </button>
                </th>
                <th class="py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary">
                  <button @click="sortProducts('price')">
                    Price
                  </button>
                </th>
                <th class="py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary">
                  <button @click="sortProducts('stock')">
                    Stock
                  </button>
                </th>
                <th class="py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary">
                  <button @click="sortProducts('featured')">
                    Featured
                  </button>
                </th>
                <th class="py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary">
                  <button @click="sortProducts('actions')">
                    Actions
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="7" class="py-4 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
              <tr v-else-if="filteredProducts.length === 0">
                <td colspan="7" class="py-4 text-center text-light-text-secondary dark:text-dark-text-secondary">
                  No products found
                </td>
              </tr>
              <tr v-for="product in filteredProducts" :key="product.id" class="border-b border-light-neutral-200 dark:border-dark-neutral-600 hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 transition-colors">
                <td class="py-3 px-4">
                  <div class="relative w-16 h-16 rounded overflow-hidden bg-light-neutral-100 dark:bg-dark-neutral-800">
                    <img 
                      :src="processImageUrl(product.images?.[0] || product.imageUrl || product.image)" 
                      :alt="product.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                </td>
                <td class="py-3 px-4 text-light-text-primary dark:text-dark-text-primary">{{ product.name }}</td>
                <td class="py-3 px-4 text-light-text-primary dark:text-dark-text-primary">{{ product.category }}</td>
                <td class="py-3 px-4 text-light-text-primary dark:text-dark-text-primary">${{ product.price.toFixed(2) }}</td>
                <td class="py-3 px-4 text-light-text-primary dark:text-dark-text-primary">{{ product.stock }}</td>
                <td class="py-3 px-4">
                  <span v-if="product.featured" class="text-accent-tertiary dark:text-accent-tertiary">Yes</span>
                  <span v-else class="text-light-neutral-500 dark:text-dark-neutral-500">No</span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex space-x-2">
                    <button 
                      @click="editProduct(product)" 
                      class="text-accent-quaternary dark:text-accent-quaternary hover:text-accent-quaternary/80 dark:hover:text-accent-quaternary/80 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      @click="confirmDelete(product)" 
                      class="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <Modal v-if="showDeleteModal" @close="showDeleteModal = false">
        <template #header>
          <h3 class="text-xl font-medium text-light-text-primary dark:text-dark-text-primary">Confirm Delete</h3>
        </template>
        <template #body>
          <p class="text-light-text-secondary dark:text-dark-text-secondary">
            Are you sure you want to delete "{{ productToDelete?.name }}"?
            This action cannot be undone.
          </p>
        </template>
        <template #footer>
          <div class="flex justify-end space-x-3">
            <Button 
              variant="secondary" 
              @click="showDeleteModal = false"
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              @click="deleteProduct"
            >
              Delete
            </Button>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Breadcrumbs from '../components/ui/Breadcrumbs.vue';
import { useRouter } from 'vue-router';
import { firebaseService } from '../services/firebaseService';
import LoadingSpinner from '../components/ui/LoadingSpinner.vue';
import Modal from '../components/ui/Modal.vue';
import Button from '../components/ui/Button.vue';
import { formatCurrency } from '@/utils/currency';

const router = useRouter();
const products = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showDeleteModal = ref(false);
const productToDelete = ref(null);
const emptyProduct = ref({});

/**
 * ## Process image URL
 * Returns a valid image URL or a placeholder image.
 */
const processImageUrl = (url) => {
  if (!url) return '/images/no-image.jpg';
  
  if (typeof url === 'string') {
    // Handle base64 images
    if (url.startsWith('data:image')) {
      return url;
    }
    // Handle base64 images without data:image prefix
    if (url.startsWith('/9j/') || url.startsWith('iVBOR')) {
      return `data:image/jpeg;base64,${url}`;
    }
    // Handle base64 images with incorrect prefix
    if (url.startsWith('base64://')) {
      return url.replace('base64://', '');
    }
  }
  return url;
};

/**
 * ## Handle image error
 * Displays a placeholder image for any broken images.
 */
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  event.target.src = '/images/no-image.jpg';
  
  event.target.onerror = function() {
    const parent = event.target.parentNode;
    if (parent) {
      const svgElement = document.createElement('div');
      svgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full">
          <rect width="100%" height="100%" fill="#f0f0f0"/>
          <path d="M12 6v12M6 12h12" stroke="#aaa" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      svgElement.className = 'broken-image rounded w-16 h-16 flex items-center justify-center bg-light-neutral-200 dark:bg-dark-neutral-200';
      parent.replaceChild(svgElement, event.target);
    }
  };
};

// Fetch products when component mounts
const fetchProducts = async () => {
  try {
    loading.value = true;
    const fetchedProducts = await firebaseService.getProducts();
    products.value = fetchedProducts.map(product => ({
      ...product,
      images: Array.isArray(product.images) ? product.images : [product.imageUrl || product.image]
    }));
  } catch (error) {
    console.error('Failed to load products:', error);
  } finally {
    loading.value = false;
  }
};

// Add new state variables and computed properties
const sortField = ref('name');
const sortDirection = ref('asc');
const categoryFilter = ref('all');
const lowStockCount = computed(() => products.value.filter(p => p.stock < 5).length);
const featuredCount = computed(() => products.value.filter(p => p.featured).length);
const totalInventoryValue = computed(() =>
  products.value.reduce((sum, product) => sum + (product.price * product.stock), 0)
);
const categories = computed(() => [...new Set(products.value.map(p => p.category))]);
const filteredProducts = computed(() => {
  let result = [...products.value];

  if (categoryFilter.value !== 'all') {
    result = result.filter(p => p.category === categoryFilter.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  // Sort
  const getComparator = (a, b) => {
    if (typeof a[sortField.value] === 'string') {
      return a[sortField.value].localeCompare(b[sortField.value]);
    }
    return Number(a[sortField.value]) - Number(b[sortField.value]);
  }
  result.sort((a, b) => sortDirection.value === 'asc' ? getComparator(a, b) : getComparator(b, a));
  return result;
});

const deleteProduct = async () => {
  if (!productToDelete.value) return;

  try {
    await firebaseService.deleteProduct(productToDelete.value.id);

    // Remove from local products array
    const index = products.value.findIndex(p => p.id === productToDelete.value.id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }

    showDeleteModal.value = false;
    productToDelete.value = null;
  } catch (error) {
    console.error('Failed to delete product:', error);
    // Show error notification (you can add this functionality)
  }
};

const editProduct = (product) => {
  router.push(`/admin/products/edit/${product.id}`);
};

const confirmDelete = (product) => {
  productToDelete.value = product;
  showDeleteModal.value = true;
};

const sortProducts = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
};

// Update the fetchProducts function to process images
onMounted(fetchProducts);
</script>

<style scoped>
.broken-image {
  position: relative;
  overflow: hidden;
  background-color: rgb(243 244 246);
}

.dark .broken-image {
  background-color: rgb(31 41 55);
}

.image-container {
  position: relative;
  overflow: hidden;
  background-color: rgb(243 244 246);
  transition: transform 0.2s ease-in-out;
}

.dark .image-container {
  background-color: rgb(31 41 55);
}

.image-container:hover {
  transform: scale(1.05);
}
</style>