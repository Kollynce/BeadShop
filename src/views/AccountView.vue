<template>
  <div class="min-h-screen bg-light-primary dark:bg-dark-primary">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary">My Account</h1>

      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-6 animate-pulse">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="i in 4" :key="i" class="space-y-2">
              <div class="h-4 bg-gray-200 rounded w-1/4"></div>
              <div class="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div class="bg-white shadow rounded-lg p-6">
          <div class="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div v-for="i in 3" :key="i" class="mb-4 pb-4 border-b last:border-b-0">
            <div class="flex justify-between mb-2">
              <div class="h-6 bg-gray-200 rounded w-1/4"></div>
              <div class="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      <TransitionRoot appear :show="!loading" as="div" enter="transition-opacity duration-500"
        enter-from="opacity-0" enter-to="opacity-100">
        <div>
          <!-- Notification messages -->
          <TransitionRoot appear :show="!!successMsg" as="div"
            enter="transform transition duration-300 ease-out"
            enter-from="-translate-y-4 opacity-0"
            enter-to="translate-y-0 opacity-100"
            leave="transform transition duration-200 ease-in"
            leave-from="translate-y-0 opacity-100"
            leave-to="-translate-y-4 opacity-0"
            class="mb-6">
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm flex items-center">
              <CheckIcon class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <p class="text-green-700">{{ successMsg }}</p>
            </div>
          </TransitionRoot>

          <TransitionRoot appear :show="!!errorMsg" as="div"
            enter="transform transition duration-300 ease-out"
            enter-from="-translate-y-4 opacity-0"
            enter-to="translate-y-0 opacity-100"
            leave="transform transition duration-200 ease-in"
            leave-from="translate-y-0 opacity-100"
            leave-to="-translate-y-4 opacity-0"
            class="mb-6">
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm flex items-center">
              <XMarkIcon class="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <p class="text-red-700">{{ errorMsg }}</p>
            </div>
          </TransitionRoot>

          <!-- TabGroup for main navigation -->
          <TabGroup :defaultIndex="0" as="div" :class="getTransitionClasses(100)">
            <TabList class="flex border-b border-light-neutral-300 dark:border-dark-neutral-700 mb-6 space-x-2">
              <Tab v-slot="{ selected }" as="template">
                <button class="py-3 px-6 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-t-md transition-colors"
                  :class="[selected ? 'text-accent-primary border-b-2 border-accent-primary bg-accent-secondary/10' : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary']">
                  Profile Information
                </button>
              </Tab>
              <Tab v-slot="{ selected }" as="template">
                <button class="py-3 px-6 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-t-md transition-colors flex items-center"
                  :class="[selected ? 'text-accent-primary border-b-2 border-accent-primary bg-accent-secondary/10' : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary']">
                  Order History
                  <span v-if="orders.length"
                    class="ml-2 bg-accent-secondary/20 text-accent-primary text-xs px-2 py-0.5 rounded-full">
                    {{ orders.length }}
                  </span>
                </button>
              </Tab>
            </TabList>

            <TabPanels class="focus:outline-none">
              <!-- Profile Tab Panel -->
              <TabPanel :class="getTransitionClasses(200)" class="focus:outline-none">
                <div class="bg-white dark:bg-dark-neutral-800 shadow-sm rounded-lg overflow-hidden ring-1 ring-gray-900/5 dark:ring-dark-neutral-700">
                  <div class="bg-gradient-to-r from-accent-quaternary to-accent-secondary px-6 py-4">
                    <div class="flex justify-between items-center">
                      <h2 class="text-xl font-semibold text-white">Personal Details</h2>
                      <button 
                      v-if="!editMode" 
                      @click="editMode = true"
                      class="btn-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
                      aria-label="Edit profile">
                      <PencilIcon class="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    </div>
                  </div>
                  <div class="p-6">
                  <!-- View mode -->
                  <div v-if="!editMode" class="grid md:grid-cols-2 gap-y-6 gap-x-8">
                      <div class="profile-field">
                        <p class="text-gray-800">Full Name</p>
                        <p class="text-gray-800">{{ userProfile?.firstName || '-' }} {{ userProfile?.lastName || '' }}</p>
                      </div>
                      <div class="profile-field">
                        <p class="text-gray-800">Email</p>
                        <p class="text-gray-800">{{ userProfile?.email || authStore.user.email }}</p>
                      </div>
                      <div class="profile-field">
                        <p class="text-gray-800">Phone</p>
                        <p class="text-gray-800">{{ userProfile?.phone || 'Not provided' }}</p>
                      </div>
                      <div class="profile-field">
                        <p class="text-gray-800">Address</p>
                        <p class="text-gray-800">{{ userProfile?.address || 'Not provided' }}</p>
                      </div>
                    </div>

                    <!-- Edit mode -->
                    <TransitionRoot 
                      appear 
                      :show="editMode" 
                      enter="transition-opacity ease-out duration-300"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      leave="transition-opacity ease-in duration-200"
                      leave-from="opacity-100"
                      leave-to="opacity-0"
                      as="div"
                    >
                      <form @submit.prevent="saveProfile" class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                          <label class="text-sm font-medium field-label" for="firstName">First Name</label>
                          <input 
                            id="firstName" 
                            v-model="formData.firstName" 
                            type="text" 
                            class="w-full px-4 py-2.5 bg-white border border-gray-300 dark:border-dark-neutral-600 
                            rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                            placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-500 transition-colors duration-200" 
                            placeholder="Enter your first name"
                          >
                        </div>

                        <div class="space-y-2">
                          <label class="text-sm font-medium field-label" for="lastName">Last Name</label>
                          <input 
                            id="lastName" 
                            v-model="formData.lastName" 
                            type="text" 
                            class="w-full px-4 py-2.5 bg-white border border-gray-300 dark:border-dark-neutral-600 
                            rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                            placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-500 transition-colors duration-200"
                            placeholder="Enter your last name"
                          >
                        </div>

                        <div class="space-y-2">
                          <label class="text-sm font-medium field-label" for="email">Email</label>
                          <input 
                            id="email" 
                            v-model="formData.email" 
                            type="email" 
                            class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 dark:border-dark-neutral-700 
                            rounded-lg shadow-sm cursor-not-allowed text-gray-500 dark:text-gray-400" 
                            disabled 
                            aria-disabled="true"
                          >
                          <p class="text-xs text-gray-500 mt-1.5">Email cannot be changed</p>
                        </div>

                        <div class="space-y-2">
                          <label class="text-sm font-medium field-label" for="phone">Phone</label>
                          <input 
                            id="phone" 
                            v-model="formData.phone" 
                            type="tel" 
                            class="w-full px-4 py-2.5 bg-white  border border-gray-300 dark:border-dark-neutral-600 
                            rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                            placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors duration-200" 
                            placeholder="Enter your phone number"
                          >
                        </div>

                        <div class="md:col-span-2 space-y-2">
                          <label class="text-sm font-medium field-label" for="address">Address</label>
                          <textarea 
                            id="address" 
                            v-model="formData.address" 
                            class="w-full px-4 py-2.5 bg-white  border border-gray-300 dark:border-dark-neutral-600 
                            rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                            placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors duration-200 
                            min-h-[100px] resize-y" 
                            placeholder="Enter your address"
                          ></textarea>
                        </div>

                        <div class="md:col-span-2 flex justify-end space-x-4 pt-4">
                          <button 
                            type="button" 
                            @click="editMode = false" 
                            class="px-4 py-2.5 border border-gray-300 dark:border-dark-neutral-600 
                            rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-neutral-700 
                            hover:bg-gray-50 dark:hover:bg-dark-neutral-600 focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            class="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                            hover:to-purple-700 text-white font-medium rounded-lg shadow-sm focus:outline-none 
                            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 
                            flex items-center"
                          >
                            <CheckIcon class="w-4 h-4 mr-1.5" />
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </TransitionRoot>
                  </div>
                </div>
              </TabPanel>

              <!-- Orders Tab Panel -->
              <TabPanel :class="getTransitionClasses(300)" class="focus:outline-none">
                <div class="bg-white dark:bg-dark-neutral-800 shadow-sm rounded-lg overflow-hidden ring-1 ring-gray-900/5 dark:ring-dark-neutral-700">
                  <div class="bg-gradient-to-r from-accent-quaternary to-accent-secondary px-6 py-4">
                    <h2 class="text-xl font-semibold text-white">Order History</h2>
                  </div>

                  <div class="p-6">
                    <div v-if="orders.length === 0" class="text-center py-12 bg-gray-50 dark:bg-indigo-900/20 rounded-lg">
                      <ShoppingBagIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p class="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <router-link to="/products" class="btn btn-primary inline-flex items-center justify-center">
                        <ShoppingBagIcon class="w-4 h-4 mr-2" />
                        Start Shopping
                      </router-link>
                    </div>

                    <div v-else class="space-y-6">
                      <TransitionRoot 
                      appear 
                      :show="true"
                      enter="transition-opacity ease-out duration-300"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      as="div"
                      class="space-y-6"
                      >
                        <div v-for="(order, index) in orders" :key="order.id" 
                        class="bg-white dark:bg-dark-neutral-800 border border-gray-200 dark:border-dark-neutral-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                        :class="{'delay-100': index === 0, 'delay-150': index === 1, 'delay-200': index >= 2}">
                          <Disclosure v-slot="{ open }" as="div" defaultOpen>
                            <DisclosureButton 
                            class="w-full bg-gray-50 dark:bg-indigo-900/20 p-4 flex flex-wrap justify-between items-center border-b dark:border-dark-neutral-600 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            >
                              <div class="flex items-start space-x-4">
                                <div class="bg-indigo-100 rounded-full p-2 hidden sm:block">
                                  <ShoppingBagIcon class="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                  <p class="font-medium text-gray-900 dark:text-gray-100">
                                    Order #{{ order.orderNumber }}
                                  </p>
                                  <div class="flex items-center text-sm text-gray-600 mt-1">
                                    <CalendarIcon class="w-3.5 h-3.5 mr-1.5" />
                                    {{ order.formattedDate }}
                                  </div>
                                </div>
                              </div>

                              <div class="flex flex-col items-end mt-2 sm:mt-0">
                                <p class="font-semibold text-lg text-gray-900 dark:text-gray-100">{{ formatCurrency(order.total) }}</p>
                                <span :class="['text-xs px-3 py-1 rounded-full mt-1 inline-flex items-center', getStatusColor(order.status || 'Processing')]">
                                  <span class="w-1.5 h-1.5 rounded-full mr-1"
                                    :class="{'bg-amber-500': (order.status || 'Processing') === 'Processing',
                                           'bg-blue-500': order.status === 'Shipped',
                                           'bg-emerald-500': order.status === 'Delivered',
                                           'bg-red-500': order.status === 'Cancelled'}"></span>
                                  {{ order.status || 'Processing' }}
                                </span>
                                <ChevronRightIcon
                                  class="w-5 h-5 text-gray-400 mt-1.5 transition-transform duration-200"
                                  :class="{'transform rotate-90': open}"
                                />
                              </div>
                            </DisclosureButton>
                            
                            <DisclosurePanel class="p-4 bg-white dark:bg-dark-neutral-800/50">
                              <div class="mb-2 pb-2 border-b border-dashed">
                                <h4 class="text-sm font-medium text-gray-800 mb-2">Items</h4>
                              </div>

                              <p v-if="!order.items || order.items.length === 0" class="text-sm italic text-gray-800">
                                No items found in this order
                              </p>
                              <div v-else class="space-y-2 mb-4">
                                <div v-for="(item, itemIndex) in order.items" :key="itemIndex"
                                  class="flex justify-between text-sm py-2 border-b border-gray-100 last:border-b-0">
                                  <div class="flex items-center">
                                    <!-- Product image thumbnail - improved matching ProductCard.vue -->
                                    <div class="h-14 w-14 rounded-md overflow-hidden border border-gray-200 mr-3 flex-shrink-0 bg-gray-50">
                                      <img
                                        :src="processImageUrl(item.imageUrl || item.image)"
                                        :alt="item.name"
                                        class="h-full w-full object-cover object-center"
                                        @error="handleImageError"
                                        loading="lazy"
                                      >
                                    </div>

                                    <!-- Item info -->
                                    <div>
                                      <span class="text-gray-800 font-medium">{{ item.name }}</span>
                                      <div class="flex items-center mt-1">
                                        <span class="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs">
                                          {{ item.quantity }}
                                        </span>
                                        <span class="text-xs text-gray-500 md:hidden">
                                          {{ formatCurrency(item.price) }} each
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Item price (for desktop) -->
                                  <div class="flex flex-col items-end">
                                    <span class="text-gray-900 font-medium">
                                      {{ formatCurrency(item.price * item.quantity) }}
                                    </span>
                                    <span class="text-xs text-gray-500 hidden md:block">
                                      {{ formatCurrency(item.price) }} each
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <!-- Order summary and details -->
                              <div class="mt-4 flex flex-col space-y-2 text-sm">
                                <div class="flex justify-between text-gray-800 pt-2 border-t">
                                  <span>Order date:</span>
                                  <span class="text-gray-800">{{ order.formattedDate }}</span>
                                </div>
                                <div class="flex justify-between text-gray-800">
                                  <span>Total:</span>
                                  <span class="text-gray-800">{{ formatCurrency(order.total) }}</span>
                                </div>
                              </div>
                            </DisclosurePanel>
                          </Disclosure>
                        </div>
                      </TransitionRoot>

                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { firebaseService } from '../services/firebaseService'
