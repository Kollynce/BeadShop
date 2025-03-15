<template>
  <div class="admin-dashboard min-h-screen bg-light-primary dark:bg-dark-primary transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <!-- Header section with enhanced styling -->
      <div class="flex justify-between items-center mb-12 bg-light-secondary dark:bg-dark-secondary p-6 rounded-xl shadow-lg">
        <div>
          <h1 class="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">Shop Manager</h1>
          <p class="text-light-text-secondary dark:text-dark-text-secondary text-lg">
            Welcome back, {{ authStore?.user?.displayName || 'Admin' }}
          </p>
        </div>
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600 transition-colors"
          aria-label="Toggle dark mode"
        >
          <svg v-if="themeStore.theme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-light-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-dark-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>

      <!-- Enhanced metric cards with gradients -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Products card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-primary/10 dark:from-dark-secondary dark:to-accent-primary/20 rounded-xl shadow-lg p-6 border-2 border-accent-primary/20 hover:border-accent-primary transition-all duration-300">
          <div class="flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Products</h2>
            <p class="text-3xl font-bold mb-4 text-accent-primary">
              {{ loading ? 'Loading...' : `${metrics.products.total}` }}
            </p>
            <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
              {{ loading ? '' : `${metrics.products.stockPercentage}% in stock` }}
            </p>
            <div class="mt-auto">
              <router-link 
                to="/admin/products" 
                class="inline-flex items-center text-accent-primary hover:text-orange-500 font-medium transition-colors duration-200"
              >
                Manage Products
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Orders card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-secondary/10 dark:from-dark-secondary dark:to-accent-secondary/20 rounded-xl shadow-lg p-6 border-2 border-accent-secondary/20 hover:border-accent-secondary transition-all duration-300">
          <div class="flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Orders</h2>
            <p class="text-3xl font-bold mb-4 text-accent-secondary">
              {{ loading ? '...' : metrics.orders.total }}
            </p>
            <div class="mb-4 flex-1">
              <div class="flex justify-between mb-2">
                <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Pending Orders</span>
                <span class="text-sm font-medium text-accent-secondary">{{ loading ? '...' : metrics.orders.pending }}</span>
              </div>
              <div class="w-full bg-light-neutral-200 dark:bg-dark-neutral-700 rounded-full h-2">
                <div 
                  class="bg-accent-secondary h-2 rounded-full transition-all duration-300" 
                  :style="loading ? 'width: 0%' : `width: ${orderProgress}%`"
                ></div>
              </div>
            </div>
            <div class="mt-auto">
              <router-link 
                to="/admin/orders" 
                class="inline-flex items-center text-accent-secondary hover:text-accent-secondary/80 font-medium transition-colors duration-200"
              >
                Manage Orders
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Users card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-quaternary/10 dark:from-dark-secondary dark:to-accent-quaternary/20 rounded-xl shadow-lg p-6 border-2 border-accent-quaternary/20 hover:border-accent-quaternary transition-all duration-300">
          <div class="flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Users</h2>
            <p class="text-3xl font-bold mb-4 text-accent-quaternary">
              {{ loading ? 'Loading...' : `${metrics.users.total}` }}
            </p>
            <div class="mb-4 flex-1">
              <div class="flex w-full justify-between mb-2">
                <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Active Users</span>
                <span class="text-sm font-medium text-accent-quaternary">
                  {{ loading ? '...' : `${metrics.users.active}` }}
                </span>
              </div>
              <div class="w-full bg-light-neutral-200 dark:bg-dark-neutral-700 rounded-full h-2">
                <div 
                  class="bg-accent-quaternary h-2 rounded-full transition-all duration-300" 
                  :style="loading ? 'width: 0%' : `width: ${userProgress}%`"
                ></div>
              </div>
            </div>
            <div class="mt-auto">
              <router-link 
                to="/admin/users" 
                class="inline-flex items-center text-accent-quaternary hover:text-accent-quaternary/80 font-medium transition-colors duration-200"
              >
                Manage Users
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Redesigned Quick Actions -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link 
            to="/admin/products/new" 
            class="group flex items-center p-6 bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-accent-primary transition-all duration-300"
          >
            <div class="p-3 bg-gradient-to-br from-accent-primary to-orange-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <span class="block text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Add Product</span>
              <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Create new listing</span>
            </div>
          </router-link>

          <button 
            @click="goToShop"
            class="flex items-center p-6 bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-accent-secondary transition-all duration-300"
          >
            <div class="p-3 bg-accent-secondary rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span class="block text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">View Store</span>
              <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Go to shop</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Enhanced Recent Activity Table -->
      <div class="flex flex-col">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-light-neutral-300 dark:border-dark-neutral-700 md:rounded-xl">
              <div class="flex justify-between items-center p-4 bg-light-secondary dark:bg-dark-secondary">
                <div>
                  <h2 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Recent Activity</h2>
                  <p class="mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Latest actions and updates in your shop
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary">
                    {{ recentActivity.length }} items
                  </span>
                  <button 
                    v-if="recentActivity.length"
                    @click="handleBulkAction"
                    class="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-all duration-300"
                  >
                    Bulk Action
                  </button>
                </div>
              </div>

              <table class="min-w-full divide-y divide-light-neutral-300 dark:divide-dark-neutral-700">
                <thead class="bg-light-secondary dark:bg-dark-secondary">
                  <tr>
                    <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left text-light-text-secondary dark:text-dark-text-secondary">
                      <button class="flex items-center gap-x-2">
                        <span>Type</span>
                        <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                          <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                        </svg>
                      </button>
                    </th>
                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left text-light-text-secondary dark:text-dark-text-secondary">Details</th>
                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left text-light-text-secondary dark:text-dark-text-secondary">Date</th>
                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-light-neutral-300 dark:divide-dark-neutral-700 dark:bg-dark-secondary">
                  <tr v-if="loading" class="animate-pulse">
                    <td colspan="4" class="text-center p-4 text-light-text-secondary dark:text-dark-text-secondary">
                      Loading...
                    </td>
                  </tr>
                  <template v-else-if="recentActivity.length">
                    <tr v-for="(activity, index) in recentActivity" :key="index" class="hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors">
                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div class="flex items-center">
                          <div :class="`inline px-3 py-1 text-sm font-normal rounded-full ${
                            activity.type === 'order' 
                              ? 'text-accent-secondary bg-accent-secondary/10'
                              : 'text-accent-quaternary bg-accent-quaternary/10'
                          }`">
                            {{ activity.type }}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <h4 class="text-light-text-primary dark:text-dark-text-primary">
                            {{ activity.type === 'order' ? `Order #${activity.data.orderNumber}` : activity.data.email }}
                          </h4>
                          <p class="text-light-text-secondary dark:text-dark-text-secondary">
                            {{ activity.type === 'order' ? 'New order placed' : 'User activity' }}
                          </p>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary whitespace-nowrap">
                        {{ new Date(activity.date).toLocaleString() }}
                      </td>
                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <button class="px-1 py-1 text-light-text-secondary dark:text-dark-text-secondary transition-colors duration-200 rounded-lg hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>

              <!-- Pagination -->
              <div class="flex items-center justify-between p-4 border-t border-light-neutral-300 dark:border-dark-neutral-700">
                <button class="flex items-center gap-x-2 px-4 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button class="flex items-center gap-x-2 px-4 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600 transition-colors">
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useThemeStore } from '../stores/theme';
import { useRouter } from 'vue-router';
import { firebaseService } from '../services/firebaseService';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const router = useRouter();

