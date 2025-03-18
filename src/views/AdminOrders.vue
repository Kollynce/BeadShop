<template>
  <div class="admin-orders min-h-screen bg-light-primary dark:bg-dark-primary transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <!-- Enhanced Header section -->
      <div class="flex justify-between items-center mb-12 bg-light-secondary dark:bg-dark-secondary p-6 rounded-xl shadow-lg">
        <div>
          <Breadcrumbs :items="[{ text: 'Dashboard', path: '/admin' }, { text: 'Orders' }]" />
          <h1 class="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2">Order Management</h1>
          <p class="text-light-text-secondary dark:text-dark-text-secondary mt-1">View and manage customer orders</p>
        </div>
        <button 
          @click="loadOrders" 
          class="bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-light-text-inverted neutral py-2 px-4 rounded-btn flex items-center shadow-btn hover:shadow-btn-hover transition-btn duration-200"
        >
          <ArrowPathIcon class="h-5 w-5 mr-2" />
          Refresh
        </button>
      </div>

      <!-- Enhanced metric cards with gradients -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Orders card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-primary/10 dark:from-dark-secondary dark:to-accent-primary/20 rounded-xl shadow-lg p-6 border-2 border-accent-primary/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Total Orders</h3>
          <p class="text-3xl font-bold text-accent-primary">{{ orders.length }}</p>
          <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">Last 30 days: +{{ recentOrdersCount }}</p>
        </div>

        <!-- Processing Orders card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-orange-500/10 dark:from-dark-secondary dark:to-orange-500/20 rounded-xl shadow-lg p-6 border-2 border-orange-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Processing</h3>
          <p class="text-3xl font-bold text-orange-500">{{ processingOrdersCount }}</p>
          <div class="flex items-center mt-2">
            <div class="h-2 flex-grow rounded-full bg-light-neutral-200 dark:bg-dark-neutral-700">
              <div class="h-2 rounded-full bg-orange-500 transition-all duration-300" :style="`width: ${(processingOrdersCount / orders.length) * 100}%`"></div>
            </div>
          </div>
        </div>

        <!-- Revenue card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-blue-500/10 dark:from-dark-secondary dark:to-blue-500/20 rounded-xl shadow-lg p-6 border-2 border-blue-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Revenue</h3>
          <p class="text-3xl font-bold text-blue-500">{{ formatCurrency(totalRevenue) }}</p>
          <p class="text-xs text-accent-tertiary mt-1">
            <span class="inline-block transform rotate-45">↗</span> {{ revenueIncrease }}% from last month
          </p>
        </div>

        <!-- Average Order Value card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-cyan-500/10 dark:from-dark-secondary dark:to-cyan-500/20 rounded-xl shadow-lg p-6 border-2 border-cyan-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Avg. Order Value</h3>
          <p class="text-3xl font-bold text-cyan-500">{{ formatCurrency(averageOrderValue) }}</p>
          <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">Per order</p>
        </div>
      </div>

      <!-- Enhanced Filter Section -->
      <div class="bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg p-6 mb-6 border border-light-neutral-300 dark:border-dark-neutral-700">
        <div class="flex flex-wrap items-center gap-4">
          <div>
            <label class="text-sm text-light-text-secondary dark:text-dark-text-secondary block mb-1">Filter by Status:</label>
            <select
              v-model="statusFilter"
              class="border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg px-3 py-2 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-light-text-secondary dark:text-dark-text-secondary block mb-1">Search:</label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search by Order ID, name, or email"
              class="border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg px-3 py-2 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
            />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
      </div>

      <!-- Enhanced Table Section -->
      <div v-else-if="filteredOrders.length > 0" class="bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden border border-light-neutral-300 dark:border-dark-neutral-700">
        <table class="w-full text-left">
          <thead class="bg-light-neutral-100 dark:bg-dark-neutral-800 border-b border-light-neutral-300 dark:border-dark-neutral-700">
            <tr>
              <th class="px-6 py-3 text-light-text-secondary dark:text-dark-text-secondary font-medium cursor-pointer" @click="sortOrders('orderNumber')">
                <div class="flex items-center">
                  <span>Order ID</span>
                  <SortIndicator :active="sortField === 'orderNumber'" :direction="sortDirection" />
                </div>
              </th>
              <th class="px-6 py-3 text-light-text-secondary dark:text-dark-text-secondary font-medium cursor-pointer" @click="sortOrders('orderDate')">
                <div class="flex items-center">
                  <span>Date</span>
                  <SortIndicator :active="sortField === 'orderDate'" :direction="sortDirection" />
                </div>
              </th>
              <th class="px-6 py-3 text-light-text-secondary dark:text-dark-text-secondary font-medium cursor-pointer" @click="sortOrders('customerName')">
                <div class="flex items-center">
                  <span>Customer Name</span>
                  <SortIndicator :active="sortField === 'customerName'" :direction="sortDirection" />
                </div>
              </th>
              <th class="px-6 py-3 text-light-text-secondary dark:text-dark-text-secondary font-medium cursor-pointer" @click="sortOrders('email')">
                <div class="flex items-center">
                  <span>Email</span>
                  <SortIndicator :active="sortField === 'email'" :direction="sortDirection" />
                </div>
              </th>
              <th class="px-6 py-3 text-light-text-secondary dark:text-dark-text-secondary font-medium cursor-pointer" @click="sortOrders('total')">
                <div class="flex items-center">
                  <span>Total</span>
                  <SortIndicator :active="sortField === 'total'" :direction="sortDirection" />
                </div>
              </th>
              <th class="px-6 py-3 text-light-text-secondary dark:text-dark-text-secondary font-medium cursor-pointer" @click="sortOrders('status')">
                <div class="flex items-center">
                  <span>Status</span>
                  <SortIndicator :active="sortField === 'status'" :direction="sortDirection" />
                </div>
              </th>
              <th class="px-6 py-3 text-light-text-secondary dark:text-dark-text-secondary font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id" class="border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium">{{ order.orderNumber || `#${order.id.substring(0, 6)}` }}</td>
              <td class="px-6 py-4">{{ formatDate(order.orderDate) }}</td>
              <td class="px-6 py-4">{{ order.customerName || 'Unknown' }}</td>
              <td class="px-6 py-4">{{ order.email || 'N/A' }}</td>
              <td class="px-6 py-4">{{ formatCurrency(order.total) }}</td>
              <td class="px-6 py-4">
                <span
                  :class="{
                      'bg-yellow-100 text-yellow-800': order.status === 'processing',
                      'bg-blue-100 text-blue-800': order.status === 'shipped',
                      'bg-green-100 text-green-800': order.status === 'delivered',
                      'bg-red-100 text-red-800': order.status === 'cancelled'
                    }"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ capitalizeFirstLetter(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button @click="viewOrderDetails(order)" class="text-blue-600 hover:text-blue-900 mr-3">
                  View
                </button>
                <button @click="openUpdateStatus(order)" class="text-green-600 hover:text-green-900">
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Orders Message -->
      <div v-else class="bg-white rounded-lg shadow-md p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 class="text-xl font-semibold text-gray-700">No orders found</h2>
        <p class="text-gray-500 mt-1">No orders match your current filters.</p>
      </div>

      <!-- Enhanced Modals -->
      <!-- Order Details Modal -->
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showOrderDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div class="bg-light-primary dark:bg-dark-primary rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform">
              <div class="p-6 border-b border-light-neutral-300 dark:border-dark-neutral-700">
                <div class="flex justify-between items-center">
                  <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Order Details</h2>
                  <button @click="showOrderDetailsModal = false" class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
                    <h3 class="font-medium text-light-text-primary dark:text-dark-text-primary mb-2">Order Information</h3>
                    <p><span class="text-gray-500">Order ID:</span> {{ selectedOrder?.orderNumber || `#${selectedOrder?.id.substring(0, 6)}` }}</p>
                    <p><span class="text-gray-500">Date:</span> {{ formatDate(selectedOrder?.orderDate) }}</p>
                    <p>
                      <span class="text-gray-500">Status:</span>
                      <span
                        :class="{
                          'bg-yellow-100 text-yellow-800': selectedOrder?.status === 'processing',
                          'bg-blue-100 text-blue-800': selectedOrder?.status === 'shipped',
                          'bg-green-100 text-green-800': selectedOrder?.status === 'delivered',
                          'bg-red-100 text-red-800': selectedOrder?.status === 'cancelled'
                        }"
                        class="px-3 py-1 rounded-full text-sm font-medium ml-1"
                      >
                        {{ capitalizeFirstLetter(selectedOrder?.status) }}
                      </span>
                    </p>
                    <p><span class="text-gray-500">Total:</span> {{ formatCurrency(selectedOrder?.total) }}</p>
                  </div>
                  <div class="bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
                    <h3 class="font-medium text-light-text-primary dark:text-dark-text-primary mb-2">Customer Information</h3>
                    <p><span class="text-gray-500">Name:</span> {{ selectedOrder?.customerName }}</p>
                    <p><span class="text-gray-500">Email:</span> {{ selectedOrder?.email || 'N/A' }}</p>
                    <p><span class="text-gray-500">Phone:</span> {{ selectedOrder?.phone || 'N/A' }}</p>
                    <p v-if="selectedOrder?.shippingAddress"><span class="text-gray-500">Address:</span> {{ selectedOrder?.shippingAddress }}</p>
                    <p v-if="selectedOrder?.userId"><span class="text-gray-500">Customer ID:</span> {{ selectedOrder?.userId }}</p>
                  </div>
                </div>

                <div v-if="selectedOrder?.shippingAddress" class="mb-6 bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
                  <h3 class="font-medium text-light-text-primary dark:text-dark-text-primary mb-2">Shipping Address</h3>
                  <p>{{ selectedOrder.shippingAddress.street }}, {{ selectedOrder.shippingAddress.city }}</p>
                  <p>{{ selectedOrder.shippingAddress.state }}, {{ selectedOrder.shippingAddress.zip }}</p>
                  <p>{{ selectedOrder.shippingAddress.country }}</p>
                </div>

                <div class="mb-6">
                  <h3 class="font-medium text-light-text-primary dark:text-dark-text-primary mb-2">Order Items</h3>
                  <div class="border border-light-neutral-300 dark:border-dark-neutral-700 rounded-lg overflow-hidden">
                    <table class="w-full text-sm">
                      <thead class="bg-light-neutral-100 dark:bg-dark-neutral-800">
                        <tr>
                          <th class="px-4 py-2 text-left">Product</th>
                          <th class="px-4 py-2 text-left">Price</th>
                          <th class="px-4 py-2 text-left">Quantity</th>
                          <th class="px-4 py-2 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody class="bg-light-secondary dark:bg-dark-secondary">
                        <tr v-for="(item, index) in selectedOrder?.items" :key="index" class="border-t">
                          <td class="px-4 py-3">
                        <div class="flex items-center">
                          <img :src="item.image || 'https://via.placeholder.com/80'" alt="Product" class="w-16 h-16 object-cover rounded-lg shadow-card" />
                          <span class="pl-2">{{ item.name }}</span>
                        </div>
                      </td>
                          <td class="px-4 py-3">{{ item.price?.toFixed(2) }}</td>
                          <td class="px-4 py-3">{{ item.quantity }}</td>
                          <td class="px-4 py-3 text-right">${{ (item.price * item.quantity).toFixed(2) }}</td>
                        </tr>
                      </tbody>
                      <tfoot class="bg-light-neutral-100 dark:bg-dark-neutral-800">
                        <tr>
                          <td colspan="3" class="px-4 py-2 text-right font-medium">Total:</td>
                          <td class="px-4 py-2 text-right font-bold">${{ selectedOrder?.total?.toFixed(2) }}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    @click="openUpdateStatus(selectedOrder)"
                    class="bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-light-text-inverted px-4 py-2 rounded-btn shadow-btn hover:shadow-btn-hover transition-btn duration-200 mr-2"
                  >
                    Update Status
                  </button>
                  <button 
                    @click="showOrderDetailsModal = false"
                    class="bg-light-neutral-200 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary px-4 py-2 rounded-btn hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>


      <!-- Update Status Modal -->
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showStatusModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div class="bg-light-primary dark:bg-dark-primary rounded-xl shadow-xl p-6 w-full max-w-md transform">
              <h2 class="text-xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">Update Order Status</h2>
              <div class="mb-4">
                <p class="text-light-text-secondary dark:text-dark-text-secondary mb-2">
                  Order: {{ selectedOrder?.orderNumber || `#${selectedOrder?.id.substring(0, 6)}` }}
                </p>
                <label class="block text-light-text-primary dark:text-dark-text-primary mb-2">Status:</label>
                <select
                  v-model="newStatus"
                  class="w-full border border-light-neutral-300 dark:border-dark-neutral-700 rounded-lg px-3 py-2 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div class="flex justify-end gap-2">
                <button 
                  @click="showStatusModal = false"
                  class="bg-light-neutral-200 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary px-4 py-2 rounded-btn hover:bg-light-neutral-300 dark:hover:bg-dark-neutral-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  @click="updateOrderStatus"
                  class="bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-light-text-inverted px-4 py-2 rounded-btn shadow-btn hover:shadow-btn-hover transition-btn duration-200"
                  :disabled="statusUpdateLoading"
                >
                  <span v-if="statusUpdateLoading" class="inline-block animate-spin mr-2">⌛</span>
                  Update
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Breadcrumbs from '../components/ui/Breadcrumbs.vue';
import { firebaseService } from '../services/firebaseService';
import { formatCurrency } from '@/utils/currency';
import { useNotificationStore } from '@/stores/notification';

