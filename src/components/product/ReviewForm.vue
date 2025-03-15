<script setup>
import { ref } from 'vue'
import StarRating from './StarRating.vue'

const props = defineProps({
  productId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['review-submitted'])

const author = ref('')
const rating = ref(5)
const content = ref('')
const submitting = ref(false)
const error = ref('')
const success = ref('')

const submitReview = async () => {
  if (!author.value || !content.value) {
    error.value = 'Please fill all fields'
    return
  }
  
  submitting.value = true
  error.value = ''
  
  try {
    // Here you would typically call a service to save the review
    // For example: await firebaseService.addProductReview(props.productId, {...})
    
    const review = {
      productId: props.productId,
      author: author.value,
      rating: rating.value,
      content: content.value,
      date: new Date().toISOString()
    }
    
    // Emit event with review data
    emit('review-submitted', review)
    
    // Reset form
    author.value = ''
    rating.value = 5
    content.value = ''
    
    // Show success message
    success.value = 'Review submitted successfully!'
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      success.value = ''
    }, 3000)
    
  } catch (err) {
    error.value = 'Error submitting review. Please try again.'
    console.error('Review submission error:', err)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="bg-gray-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold mb-4">Write a Review</h3>
    
    <div v-if="error" class="bg-red-100 p-3 rounded mb-4 text-sm text-red-700">
      {{ error }}
    </div>
    
    <div v-if="success" class="bg-green-100 p-3 rounded mb-4 text-sm text-green-700">
      {{ success }}
    </div>
    
    <form @submit.prevent="submitReview">
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium">Your Rating</label>
        <StarRating v-model:rating="rating" :interactive="true" />
      </div>
      
      <div class="mb-4">
        <label for="author" class="block mb-2 text-sm font-medium">Your Name</label>
        <input
          id="author"
          v-model="author"
          type="text"
          class="form-input"
          placeholder="Enter your name"
          required
        />
      </div>
      
      <div class="mb-4">
        <label for="content" class="block mb-2 text-sm font-medium">Your Review</label>
        <textarea
          id="content"
          v-model="content"
          rows="4"
          class="form-input"
          placeholder="Share your thoughts about this product"
          required
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="submitting"
      >
        {{ submitting ? 'Submitting...' : 'Submit Review' }}
      </button>
    </form>
  </div>
</template>
