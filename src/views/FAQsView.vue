<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary text-center">Frequently Asked Questions</h1>
      
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" 
             class="bg-light-primary dark:bg-dark-primary rounded-lg shadow-sm border border-light-neutral-200 dark:border-dark-neutral-600 overflow-hidden">
          <button 
            @click="toggleFaq(index)"
            class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-200"
            :aria-expanded="expandedFaq === index"
            :aria-controls="'faq-content-' + index">
            <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary pr-4">{{ faq.question }}</h3>
            <span class="text-orange-500 transition-transform duration-200" :class="{ 'rotate-180': expandedFaq === index }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div 
            :id="'faq-content-' + index"
            v-show="expandedFaq === index" 
            class="px-6 pb-4 text-light-text-secondary dark:text-dark-neutral-700"
            :class="{ 'animate-fadeIn': expandedFaq === index }">
            <p class="py-2">{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <!-- Contact section -->
      <div class="mt-12 pt-8 border-t border-light-neutral-200 dark:border-dark-neutral-600 text-center">
        <p class="text-light-text-secondary dark:text-dark-neutral-700 mb-4">
          Can't find what you're looking for?
        </p>
        <RouterLink 
          to="/contact" 
          class="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200">
          Contact Us
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const expandedFaq = ref(null);

const toggleFaq = (index) => {
  expandedFaq.value = expandedFaq.value === index ? null : index;
};

const faqs = [
  {
    question: "How do I know my ring size?",
    answer: "We recommend getting professionally measured at a local jeweler for the most accurate size. You can also use our printable ring sizer guide available on our website. For the best fit, measure your finger at the end of the day when your fingers are at their largest."
  },
  {
    question: "Are your materials hypoallergenic?",
    answer: "Yes, we use high-quality, hypoallergenic materials in our jewelry. All our metals are nickel-free and safe for sensitive skin. We carefully source our materials from trusted suppliers to ensure the highest quality standards."
  },
  {
    question: "How do I care for my jewelry?",
    answer: "Store pieces separately to prevent scratching, clean with mild soap and water, and avoid exposure to chemicals and harsh environments. Remove jewelry before swimming, showering, or applying cosmetics. We recommend storing in a cool, dry place and using a soft cloth for cleaning."
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes, we offer complimentary gift wrapping on all orders. You can add a personalized message during checkout. Our elegant gift packaging includes a premium box, tissue paper, and a handwritten note if requested."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods. All transactions are encrypted and secure. We also offer various financing options for qualifying purchases."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. International shipping times and costs vary by location. Please note that any import duties or taxes are the responsibility of the recipient. Tracking information is provided for all international orders."
  }
];
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>