// State
const orders = ref([]);
const loading = ref(true);
const statusFilter = ref('all');
const searchTerm = ref('');
const showOrderDetailsModal = ref(false);
const showStatusModal = ref(false);
const selectedOrder = ref(null);
const newStatus = ref('');
const statusUpdateLoading = ref(false);

// Sort Stats
const sortField = ref('orderNumber');
const sortDirection = ref('asc');

const recentOrdersCount = ref(0);
const processingOrdersCount = computed(() => orders.value.filter(order => order.status === 'processing').length);

const totalRevenue = computed(() => {
  return orders.value.reduce((sum, order) => sum + (order.total || 0), 0);
});
const averageOrderValue = computed(() => {
  if (orders.value.length) return totalRevenue.value / orders.value.length;
  return 0;
});
const revenueIncrease = ref(15); // Example value

// Computed
const filteredOrders = computed(() => {
  let result = [...orders.value];

  // Filter by status
  if (statusFilter.value !== 'all') {
    result = result.filter(order => order.status === statusFilter.value);
  }

  // Filter by search term
  if (searchTerm.value.trim()) {
    const term = searchTerm.value.toLowerCase();
    result = result.filter(order => {
      const orderId = order.orderNumber?.toLowerCase() || order.id.toLowerCase();
      const firstName = order.firstName?.toLowerCase() || '';
      const lastName = order.lastName?.toLowerCase() || '';
      const email = order.email?.toLowerCase() || '';
      return orderId.includes(term) || 
             firstName.includes(term) || 
             lastName.includes(term) || 
             email.includes(term) ||
             `${firstName} ${lastName}`.includes(term);
    });
  }

  // Sorting Algorithm
  result.sort((a, b) => {
    let valA = a[sortField.value];
    let valB = b[sortField.value];

    // Special handling for orderDate sorting
    if (sortField.value === 'orderDate') {
      valA = valA?.seconds || 0;
      valB = valB?.seconds || 0;
    }

    // Compare the two values in correct order
    const comparison = valA > valB ? 1 : valA < valB ? -1 : 0;

    // Return the results in sorted order
    return sortDirection.value === 'asc' ? comparison : -comparison;
  });
  return result;
});

