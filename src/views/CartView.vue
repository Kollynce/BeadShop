<script setup>
import { useCartStore } from '../stores/cart'
import { computed, ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { XMarkIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import { formatCurrency } from '@/utils/currency'
import { getImageUrl } from '@/utils/imageLoader' // Import the image loader utility

const cartStore = useCartStore()
const isUpdating = ref(false)
const removeDialogOpen = ref(false)
const itemToRemove = ref(null)

const cart = computed(() => cartStore.cart)
const subtotal = computed(() => cartStore.subtotal)
const itemCount = computed(() => cartStore.itemCount)

// Shipping cost calculation (free over KES 10,000)
const shippingCost = computed(() => {
  return subtotal.value >= 10000 ? 0 : 1000
})

// Total cost calculation
const total = computed(() => {
  return subtotal.value + shippingCost.value
})

// Update item quantity with visual feedback
const updateQuantity = async (productId, newQuantity) => {
  isUpdating.value = true
  
  if (newQuantity <= 0) {
    await cartStore.removeFromCart(productId)
  } else {
    await cartStore.updateQuantity(productId, newQuantity)
  }
  
  setTimeout(() => {
    isUpdating.value = false
  }, 300)
}

// Handle item removal with confirmation
const confirmRemove = (product) => {
  itemToRemove.value = product
  removeDialogOpen.value = true
}

// Remove item from cart
const removeItem = () => {
  if (itemToRemove.value) {
    cartStore.removeFromCart(itemToRemove.value.id)
    removeDialogOpen.value = false
    itemToRemove.value = null
  }
}

// Function to process image URLs (same as in ProductDetailView)
const processImageUrl = (url) => {
  if (!url) return getImageUrl('placeholder.jpg');
  if (typeof url === 'string' && url.startsWith('base64://')) return url.replace('base64://', '');
  return url;
};

// Handle image error by replacing with placeholder
const handleImageError = (event) => {
  event.target.src = getImageUrl('placeholder.jpg');
};
</script>

<template>
  <main class="container mx-auto px-4 py-8 max-w-6xl">
    <h1 class="text-3xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary">Shopping Cart</h1>
    
    <div v-if="cart.length === 0" class="text-center py-12 bg-light-secondary dark:bg-dark-secondary rounded-lg shadow-sm border border-light-neutral-300 dark:border-dark-neutral-600">
      <div class="w-40 h-40 mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-full h-full text-light-neutral-400 dark:text-dark-neutral-500">
          <circle cx="9" cy="21" r="1" fill="currentColor"/>
          <circle cx="20" cy="21" r="1" fill="currentColor"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="5" y1="5" x2="22" y2="5" class="text-red-500" stroke-width="1.5"/>
        </svg>
      </div>
      <p class="text-xl mb-6 text-light-text-secondary dark:text-dark-text-secondary">Your cart is empty</p>
      <router-link to="/products" class="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white px-6 py-3 rounded-md inline-block transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none">
        Browse Products
      </router-link>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Cart Items (2/3 width) -->
      <section class="md:col-span-2" aria-labelledby="cart-items-heading">
        <h2 id="cart-items-heading" class="sr-only">Cart Items</h2>
        
        <!-- Mobile-only order summary disclosure -->
        <Disclosure as="div" class="mb-6 md:hidden">
          <DisclosureButton class="flex w-full justify-between rounded-lg bg-light-secondary dark:bg-dark-secondary px-4 py-3 text-left text-sm font-medium text-light-text-primary dark:text-dark-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary">
            <span>Order Summary ({{ itemCount }} items)</span>
            <ChevronUpIcon class="h-5 w-5 ui-open:rotate-180 ui-open:transform transition-transform" />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-5 bg-light-secondary dark:bg-dark-secondary rounded-b-lg">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-light-text-primary dark:text-dark-text-primary">
                <span>Subtotal</span>
                <span>{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text-primary dark:text-dark-text-primary">Shipping</span>
                <span v-if="shippingCost > 0" class="text-light-text-primary dark:text-dark-text-primary">{{ formatCurrency(shippingCost) }}</span>
                <span v-else class="text-accent-tertiary">Free</span>
              </div>
              
              <div v-if="shippingCost > 0" class="text-sm bg-accent-quaternary/10 text-accent-quaternary p-3 rounded-md mt-3">
                <p>Free shipping on orders over KES 10,000</p>
                <p class="mt-1">Add {{ formatCurrency(10000 - subtotal) }} more to qualify</p>
              </div>
              
              <div class="border-t border-light-neutral-300 dark:border-dark-neutral-600 pt-2 mt-2">
                <div class="flex justify-between font-bold text-light-text-primary dark:text-dark-text-primary">
                  <span>Total</span>
                  <span>{{ formatCurrency(total) }}</span>
                </div>
              </div>
            </div>
            
            <div class="mt-4 space-y-3">
              <router-link 
                to="/checkout" 
                class="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white w-full py-2 block text-center rounded-md transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="cart.length === 0"
                :aria-disabled="cart.length === 0"
              >
                Proceed to Checkout
              </router-link>
              
              <router-link 
                to="/products" 
                class="text-accent-quaternary hover:text-accent-quaternary/80 transition-colors text-center block focus:outline-none focus:underline text-sm"
              >
                Continue Shopping
              </router-link>
            </div>
          </DisclosurePanel>
        </Disclosure>
        
        <transition-group name="cart-item" tag="ul" class="divide-y divide-light-neutral-300 dark:divide-dark-neutral-600">
          <li v-for="item in cart" 
              :key="item.id" 
              class="flex py-6 first:pt-0 items-center cart-item-transition"
              :class="{'opacity-50': isUpdating}">
            <div class="relative">
              <img :src="processImageUrl(item.image)" 
                   :alt="item.name" 
                   class="w-24 h-24 object-cover rounded-md shadow-sm" 
                   loading="lazy"
                   @error="handleImageError">
            </div>
            
            <div class="ml-6 flex-grow">
              <router-link :to="`/product/${item.id}`" 
                          class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary hover:text-orange-500 dark:hover:text-orange-400 focus:outline-none focus:underline"
                          :aria-label="`View ${item.name} details`">
                {{ item.name }}
              </router-link>
              <p class="text-light-text-secondary dark:text-dark-text-secondary mt-1">{{ formatCurrency(item.price) }} each</p>
              
              <div class="flex items-center mt-3">
                <div class="flex items-center border border-light-neutral-300 dark:border-dark-neutral-600 rounded-md shadow-sm">
                  <button 
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="px-3 py-1 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-inset"
                    aria-label="Decrease quantity"
                  >
                    <span aria-hidden="true">−</span>
                  </button>
                  <span class="px-4 py-1 min-w-[40px] text-center text-light-text-primary dark:text-dark-text-primary" aria-label="Quantity">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="px-3 py-1 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors rounded-r-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-inset"
                    aria-label="Increase quantity"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
                
                <button 
                  @click="confirmRemove(item)"
                  class="ml-4 text-red-500 hover:text-red-700 transition-colors focus:outline-none focus:underline"
                  aria-label="Remove item from cart"
                >
                  Remove
                </button>
              </div>
            </div>
            
            <div class="text-right">
              <p class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ formatCurrency(item.price * item.quantity) }}</p>
            </div>
          </li>
        </transition-group>
      </section>
      
      <!-- Order Summary (1/3 width) -->
      <section class="bg-light-secondary dark:bg-dark-secondary p-6 rounded-lg shadow-sm h-fit md:sticky md:top-24 hidden md:block border border-light-neutral-300 dark:border-dark-neutral-600" aria-labelledby="order-summary-heading">
        <h2 id="order-summary-heading" class="text-xl font-bold mb-6 border-b border-light-neutral-300 dark:border-dark-neutral-600 pb-3 text-light-text-primary dark:text-dark-text-primary">Order Summary</h2>
        
        <div class="space-y-4">
          <div class="flex justify-between text-light-text-primary dark:text-dark-text-primary">
            <span>Subtotal ({{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }})</span>
            <span>{{ formatCurrency(subtotal) }}</span>
          </div>
          
          <div class="flex justify-between text-light-text-primary dark:text-dark-text-primary">
            <span>Shipping</span>
            <span v-if="shippingCost > 0">{{ formatCurrency(shippingCost) }}</span>
            <span v-else class="text-accent-tertiary font-medium">Free</span>
          </div>
          
          <div v-if="shippingCost > 0" class="text-sm bg-accent-quaternary/10 text-accent-quaternary p-3 rounded-md">
            <p>Free shipping on orders over KES 10,000</p>
            <p class="mt-1">Add {{ formatCurrency(10000 - subtotal) }} more to qualify</p>
          </div>
          
          <div class="border-t border-light-neutral-300 dark:border-dark-neutral-600 pt-4 mt-2">
            <div class="flex justify-between font-bold text-lg text-light-text-primary dark:text-dark-text-primary">
              <span>Total</span>
              <span>{{ formatCurrency(total) }}</span>
            </div>
          </div>
        </div>
        
        <div class="mt-8 space-y-4">
          <router-link 
            to="/checkout" 
            class="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white w-full py-3 block text-center rounded-md transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="cart.length === 0"
            :aria-disabled="cart.length === 0"
          >
            Proceed to Checkout
          </router-link>
          
          <router-link 
            to="/products" 
            class="text-accent-quaternary hover:text-accent-quaternary/80 transition-colors text-center block focus:outline-none focus:underline"
          >
            Continue Shopping
          </router-link>
        </div>
      </section>
    </div>
    
    <!-- HeadlessUI Dialog for remove confirmation -->
    <TransitionRoot appear :show="removeDialogOpen" as="template">
      <Dialog as="div" @close="removeDialogOpen = false" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
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
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-light-secondary dark:bg-dark-secondary p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-light-text-primary dark:text-dark-text-primary">
                  Remove Item
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Are you sure you want to remove "{{ itemToRemove?.name }}" from your cart?
                  </p>
                </div>

                <div class="mt-6 flex space-x-3 justify-end">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary px-4 py-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                    @click="removeDialogOpen = false"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="removeItem"
                  >
                    Remove
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </main>
</template>

<style scoped>
.cart-item-transition {
  transition: all 0.3s ease;
}

.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.5s ease;
}

.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.cart-item-move {
  transition: transform 0.5s ease;
}

/* HeadlessUI specific transitions */
:deep(.ui-open) {
  transform: rotate(180deg); 
}
</style>
