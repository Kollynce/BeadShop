<template>
  <div class="min-h-screen bg-light-primary dark:bg-dark-secondary">
    <!-- Animation element for cart add effect -->
    <div 
      v-if="animatingItem" 
      class="cart-animation fixed pointer-events-none z-50" 
      ref="cartAnimationEl"
      :style="{ backgroundImage: `url(${animatingItem?.image})` }">
    </div>
    
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-light-secondary dark:bg-dark-secondary py-4 pb-12 shadow-xl">
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">Filters</h2>
                  <button type="button" class="-mr-2 flex size-10 items-center justify-center rounded-md bg-light-secondary dark:bg-dark-secondary p-2 text-light-neutral-500 dark:text-dark-neutral-500" @click="mobileFiltersOpen = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="size-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4 border-t border-light-neutral-200 dark:border-dark-neutral-700">
                  <h3 class="sr-only">Categories</h3>
                  <ul role="list" class="px-2 py-3 font-medium text-light-text-primary dark:text-dark-text-primary">
                    <li v-for="category in subCategories" :key="category.name">
                      <a href="#" @click.prevent="selectCategory(category.value)" class="block px-2 py-3">{{ category.name }}</a>
                    </li>
                  </ul>

                  <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-t border-light-neutral-200 dark:border-dark-neutral-700 px-4 py-6" v-slot="{ open }">
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton class="flex w-full items-center justify-between bg-light-secondary dark:bg-dark-secondary px-2 py-3 text-light-neutral-500 dark:text-dark-neutral-500 hover:text-light-neutral-700 dark:hover:text-dark-neutral-300">
                        <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ section.name }}</span>
                        <span class="ml-6 flex items-center">
                          <PlusIcon v-if="!open" class="size-5" aria-hidden="true" />
                          <MinusIcon v-else class="size-5" aria-hidden="true" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex gap-3">
                          <div class="flex h-5 shrink-0 items-center">
                            <div class="group grid size-4 grid-cols-1">
                              <input 
                                :id="`filter-mobile-${section.id}-${optionIdx}`" 
                                :name="`${section.id}[]`" 
                                :value="option.value" 
                                type="checkbox" 
                                :checked="option.checked"
                                @change="toggleFilter(section.id, option.value)"
                                class="col-start-1 row-start-1 appearance-none rounded-sm border border-light-neutral-300 dark:border-dark-neutral-700 bg-light-secondary dark:bg-dark-secondary checked:border-accent-primary checked:bg-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary disabled:border-light-neutral-300 dark:disabled:border-dark-neutral-700 disabled:bg-light-neutral-100 dark:disabled:bg-dark-neutral-800" 
                              />
                              <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-light-neutral-900/25 dark:group-has-disabled:stroke-dark-neutral-100/25" viewBox="0 0 14 14" fill="none">
                                <path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path class="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                          <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="min-w-0 flex-1 text-light-neutral-600 dark:text-dark-neutral-400">{{ option.label }}</label>
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-baseline justify-between border-b border-light-neutral-200 dark:border-dark-neutral-700 pt-24 pb-6">
          <h1 class="text-2xl lg:text-4xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">Our Collection</h1>

          <div class="flex items-center">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton class="group inline-flex justify-center text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary">
                  Sort
                  <ChevronDownIcon class="-mr-1 ml-1 size-5 shrink-0 text-light-neutral-400 dark:text-dark-neutral-600 group-hover:text-light-neutral-500 dark:group-hover:text-dark-neutral-500" aria-hidden="true" />
                </MenuButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-light-secondary dark:bg-dark-secondary ring-1 shadow-2xl ring-black/5 focus:outline-hidden">
                  <div class="py-1">
                    <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                      <a 
                        href="#" 
                        @click.prevent="setSort(option)"
                        :class="[option.current ? 'font-medium text-light-text-primary dark:text-dark-text-primary' : 'text-light-text-secondary dark:text-dark-text-secondary', active ? 'bg-light-neutral-100 dark:bg-dark-neutral-800 outline-hidden' : '', 'block px-4 py-2 text-sm']"
                      >
                        {{ option.name }}
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button type="button" class="-m-2 ml-5 p-2 text-light-neutral-400 dark:text-dark-neutral-600 hover:text-light-neutral-500 dark:hover:text-dark-neutral-500 sm:ml-7">
              <span class="sr-only">View grid</span>
              <Squares2X2Icon class="size-5" aria-hidden="true" />
            </button>
            <button type="button" class="-m-2 ml-4 p-2 text-light-neutral-400 dark:text-dark-neutral-600 hover:text-light-neutral-500 dark:hover:text-dark-neutral-500 sm:ml-6 lg:hidden" @click="mobileFiltersOpen = true">
              <span class="sr-only">Filters</span>
              <FunnelIcon class="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pt-6 pb-24">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block">
              <h3 class="sr-only">Categories</h3>
              <ul role="list" class="space-y-4 border-b border-light-neutral-200 dark:border-dark-neutral-700 pb-6 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                <li v-for="category in subCategories" :key="category.name">
                  <a href="#" @click.prevent="selectCategory(category.value)">{{ category.name }}</a>
                </li>
                <li class="mt-2">
                  <a href="#" @click.prevent="products = allProducts" class="text-accent-primary hover:text-accent-secondary">
                    View All
                  </a>
                </li>
              </ul>

              <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-b border-light-neutral-200 dark:border-dark-neutral-700 py-6" v-slot="{ open }">
                <h3 class="-my-3 flow-root">
                  <DisclosureButton class="flex w-full items-center justify-between dark:bg-dark-secondary py-3 text-sm text-light-neutral-400 dark:text-dark-neutral-600 hover:text-light-neutral-500 dark:hover:text-dark-neutral-500">
                    <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ section.name }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="size-5" aria-hidden="true" />
                      <MinusIcon v-else class="size-5" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="space-y-4">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex gap-3">
                      <div class="flex h-5 shrink-0 items-center">
                        <div class="group grid size-4 grid-cols-1">
                          <input 
                            :id="`filter-${section.id}-${optionIdx}`" 
                            :name="`${section.id}[]`" 
                            :value="option.value" 
                            type="checkbox" 
                            :checked="option.checked"
                            @change="toggleFilter(section.id, option.value)"
                            class="col-start-1 row-start-1 appearance-none rounded-sm border border-light-neutral-300 dark:border-dark-neutral-700 bg-light-secondary dark:bg-dark-secondary checked:border-accent-primary checked:bg-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary disabled:border-light-neutral-300 dark:disabled:border-dark-neutral-700 disabled:bg-light-neutral-100 dark:disabled:bg-dark-neutral-800" 
                          />
                          <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-light-neutral-900/25 dark:group-has-disabled:stroke-dark-neutral-100/25" viewBox="0 0 14 14" fill="none">
                            <path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path class="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <label :for="`filter-${section.id}-${optionIdx}`" class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ option.label }}</label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              <div v-if="loading" class="text-center py-8">
                <p class="text-light-text-secondary dark:text-dark-text-secondary">Loading products...</p>
              </div>
              
              <div v-else-if="products.length === 0" class="text-center py-8">
                <p class="text-light-text-secondary dark:text-dark-text-secondary">No products found.</p>
              </div>
              
              <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductCard 
                  v-for="product in products" 
                  :key="product.id" 
                  :product="product" 
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue'
import { firebaseService } from '../services/firebaseService'
import { useCartStore } from '../stores/cart'
import { mockDataLoader } from '../utils/mockDataLoader'
import ProductCard from '@/components/ProductCard.vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/vue/20/solid'
import { formatCurrency } from '@/utils/currency'