// Methods
const loadOrders = async () => {
  loading.value = true;
  try {
    const allOrders = await firebaseService.getAllOrders();
    orders.value = allOrders.map(order => {
      // Construct customer name from firstName and lastName or from order data
      const firstName = order.firstName || order.shippingInfo?.firstName || '';
      const lastName = order.lastName || order.shippingInfo?.lastName || '';
      const customerName = `${firstName} ${lastName}`.trim() || order.customerName || 'N/A';
      
      // Get email from order data or shipping info
      const email = order.email || order.shippingInfo?.email || 'N/A';

      return {
        ...order,
        customerName,
        email
      };
    });
  } catch (error) {
    console.error("Error loading orders:", error);
  } finally {
    loading.value = false;
  }
};

const viewOrderDetails = async (order) => {
  try {
    // If there's a userId, get the user profile
    if (order.userId) {
      const userProfile = await firebaseService.getUserProfile(order.userId);
      const firstName = order.firstName || order.shippingInfo?.firstName || userProfile?.firstName || '';
      const lastName = order.lastName || order.shippingInfo?.lastName || userProfile?.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const email = order.email || order.shippingInfo?.email || userProfile?.email || 'N/A';

      selectedOrder.value = {
        ...order,
        customerDetails: userProfile,
        customerName: fullName || 'N/A',
        email
      };
    } else {
      // For guest orders, combine firstName and lastName from order data or shipping info
      const firstName = order.firstName || order.shippingInfo?.firstName || '';
      const lastName = order.lastName || order.shippingInfo?.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const email = order.email || order.shippingInfo?.email || 'N/A';

      selectedOrder.value = {
        ...order,
        customerName: fullName || 'Guest User',
        email
      };
    }
    showOrderDetailsModal.value = true;
  } catch (error) {
    console.error("Error loading customer details:", error);
    // Fallback to order data
    const firstName = order.firstName || order.shippingInfo?.firstName || '';
    const lastName = order.lastName || order.shippingInfo?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const email = order.email || order.shippingInfo?.email || 'N/A';

    selectedOrder.value = {
      ...order,
      customerName: fullName || 'N/A',
      email
    };
    showOrderDetailsModal.value = true;
  }
};