import { formatCurrency } from '@/utils/currency'
import { Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionRoot, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { CheckIcon, XMarkIcon, PencilIcon, ShoppingBagIcon, CalendarIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const userProfile = ref(null)
const orders = ref([])
const loading = ref(true)
const editMode = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const activeTab = ref('profile') // New ref for tab navigation

// For development mode detection
const isDev = ref(import.meta.env.DEV || false)

// Form data for profile editing
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
})

// Track if page is fully loaded for transition effects
const pageLoaded = ref(false)

onMounted(async () => {
  if (authStore.user) {
    try {
      // Get user profile
      const profile = await firebaseService.getUserProfile(authStore.user.uid)
      userProfile.value = profile

      // Pre-populate form data
      if (profile) {
        formData.value = {
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || authStore.user.email,
          phone: profile.phone || '',
          address: profile.address || ''
        }
      }

      // Get user orders with better error handling
      try {
        console.log('Fetching orders for user:', authStore.user.uid);
        const userOrders = await firebaseService.getUserOrders(authStore.user.uid);
        console.log('Orders received:', userOrders.length, userOrders);

        if (userOrders && userOrders.length > 0) {
          orders.value = userOrders.map(order => ({
            ...order,
            // Ensure we have proper formatting for display
            formattedDate: formatOrderDate(order.orderDate),
            displayTotal: typeof order.total === 'number' ? order.total.toFixed(2) : '0.00',
            orderNumber: order.orderNumber || `ORD-${order.id.substring(0, 6)}`,
            items: Array.isArray(order.items) ? order.items : []
          }));
          console.log('Processed orders:', orders.value);
        } else {
          console.log('No orders found or empty array returned');
          orders.value = [];
        }
      } catch (orderError) {
        console.error('Error fetching orders:', orderError);
        orders.value = [];
        errorMsg.value = 'Could not load order history';
      }
    } catch (error) {
      errorMsg.value = 'Error loading user data'
      console.error('Error in account view:', error)
    } finally {
      loading.value = false
      // Small delay to ensure smooth transition after page load
      setTimeout(() => {
        pageLoaded.value = true
      }, 100)
    }
  } else {
    loading.value = false
    setTimeout(() => {
      pageLoaded.value = true
    }, 100)
  }
})

