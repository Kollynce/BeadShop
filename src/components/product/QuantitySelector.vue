<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialValue: {
    type: Number,
    default: 1
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 99
  }
})

const emit = defineEmits(['update:quantity'])

const quantity = ref(props.initialValue)

const increment = () => {
  if (quantity.value < props.max) {
    quantity.value++
    emit('update:quantity', quantity.value)
  }
}

const decrement = () => {
  if (quantity.value > props.min) {
    quantity.value--
    emit('update:quantity', quantity.value)
  }
}

const onChange = (event) => {
  const value = parseInt(event.target.value)
  if (isNaN(value)) {
    quantity.value = props.min
  } else {
    quantity.value = Math.max(props.min, Math.min(props.max, value))
  }
  emit('update:quantity', quantity.value)
}

// React to external changes
watch(() => props.initialValue, (newVal) => {
  quantity.value = newVal
})
</script>

<template>
  <div class="flex items-center">
    <button 
      type="button"
      @click="decrement"
      :disabled="quantity <= min"
      class="px-4 py-2 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50"
    >
      -
    </button>
    
    <input
      type="number"
      :min="min"
      :max="max"
      v-model="quantity"
      @change="onChange"
      class="w-16 text-center border-t border-b border-gray-300 py-2"
    />
    
    <button 
      type="button"
      @click="increment"
      :disabled="quantity >= max"
      class="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300 disabled:opacity-50"
    >
      +
    </button>
  </div>
</template>
