<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const modal = ref(null)

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

const handleClickOutside = (e) => {
  if (modal.value && !modal.value.contains(e.target) && props.show) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
  document.removeEventListener('mousedown', handleClickOutside)
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="emit('close')"></div>
      
      <div ref="modal" class="bg-white rounded-lg shadow-xl w-full max-w-md z-10 overflow-hidden transform transition-all">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-medium">{{ title }}</h3>
          <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-4">
          <slot></slot>
        </div>
        
        <div v-if="$slots.footer" class="p-4 border-t bg-gray-50">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