// Format firestore timestamp for display with better error handling
const formatOrderDate = (timestamp) => {
  if (!timestamp) return 'N/A';

  try {
    // Handle multiple timestamp formats
    let date;

    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      // Firestore Timestamp
      date = timestamp.toDate();
    } else if (timestamp.seconds) {
      // Firestore Timestamp in serialized form
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Date) {
      // JavaScript Date
      date = timestamp;
    } else if (typeof timestamp === 'string') {
      // ISO string or other string format
      date = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
      // Unix timestamp (milliseconds)
      date = new Date(timestamp);
    } else {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error, timestamp);
    return 'Date error';
  }
}

// Handle profile form submission
const saveProfile = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  try {
    await firebaseService.updateUserProfile(authStore.user.uid, formData.value)
    userProfile.value = { ...userProfile.value, ...formData.value }
    editMode.value = false
    successMsg.value = 'Profile updated successfully!'

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      successMsg.value = ''
    }, 3000)
  } catch (error) {
    errorMsg.value = 'Failed to update profile'
    console.error('Error updating profile:', error)
  }
}

// Get appropriate status color based on order status
const getStatusColor = (status) => {
  const statusMap = {
    'Processing': 'bg-amber-100 text-amber-800 border border-amber-300',
    'Shipped': 'bg-blue-100 text-blue-800 border border-blue-300',
    'Delivered': 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    'Cancelled': 'bg-red-100 text-red-800 border border-red-300'
  }

  return statusMap[status] || 'bg-gray-100 text-gray-800 border border-gray-300'
}