const loading = ref(true);
const error = ref(null);
const metrics = reactive({
  products: { total: 0, stockPercentage: 0 },
  orders: { total: 0, pending: 0 },
  users: { total: 0, active: 0 }
});
const recentActivity = ref([]);

const orderProgress = computed(() => {
  if (!metrics.orders.total) return 0;
  return (metrics.orders.pending / metrics.orders.total * 100) || 0;
});

const userProgress = computed(() => {
  if (!metrics.users.total) return 0;
  return (metrics.users.active / metrics.users.total * 100) || 0;
});

const fetchDashboardStats = async () => {
  try {
    loading.value = true;
    error.value = null;

    const [productsData, ordersData, usersData] = await Promise.all([
      firebaseService.getProducts(),
      firebaseService.getAllOrders(),
      firebaseService.getAllUsers()
    ]);

    const products = Array.isArray(productsData) ? productsData : [];
    const orders = Array.isArray(ordersData) ? ordersData : [];
    const users = Array.isArray(usersData) ? usersData : [];

    metrics.products = {
      total: products.length,
      stockPercentage: calculateStockPercentage(products)
    };
    metrics.orders = {
      total: orders.length,
      pending: orders.filter(order => order.status === 'processing').length
    };
    metrics.users = {
      total: users.length,
      active: users.filter(user => !user.disabled).length
    };

    recentActivity.value = [...orders, ...users]
      .filter(item => item && (item.createdAt || item.orderNumber || item.email))
      .sort((a, b) => {
        // Handle Firebase Timestamp objects safely
        const getDate = (obj) => {
          if (obj?.createdAt?.toDate) return obj.createdAt.toDate();
          if (obj?.createdAt) return new Date(obj.createdAt);
          return new Date();
        };
        return getDate(b) - getDate(a);
      })
      .slice(0, 5)
      .map(item => ({
        type: item.orderNumber ? 'order' : 'user',
        data: {
          ...item,
          orderNumber: item.orderNumber || (item.id ? `ORD-${item.id.slice(0, 6)}` : 'N/A'),
          email: item.email || 'N/A'
        },
        date: item.createdAt?.toDate?.() || new Date(item.createdAt || Date.now())
      }));

  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    error.value = 'Failed to load dashboard data';
    metrics.products = { total: 0, stockPercentage: 0 };
    metrics.orders = { total: 0, pending: 0 };
    metrics.users = { total: 0, active: 0 };
    recentActivity.value = [];
  } finally {
    loading.value = false;
  }
};

