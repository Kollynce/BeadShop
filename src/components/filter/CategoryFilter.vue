<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const categories = [
  { id: 'beaded-jewelry', name: 'Beaded Jewelry' },
  { id: 'string-jewelry', name: 'String Jewelry' },
  { id: 'metal-jewelry', name: 'Metal Jewelry' },
  { id: 'gemstones', name: 'Gemstones' },
  { id: 'earrings', name: 'Earrings' },
  { id: 'necklaces', name: 'Necklaces' },
  { id: 'bracelets', name: 'Bracelets' },
  { id: 'rings', name: 'Rings' }
].map(category => ({
  ...category,
  id: category.id,
  name: category.name,
  value: category.name // Use the name as the value to match with product categories
}))

defineProps({
  selectedCategory: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:category'])

const selectCategory = (category) => {
  emit('update:category', category)
}
</script>

<template>
  <div>
    <RadioGroupLabel class="font-medium mb-3">Categories</RadioGroupLabel>
    
    <RadioGroup :value="selectedCategory" @change="selectCategory" class="space-y-2">
      <RadioGroupOption v-slot="{ checked }" :value="''">
        <button 
          class="text-left w-full text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
          :class="{ 'font-semibold text-light-text-primary dark:text-dark-text-primary': checked }"
        >
          All Products
        </button>
      </RadioGroupOption>
      
      <RadioGroupOption 
        v-for="category in categories" 
        :key="category.id"
        v-slot="{ checked }"
        :value="category.id"
      >
        <button 
          class="text-left w-full text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
          :class="{ 'font-semibold text-light-text-primary dark:text-dark-text-primary': checked }"
        >
          {{ category.name }}
        </button>
      </RadioGroupOption>
    </RadioGroup>
  </div>
</template>