const products = ref([])
const allProducts = ref([]) // Keep original unfiltered list
const loading = ref(true)
const cartStore = useCartStore()
const mobileFiltersOpen = ref(false)
const animatingItem = ref(null)
const cartAnimationEl = ref(null)

// Track selected filters
const selectedFilters = reactive({
  metal: [],
  category: [],
  price: []
})

// Create sort options
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false, sort: (a, b) => a.price - b.price },
  { name: 'Price: High to Low', href: '#', current: false, sort: (a, b) => b.price - a.price },
]

const activeSortOption = ref(sortOptions[0])

const subCategories = [
  { name: 'Beaded Jewelry', href: '#', value: 'Beaded Jewelry' },
  { name: 'String Jewelry', href: '#', value: 'String Jewelry' },
  { name: 'Metal Jewelry', href: '#', value: 'Metal Jewelry' },
  { name: 'Gemstones', href: '#', value: 'Gemstones' },
  { name: 'Earrings', href: '#', value: 'Earrings' },
  { name: 'Necklaces', href: '#', value: 'Necklaces' },
  { name: 'Bracelets', href: '#', value: 'Bracelets' },
  { name: 'Rings', href: '#', value: 'Rings' }
]

const filters = [
  {
    id: 'metal',
    name: 'Metal Type',
    options: [
      { value: 'gold', label: 'Gold', checked: false },
      { value: 'silver', label: 'Sterling Silver', checked: false },
      { value: 'rose-gold', label: 'Rose Gold', checked: false },
      { value: 'beads', label: 'Glass Beads', checked: false },
      { value: 'gemstones', label: 'Gemstones', checked: false },
      { value: 'pearls', label: 'Pearls', checked: false }
    ],
  },
  {
    id: 'style',
    name: 'Style',
    options: [
      { value: 'handcrafted', label: 'Handcrafted', checked: false },
      { value: 'modern', label: 'Modern', checked: false },
      { value: 'traditional', label: 'Traditional', checked: false },
      { value: 'luxury', label: 'Luxury', checked: false }
    ],
  },
  {
    id: 'price',
    name: 'Price Range',
    options: [
      { value: 'under-5000', label: 'Under KES 5,000', checked: false },
      { value: '5000-10000', label: 'KES 5,000 - 10,000', checked: false },
      { value: '10000-20000', label: 'KES 10,000 - 20,000', checked: false },
      { value: '20000-plus', label: 'KES 20,000+', checked: false },
    ],
  },
]

