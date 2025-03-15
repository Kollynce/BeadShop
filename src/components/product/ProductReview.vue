<script setup>
import StarRating from './StarRating.vue'
import { formatCurrency } from '@/utils/currency'

defineProps({
  review: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.rating !== undefined && 
             value.author !== undefined &&
             value.content !== undefined &&
             value.date !== undefined
    }
  }
})
</script>

<template>
  <div class="border-b pb-4 mb-4 last:border-b-0">
    <div class="flex items-center mb-2">
      <StarRating :rating="review.rating" size="sm" />
      <span class="ml-2 text-sm text-gray-600">
        {{ new Date(review.date).toLocaleDateString() }}
      </span>
    </div>
    
    <p class="font-medium">{{ review.author }}</p>
    <p class="text-gray-700">{{ review.content }}</p>
  </div>
</template>