const openUpdateStatus = (order) => {
  selectedOrder.value = order;
  newStatus.value = order.status || 'processing';
  showStatusModal.value = true;
};

const updateOrderStatus = async () => {
  if (!selectedOrder.value || !newStatus.value) return;
  statusUpdateLoading.value = true;
  try {
    await firebaseService.updateOrderStatus(selectedOrder.value.id, newStatus.value);
    
    // Update the order in the local state
    const index = orders.value.findIndex(o => o.id === selectedOrder.value.id);
    if (index !== -1) {
      orders.value[index].status = newStatus.value;
    }
    
    // Update selected order if the details modal is open
    if (selectedOrder.value) {
      selectedOrder.value.status = newStatus.value;
    }

    // Create notifications
    // Notification for admin
    await notificationStore.addPersistedNotification({
      title: 'Order Status Updated',
      message: `Order #${selectedOrder.value.orderNumber || selectedOrder.value.id.substring(0, 6)} status changed to ${newStatus.value}`,
      type: 'success',
      isAdmin: true
    });

    // If there's a customer ID, create a notification for them too
    if (selectedOrder.value.userId) {
      let notificationType;
      let notificationMessage;

      switch (newStatus.value) {
        case 'shipped':
          notificationType = 'info';
          notificationMessage = `Great news! Your order #${selectedOrder.value.orderNumber} has been shipped and is on its way.`;
          break;
        case 'delivered':
          notificationType = 'success';
          notificationMessage = `Your order #${selectedOrder.value.orderNumber} has been delivered. Thank you for shopping with us!`;
          break;
        case 'cancelled':
          notificationType = 'error';
          notificationMessage = `Your order #${selectedOrder.value.orderNumber} has been cancelled. Please contact support if you have any questions.`;
          break;
        default:
          notificationType = 'info';
          notificationMessage = `Your order #${selectedOrder.value.orderNumber} status has been updated to ${newStatus.value}.`;
      }

      await notificationStore.addPersistedNotification({
        title: 'Order Status Update',
        message: notificationMessage,
        type: notificationType,
        userId: selectedOrder.value.userId
      });

      // Add immediate notification for status update
      notificationStore.addNotification({
        title: 'Success',
        message: `Order status updated to ${newStatus.value}`,
        type: 'success'
      });
    }

    showStatusModal.value = false;
  } catch (error) {
    console.error("Error updating order status:", error);
    notificationStore.addNotification({
      title: 'Error',
      message: `Failed to update order status: ${error.message}`,
      type: 'error',
      timeout: 5000
    });
  } finally {
    statusUpdateLoading.value = false;
  }
};

const formatDate = (dateValue) => {
  if (!dateValue) return 'N/A';

  const date = dateValue.toDate ? dateValue.toDate() : new Date(dateValue);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Lifecycle
onMounted(() => {
  loadOrders();
});
</script>

<style scoped>
.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