const calculateStockPercentage = (products) => {
  if (!products.length) return 0;
  const inStock = products.filter(p => (p.quantity || 0) > 0).length;
  return Math.round((inStock / products.length) * 100);
};

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const goToShop = () => {
  router.push('/');
};

const bulkExport = async () => {
  try {
    const [products, orders, users] = await Promise.all([
      firebaseService.getProducts(),
      firebaseService.getAllOrders(),
      firebaseService.getAllUsers()
    ]);
    
    const exportData = {
      products,
      orders,
      users,
      timestamp: new Date().toISOString()
    };
    
    // Convert to JSON and trigger download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shop_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export failed:', error);
    alert('Failed to export data');
  }
};

const showActivityMonitor = () => {
  console.log('Activity monitor not implemented yet');
  // Future implementation
};

const handleBulkAction = () => {
  console.log('Bulk action not implemented yet');
  // Future implementation
};

onMounted(async () => {
  if (!authStore.user) {
    router.push('/login');
    return;
  }
  await fetchDashboardStats();
});
</script>

<style scoped>
.status-indicator {
  @apply w-3 h-3 rounded-full inline-block mr-2 transition-all duration-300;
}
.status-active { @apply bg-accent-tertiary shadow-lg shadow-accent-tertiary/30; }
.status-pending { @apply bg-accent-primary shadow-lg shadow-accent-primary/30; }
.status-inactive { @apply bg-red-500 shadow-lg shadow-red-500/30; }

/* Add smooth hover transitions */
.hover-card {
  @apply transition-all duration-300 hover:scale-102 hover:shadow-lg;
}
</style>