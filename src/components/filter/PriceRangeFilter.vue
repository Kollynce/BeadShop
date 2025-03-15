<script setup>
import { ref, watch } from 'vue'
import { Button } from '@headlessui/vue'

const props = defineProps({
  minPrice: {
    type: Number,
    default: 0
  },
  maxPrice: {
    type: Number,
    default: 10000
  },
  initialMin: {
    type: Number,
    default: 0
  },
  initialMax: {
    type: Number,
    default: 10000
  }
})

const emit = defineEmits(['update:range'])

const min = ref(props.initialMin)
const max = ref(props.initialMax)

const applyFilter = () => {
  // Make sure min is not greater than max
  if (min.value > max.value) {
    min.value = max.value
  }
  
  emit('update:range', { min: min.value, max: max.value })
}

// Watch for props changes to sync with parent
watch(() => props.initialMin, (newVal) => {
  min.value = newVal
})

watch(() => props.initialMax, (newVal) => {
  max.value = newVal
})
</script>

<template>
  <div>
    <h3 class="font-medium mb-3 text-light-text-primary dark:text-dark-text-primary">Price Range</h3>
    
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div>
        <label class="text-sm text-light-text-secondary dark:text-dark-text-secondary block">Min</label>
        <div class="relative">
          <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">KES</span>
          <input 
            type="number"
            v-model="min"
            :min="minPrice"
            :max="maxPrice"
            class="w-full pl-12 p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          />
        </div>
      </div>
      
      <div>
        <label class="text-sm text-light-text-secondary dark:text-dark-text-secondary block">Max</label>
        <div class="relative">
          <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">KES</span>
          <input 
            type="number"
            v-model="max"
            :min="minPrice"
            :max="maxPrice"
            class="w-full pl-12 p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          />
        </div>
      </div>
    </div>
    
    <button 
      @click="applyFilter" 
      class="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
    >
      Apply Filter
    </button>
  </div>
</template>