// Add transition classes for elements
const getTransitionClasses = (delay = 0) => {
  return {
    'transition-all duration-500 ease-out': true,
    'opacity-0 translate-y-4': !pageLoaded.value,
    'opacity-100 translate-y-0': pageLoaded.value,
    [`delay-${delay}`]: delay > 0
  }
}

// Process image URLs to handle errors - matching ProductCard.vue implementation
const processImageUrl = (url) => {
  if (!url) return '/images/no-image.jpg';

  // Handle different image formats
  if (typeof url === 'string') {
    // Handle base64 images
    if (url.startsWith('base64://')) {
      return url.replace('base64://', '');
    }
    // Handle temp images
    if (url.startsWith('temp://')) {
      return url.replace('temp://', '');
    }
  }

  return url;
}

// Handle image loading errors - matching ProductCard.vue implementation
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  event.target.src = '/images/no-image.jpg';

  // If the local fallback fails, use inline SVG
  event.target.onerror = function () {
    const parent = event.target.parentNode;
    if (parent) {
      parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-100');
      event.target.style.display = 'none';

      const svgElement = document.createElement('div');
      svgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 24 24" width="100%" height="100%">
          <rect width="100%" height="100%" fill="#f0f0f0"/>
          <path d="M12 6v12M6 12h12" stroke="#aaa" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      svgElement.className = 'broken-image';
      parent.appendChild(svgElement);
    }
  };
}
</script>

<style scoped>
.field-label {
  color: rgb(31 41 55);
}
.dark .field-label {
  color: rgb(209 213 219);
}
</style>
