<script setup>
import { useCartStore } from '@/stores/cart'
import QuantitySelector from '@/components/product/QuantitySelector.vue'
import { Button } from '@headlessui/vue'
import { formatCurrency } from '../../utils/currency'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const updateQuantity = (newQuantity) => {
  cartStore.updateQuantity(props.item.id, newQuantity)
}

const removeItem = () => {
  cartStore.removeFromCart(props.item.id)
}
</script>

<template>
  <div class="flex items-center py-6 border-b border-light-neutral-200 dark:border-dark-neutral-700">
    <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-md">
    
    <div class="ml-4 flex-grow">
      <h3 class="text-base font-medium text-light-text-primary dark:text-dark-text-primary">{{ item.name }}</h3>
      <p class="text-sm text-gray-600">{{ formatCurrency(item.price) }}</p>
    </div>
    
    <div class="flex items-center ml-4">
      <QuantitySelector
        :initial-value="item.quantity"
        @update:quantity="updateQuantity"
      />
      
      <Button 
        @click="removeItem"
        class="ml-4 text-red-500 hover:text-red-700"
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </Button>
    </div>
    
    <div class="text-right ml-4 w-24">
      <p class="font-medium">{{ formatCurrency(item.price * item.quantity) }}</p>
    </div>
  </div>
</template>
