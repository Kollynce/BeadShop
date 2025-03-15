<template>
  <div class="admin-users min-h-screen bg-light-primary dark:bg-dark-primary transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <!-- Enhanced Header section -->
      <div class="flex justify-between items-center mb-12 bg-light-secondary dark:bg-dark-secondary p-6 rounded-xl shadow-lg">
        <div>
          <Breadcrumbs :items="breadcrumbItems" />
          <h1 class="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2">User Management</h1>
          <p class="text-light-text-secondary dark:text-dark-text-secondary mt-1">View and manage system users</p>
        </div>
        <button 
          @click="resetFilters" 
          class="bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-white py-2 px-4 rounded-btn flex items-center shadow-btn hover:shadow-btn-hover transition-btn duration-200"
        >
          <ArrowPathIcon class="h-5 w-5 mr-2" />
          Reset Filters
        </button>
      </div>

      <!-- Enhanced metric cards with gradients -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Users card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-primary/10 dark:from-dark-secondary dark:to-accent-primary/20 rounded-xl shadow-lg p-6 border-2 border-accent-primary/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Total Users</h3>
          <p class="text-3xl font-bold text-accent-primary">{{ users.length }}</p>
          <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">Last 30 days: +{{ recentUsersCount }}</p>
        </div>

        <!-- Admin Users card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-orange-500/10 dark:from-dark-secondary dark:to-orange-500/20 rounded-xl shadow-lg p-6 border-2 border-orange-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Admins</h3>
          <p class="text-3xl font-bold text-orange-500">{{ adminCount }}</p>
          <div class="flex items-center mt-2">
            <div class="h-2 flex-grow rounded-full bg-light-neutral-200 dark:bg-dark-neutral-700">
              <div class="h-2 rounded-full bg-orange-500 transition-all duration-300" :style="`width: ${(adminCount / users.length) * 100}%`"></div>
            </div>
          </div>
        </div>

        <!-- Active Users card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-blue-500/10 dark:from-dark-secondary dark:to-blue-500/20 rounded-xl shadow-lg p-6 border-2 border-blue-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Active Users</h3>
          <p class="text-3xl font-bold text-blue-500">{{ activeUsersCount }}</p>
          <p class="text-xs text-accent-tertiary mt-1">
            <span class="inline-block transform rotate-45">↗</span> {{ activeUsersPercentage }}% from last month
          </p>
        </div>

        <!-- Average Session card -->
        <div class="flex flex-col h-full bg-gradient-to-br from-light-secondary to-cyan-500/10 dark:from-dark-secondary dark:to-cyan-500/20 rounded-xl shadow-lg p-6 border-2 border-cyan-500/20">
          <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Avg. Session</h3>
          <p class="text-3xl font-bold text-cyan-500">{{ avgSessionTime }}</p>
          <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">Minutes per user</p>
        </div>
      </div>

      <!-- Enhanced Bulk Actions Bar -->
      <div class="mb-4 flex items-center space-x-2" v-if="selectedUsers.length > 0">
        <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {{ selectedUsers.length }} selected
        </span>
        <button 
          @click="bulkDelete" 
          class="text-red-500 hover:text-red-600 text-sm font-medium"
        >
          Delete Selected
        </button>
        <button 
          @click="bulkChangeRole" 
          class="text-accent-quaternary hover:text-accent-quaternary/80 text-sm font-medium"
        >
          Change Role
        </button>
      </div>

      <!-- Enhanced Table Section -->
      <div class="bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden border border-light-neutral-300 dark:border-dark-neutral-700">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-light-neutral-300 dark:divide-dark-neutral-700">
            <thead class="bg-light-neutral-100 dark:bg-dark-neutral-800">
              <tr>
                <th scope="col" class="px-6 py-3">
                  <input 
                    type="checkbox" 
                    @change="toggleAllUsers" 
                    :checked="allUsersSelected"
                    class="rounded border-light-neutral-300 dark:border-dark-neutral-600 text-accent-primary focus:ring-accent-primary"
                  />
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider cursor-pointer"
                  @click="sortUsers('name')"
                >
                  <div class="flex items-center">
                    <span>Name</span>
                    <SortIndicator :active="sortField === 'name'" :direction="sortDirection" />
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider cursor-pointer"
                  @click="sortUsers('email')"
                >
                  <div class="flex items-center">
                    <span>Email</span>
                    <SortIndicator :active="sortField === 'email'" :direction="sortDirection" />
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider cursor-pointer"
                  @click="sortUsers('createdAt')"
                >
                  <div class="flex items-center">
                    <span>Joined</span>
                    <SortIndicator :active="sortField === 'createdAt'" :direction="sortDirection" />
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-light-secondary dark:bg-dark-secondary divide-y divide-light-neutral-300 dark:divide-dark-neutral-700">
              <tr v-if="loading" class="animate-pulse">
                <td colspan="5" class="px-6 py-12 text-center text-light-text-secondary dark:text-dark-text-secondary">
                  Loading users...
                </td>
              </tr>
              <tr v-else-if="filteredUsers.length === 0">
                <td colspan="5" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center">
                    <FaceFrownIcon class="h-12 w-12 text-light-neutral-400 dark:text-dark-neutral-600 mb-2" />
                    <h3 class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">No users found</h3>
                    <p class="text-light-text-secondary dark:text-dark-text-secondary mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
              <tr 
                v-for="user in filteredUsers" 
                :key="user.id"
                :class="[ 'hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 transition-colors', selectedUsers.includes(user.id) ? 'bg-accent-primary/5' : '' ]"
              >
                <td class="px-6 py-4">
                  <input 
                    type="checkbox" 
                    :checked="selectedUsers.includes(user.id)"
                    @change="toggleUserSelection(user.id)"
                    class="rounded border-light-neutral-300 dark:border-dark-neutral-600 text-accent-primary focus:ring-accent-primary"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-accent-primary/10 dark:bg-accent-primary/20 flex items-center justify-center text-accent-primary">
                      {{ getInitials(user) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                        {{ user.firstName }} {{ user.lastName }}
                        <span v-if="isCurrentUser(user)" class="ml-1 text-xs text-accent-quaternary dark:text-accent-quaternary font-normal">(You)</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ user.email || 'No email' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ formatDate(user.createdAt) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="user.isAdmin ? 'bg-accent-primary/10 text-accent-primary' : 'bg-light-neutral-100 dark:bg-dark-neutral-700 text-light-text-secondary dark:text-dark-text-secondary'"
                    class="px-2 py-1 text-xs rounded-full"
                  >
                    {{ user.isAdmin ? 'Admin' : 'Customer' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      @click="viewUserActivity(user)" 
                      class="text-accent-quaternary hover:text-accent-quaternary/80 transition-colors"
                      title="View Activity"
                    >
                      <ChartBarIcon class="h-5 w-5" />
                    </button>
                    <button 
                      @click="viewUserDetails(user)" 
                      class="text-accent-quaternary hover:text-accent-quaternary/80 transition-colors"
                      title="Edit User"
                    >
                      <PencilIcon class="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Enhanced Modals -->
      <div 
        v-if="toast.show"
        class="fixed bottom-4 right-4 bg-accent-tertiary/10 border border-accent-tertiary/20 text-accent-tertiary dark:text-accent-tertiary px-4 py-2 rounded-lg shadow-lg flex items-center"
      >
        <CheckCircleIcon class="h-5 w-5 mr-2" />
        <span>{{ toast.message }}</span>
      </div>
    </div>

    <!-- User Edit Modal -->
    <TransitionRoot appear :show="showUserModal" as="template">
      <Dialog as="div" @close="closeUserModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-light-secondary dark:bg-dark-secondary p-6 text-left align-middle shadow-xl transition-all border border-light-neutral-300 dark:border-dark-neutral-700">
                <div class="flex justify-between items-center mb-4">
                  <DialogTitle as="h3" class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                    Edit User
                  </DialogTitle>
                  <button 
                    @click="closeUserModal" 
                    class="text-light-neutral-500 dark:text-dark-neutral-500 hover:text-light-text-primary dark:hover:text-dark-text-primary focus:outline-none"
                    aria-label="Close"
                  >
                    <XMarkIcon class="h-6 w-6" />
                  </button>
                </div>
                
                <div v-if="updateSuccess" class="mb-4 bg-accent-tertiary/10 border-accent-tertiary/20 text-accent-tertiary dark:text-accent-tertiary border px-4 py-2 rounded flex items-center">
                  <CheckCircleIcon class="h-5 w-5 mr-2" />
                  <span>User updated successfully!</span>
                </div>
                
                <div class="mt-4 space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="firstName" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        v-model="editedUser.firstName"
                        class="mt-1 block w-full rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary px-3 py-2 focus:border-accent-primary focus:ring-accent-primary focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="lastName" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        v-model="editedUser.lastName"
                        class="mt-1 block w-full rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary px-3 py-2 focus:border-accent-primary focus:ring-accent-primary focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      v-model="editedUser.email"
                      disabled
                      class="mt-1 block w-full rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-neutral-100 dark:bg-dark-neutral-800 text-light-neutral-500 dark:text-dark-neutral-500 px-3 py-2 cursor-not-allowed sm:text-sm"
                    />
                  </div>

                  <div class="flex items-center">
                    <Switch
                      v-model="editedUser.isAdmin"
                      :class="[editedUser.isAdmin ? 'bg-accent-primary' : 'bg-light-neutral-300 dark:bg-dark-neutral-600',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2']"
                    >
                      <span class="sr-only">Admin status</span>
                      <span
                        aria-hidden="true"
                        :class="[editedUser.isAdmin ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
                      />
                    </Switch>
                    <span class="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary">
                      Admin privileges
                    </span>
                  </div>

                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-primary dark:bg-dark-primary px-4 py-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                    @click="closeUserModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary focus-visible:ring-offset-2"
                    @click="saveUserChanges"
                    :disabled="updating"
                  >
                    <span v-if="updating" class="inline-block animate-spin mr-2">⟳</span>
                    {{ updating ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, nextTick, h, defineComponent } from 'vue';
import Breadcrumbs from '../components/ui/Breadcrumbs.vue';
import { firebaseService } from '../services/firebaseService';
import { getAuth } from 'firebase/auth';
import {
  Dialog, 
  DialogPanel, 
  DialogTitle, 
  TransitionChild,
  TransitionRoot,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Switch
} from '@headlessui/vue';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
  ArrowPathIcon,
  FaceFrownIcon,
  CheckCircleIcon,
  ChartBarIcon,
  PencilIcon
} from '@heroicons/vue/24/outline';

// Remove PencilIcon from here since it's already imported above

const users = ref([]);

// Add these to the script section
const selectedUsers = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showUserModal = ref(false);
const selectedUserId = ref(null);
const editedUser = ref({});
const updating = ref(false);
const currentUser = ref(null);
const updateSuccess = ref(false);
const toast = reactive({
  show: false,
  message: '',
  timeout: null
});
const recentUsersCount = ref(0);
const activeUsersCount = ref(0);
const activeUsersPercentage = ref(12); // Example value
const avgSessionTime = ref('24:15');

const allUsersSelected = computed(() => {
  return selectedUsers.value.length === filteredUsers.value.length;
});

// New state for UI improvements
const sortField = ref('name');
const sortDirection = ref('asc');
const roleFilter = ref('all');

// Add breadcrumb items
const breadcrumbItems = [
  { text: 'Dashboard', path: '/admin' },
  { text: 'User Management' }
];

const toggleAllUsers = (event) => {
  if (event.target.checked) {
    selectedUsers.value = filteredUsers.value.map(user => user.id);
  } else {
    selectedUsers.value = [];
  }
};

const toggleUserSelection = (userId) => {
  const index = selectedUsers.value.indexOf(userId);
  if (index === -1) {
    selectedUsers.value.push(userId);
  } else {
    selectedUsers.value.splice(index, 1);
  }
};

// State for error handling
const error = ref(null);


// Fetch users and current user when component mounts
onMounted(async () => {
  try {
    loading.value = true;
    
    // Get current logged in user using Firebase Auth
    const auth = getAuth();
    currentUser.value = auth.currentUser;
    
    // Get all users from Firebase
    users.value = await firebaseService.getAllUsers();
    
  } catch (err) {
    console.error('Failed to load users:', err);
    error.value = 'Failed to load users. Please try again later.';
  } finally {
    loading.value = false;
  }
});

// Get initials for avatar display
const getInitials = (user) => {
  if (!user) return '?';
  const first = user.firstName ? user.firstName[0] : '';
  const last = user.lastName ? user.lastName[0] : '';
  return (first + last).toUpperCase() || '?';
};

// Check if user is the current logged-in user
const isCurrentUser = (user) => {
  if (!user || !currentUser.value) return false;
  const isCurrentUserMatch = 
    user.id === currentUser.value.uid || 
    user.uid === currentUser.value.uid || 
    user.email === currentUser.value.email;
  
  if (isCurrentUserMatch && !user.email && currentUser.value.email) {
    // If email is missing but we know it, add it to the user object
    user.email = currentUser.value.email;
  }
  
  return isCurrentUserMatch;
};

// Show toast notification
const showToast = (message) => {
  if (toast.timeout) {
    clearTimeout(toast.timeout);
  }
  
  toast.message = message;
  toast.show = true;
  
  toast.timeout = setTimeout(() => {
    toast.show = false;
  }, 3000);
};

// Sort users
const sortUsers = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
};

// Reset filters
const resetFilters = () => {
  searchQuery.value = '';
  roleFilter.value = 'all';
};

// Admin count
const adminCount = computed(() => {
  return users.value.filter(user => user.isAdmin).length;
});

// Sort indicator component for table headers
const SortIndicator = defineComponent({
  props: {
    active: Boolean,
    direction: String
  },
  setup(props) {
    return () => {
      if (!props.active) {
        return h('span', { class: 'ml-1 text-gray-300' }, '↕');
      }
      return h(
        'span',
        { class: 'ml-1 text-gray-700' },
        props.direction === 'asc' ? '↑' : '↓'
      );
    };
  }
});

// Filtered and sorted users
const filteredUsers = computed(() => {
  let result = [...users.value];
  
  // Apply role filter
  if (roleFilter.value !== 'all') {
    const isAdmin = roleFilter.value === 'admin';
    result = result.filter(user => user.isAdmin === isAdmin);
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(user => 
      user.email?.toLowerCase().includes(query) || 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  result.sort((a, b) => {
    let valA, valB;
    
    if (sortField.value === 'name') {
      valA = `${a.firstName} ${a.lastName}`.toLowerCase();
      valB = `${b.firstName} ${b.lastName}`.toLowerCase();
    } else if (sortField.value === 'email') {
      valA = a.email?.toLowerCase() || '';
      valB = b.email?.toLowerCase() || '';
    } else if (sortField.value === 'createdAt') {
      // Convert to timestamp for comparison
      valA = a.createdAt?.seconds || 0;
      valB = b.createdAt?.seconds || 0;
    }
    
    const comparison = valA > valB ? 1 : valA < valB ? -1 : 0;
    return sortDirection.value === 'asc' ? comparison : -comparison;
  });
  
  return result;
});

// Format date for display
const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  try {
    let date;
    
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else {
      return 'N/A';
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

// View and edit user details - Fixed with defensive programming and nextTick
const viewUserDetails = async (user) => {
  try {
    // Validate user object to prevent errors
    if (!user || !user.id) {
      console.error('Invalid user object:', user);
      return;
    }
    
    // Clean user data to ensure it's safe to use
    const safeUser = {
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      isAdmin: Boolean(user.isAdmin),
      createdAt: user.createdAt || null
    };
    
    // First update the ID, then wait for DOM to update
    selectedUserId.value = safeUser.id;
    
    // Use nextTick to ensure DOM is ready before continuing
    await nextTick();
    
    // Now safely update the editedUser and show modal
    editedUser.value = { ...safeUser };
    showUserModal.value = true;
  } catch (error) {
    console.error('Error opening user details:', error);
    alert('Could not open user details. Please try again.');
  }
};

// Close user modal
const closeUserModal = () => {
  showUserModal.value = false;
  editedUser.value = {};
  selectedUserId.value = null;
  updateSuccess.value = false;
};

// Add function to make current user admin
const makeCurrentUserAdmin = () => {
  if (editedUser.value) {
    editedUser.value.isAdmin = true;
  }
};

// Save user changes
const saveUserChanges = async () => {
  if (!selectedUserId.value) return;
  
  try {
    updating.value = true;
    error.value = null;
    
    const userDataToUpdate = {
      firstName: editedUser.value.firstName || '',
      lastName: editedUser.value.lastName || '',
      phone: editedUser.value.phone || '',
      isAdmin: Boolean(editedUser.value.isAdmin),
      email: editedUser.value.email
    };

    await firebaseService.updateUser(selectedUserId.value, userDataToUpdate);
    
    // Update local user list
    const index = users.value.findIndex(user => user.id === selectedUserId.value);
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...userDataToUpdate };
    }

    updateSuccess.value = true;
    showToast(`User ${userDataToUpdate.firstName} ${userDataToUpdate.lastName} updated successfully`);
    
    setTimeout(() => {
      closeUserModal();
    }, 1500);
    
  } catch (err) {
    console.error('Failed to update user:', err);
    error.value = 'Failed to update user. Please try again.';
  } finally {
    updating.value = false;
  }
};

// Role filter options
const roleOptions = [
  { value: 'all', label: 'All Roles' },
  { value: 'admin', label: 'Admins' },
  { value: 'customer', label: 'Customers' }
];

// Computed label for role filter
const roleFilterLabel = computed(() => {
  return roleOptions.find(option => option.value === roleFilter.value)?.label || 'All Roles';
});

// Bulk Delete
const bulkDelete = async () => {
  if (!confirm(`Are you sure you want to delete ${selectedUsers.value.length} users?`)) return;
  
  try {
    await Promise.all(selectedUsers.value.map(id => firebaseService.deleteUser(id)));
    users.value = users.value.filter(user => !selectedUsers.value.includes(user.id));
    selectedUsers.value = [];
    showToast('Users deleted successfully');
  } catch (error) {
    console.error('Failed to delete users:', error);
  }
};

// Bulk Change Role
const bulkChangeRole = async () => {
  const makeAdmin = confirm('Make selected users admins? Click OK for Admin, Cancel for Customer');
  
  try {
    await Promise.all(selectedUsers.value.map(id => 
      firebaseService.updateUser(id, { isAdmin: makeAdmin })
    ));
    
    users.value = users.value.map(user => {
      if (selectedUsers.value.includes(user.id)) {
        return { ...user, isAdmin: makeAdmin };
      }
      return user;
    });
    
    selectedUsers.value = [];
    showToast(`Users' roles updated successfully`);
  } catch (error) {
    console.error('Failed to update users:', error);
  }
};

// Fix the viewUserActivity function that's used in template but not defined
const viewUserActivity = (user) => {
  // Placeholder function - implement as needed
  console.log('View activity for user:', user.id);
  showToast('User activity feature coming soon');
};
</script>

<style scoped>
.admin-users {
  min-height: 100vh;
}

/* Responsive improvements */
@media (max-width: 640px) {
  table {
    display: block;
    overflow-x: auto;
  }
  
  .stats {
    grid-template-columns: 1fr;
  }
}

/* Add smooth hover transitions */
.hover-card {
  @apply transition-all duration-300 hover:scale-102 hover:shadow-lg;
}
</style>