// Computed property for filtered products
const filteredProducts = computed(() => {
  // Start with all products
  let result = [...allProducts.value];
  
  // Filter by metal
  if (selectedFilters.metal.length > 0) {
    result = result.filter(product => selectedFilters.metal.includes(product.metal));
  }
  
  // Filter by category tags
  if (selectedFilters.category.length > 0) {
    result = result.filter(product => 
      product.tags && product.tags.some(tag => selectedFilters.category.includes(tag))
    );
  }
  
  // Filter by price range
  if (selectedFilters.price.length > 0) {
    result = result.filter(product => {
      const price = product.price;
      return selectedFilters.price.some(range => {
        if (range === 'under-5000') return price < 5000;
        if (range === '5000-10000') return price >= 5000 && price <= 10000;
        if (range === '10000-20000') return price >= 10000 && price <= 20000;
        if (range === '20000-plus') return price > 20000;
        return false;
      });
    });
  }
  
  // Apply sorting if a sort function is available
  if (activeSortOption.value.sort) {
    result = [...result].sort(activeSortOption.value.sort);
  }
  
  return result;
});

// Watch for changes in filtered products and update the products list
const updateProducts = () => {
  products.value = filteredProducts.value;
};

// Toggle filter selection
const toggleFilter = (filterId, value) => {
  const filterArray = selectedFilters[filterId];
  const index = filterArray.indexOf(value);
  
  if (index === -1) {
    // Add the value if it doesn't exist
    filterArray.push(value);
  } else {
    // Remove the value if it exists
    filterArray.splice(index, 1);
  }
  
  // Update checkbox state in the filters array
  filters.forEach(section => {
    if (section.id === filterId) {
      section.options.forEach(option => {
        option.checked = filterArray.includes(option.value);
      });
    }
  });
  
  updateProducts();
};

// Select category from sidebar
const selectCategory = (category) => {
  // Reset current category filters
  selectedFilters.category = [];
  
  // Filter products by the selected category
  products.value = allProducts.value.filter(product => product.category === category);
};

// Set active sort option
const setSort = (option) => {
  // Update current status for all options
  sortOptions.forEach(opt => opt.current = (opt === option));
  activeSortOption.value = option;
  updateProducts();
};

onMounted(async () => {
  loading.value = true;
  try {
    // First try to load products directly from Firestore
    const firestoreProducts = await loadFirestoreProducts();
    
    // If we have products from Firestore, use them
    if (firestoreProducts.length > 0) {
      console.log('Loaded products from Firestore:', firestoreProducts.length);
      allProducts.value = firestoreProducts;
      products.value = firestoreProducts;
    } else {
      // Fall back to mock data if no products in Firestore
      console.log('No products in Firestore, using mock data');
      const mockProducts = await mockDataLoader.getProducts();
      allProducts.value = mockProducts || [];
      products.value = mockProducts || [];
    }
    
    console.log('Total products loaded:', products.value.length);
  } catch (error) {
    console.error('Error loading products:', error);
    // Fallback to empty array if there's an error
    allProducts.value = [];
    products.value = [];
  } finally {
    loading.value = false;
  }
});

// Function to load products directly from Firestore (not using the fallback in firebaseService)
const loadFirestoreProducts = async () => {
  try {
    const db = firebaseService.getFirestore();
    if (!db) return []; // Safety check
    
    const productsCollection = firebaseService.getCollection('products');
    const productsSnapshot = await firebaseService.getDocuments(productsCollection);
    
    if (productsSnapshot.empty) {
      return [];
    }
    
    // Process all products and standardize their format
    return productsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure all products have required fields for display
        name: data.name || 'Unnamed Product',
        price: data.price || 0,
        category: data.category || 'Uncategorized',
        description: data.description || '',
        images: data.images || [],
        // Use first image as main image for product card
        image: data.images && data.images.length > 0 ? 
          // Handle base64 images
          (data.images[0].startsWith('base64://') ? 
            data.images[0].replace('base64://', '') : 
            data.images[0]) : 
          'https://via.placeholder.com/300x300?text=No+Image'
      };
    });
  } catch (error) {
    console.error('Error loading products from Firestore:', error);
    return []; // Return empty array in case of error
  }
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
}
</script>

<style scoped>
.cart-animation {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 9999;
  position: fixed;
}
</style>