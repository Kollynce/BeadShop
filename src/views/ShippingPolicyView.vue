<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary text-center">Shipping Policy</h1>
      
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div class="bg-light-primary dark:bg-dark-primary rounded-lg p-6 shadow-sm border border-light-neutral-200 dark:border-dark-neutral-600">
          <div class="flex items-center mb-4">
            <span class="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <h2 class="text-2xl font-semibold ml-4 text-light-text-primary dark:text-dark-text-primary">Processing Time</h2>
          </div>
          <p class="text-light-text-secondary dark:text-dark-neutral-700">Orders are typically processed within 1-2 business days after payment confirmation.</p>
        </div>

        <div class="bg-light-primary dark:bg-dark-primary rounded-lg p-6 shadow-sm border border-light-neutral-200 dark:border-dark-neutral-600">
          <div class="flex items-center mb-4">
            <span class="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <h2 class="text-2xl font-semibold ml-4 text-light-text-primary dark:text-dark-text-primary">Tracking Orders</h2>
          </div>
          <p class="text-light-text-secondary dark:text-dark-neutral-700">Once your order ships, you will receive a confirmation email with tracking information.</p>
        </div>
      </div>

      <div class="bg-light-primary dark:bg-dark-primary rounded-lg p-8 shadow-sm border border-light-neutral-200 dark:border-dark-neutral-600 mb-12">
        <div class="flex items-center mb-6">
          <span class="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </span>
          <h2 class="text-2xl font-semibold ml-4 text-light-text-primary dark:text-dark-text-primary">Shipping Methods</h2>
        </div>
        
        <div class="space-y-4">
          <div v-for="(method, index) in shippingMethods" :key="index" 
               class="flex items-start p-4 rounded-lg transition-colors duration-200"
               :class="selectedMethod === index ? 'bg-orange-50 dark:bg-orange-900/20' : 'hover:bg-light-secondary dark:hover:bg-dark-secondary'">
            <input type="radio" :id="'shipping-' + index" :value="index" v-model="selectedMethod" class="mt-1.5">
            <label :for="'shipping-' + index" class="ml-3 flex-1 cursor-pointer">
              <span class="block font-medium text-light-text-primary dark:text-dark-text-primary">{{ method.name }}</span>
              <span class="block text-sm text-light-text-secondary dark:text-dark-neutral-700 mt-1">{{ method.description }}</span>
            </label>
            <span class="text-orange-500 font-semibold">{{ method.time }}</span>
          </div>
        </div>
      </div>

      <div class="bg-light-primary dark:bg-dark-primary rounded-lg p-8 shadow-sm border border-light-neutral-200 dark:border-dark-neutral-600">
        <div class="flex items-center mb-6">
          <span class="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <h2 class="text-2xl font-semibold ml-4 text-light-text-primary dark:text-dark-text-primary">Shipping Costs</h2>
        </div>
        
        <p class="text-light-text-secondary dark:text-dark-neutral-700 mb-4">Shipping costs are calculated based on:</p>
        <ul class="list-disc pl-6 space-y-2 text-light-text-secondary dark:text-dark-neutral-700">
          <li>Delivery location</li>
          <li>Package weight</li>
          <li>Shipping method selected</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedMethod = ref(0);

const shippingMethods = [
  {
    name: 'Standard Shipping',
    description: 'Best value for non-urgent deliveries',
    time: '5-7 business days'
  },
  {
    name: 'Express Shipping',
    description: 'Fast delivery for time-sensitive orders',
    time: '2-3 business days'
  },
  {
    name: 'International Shipping',
    description: 'Worldwide delivery with tracking',
    time: '10-14 business days'
  }
];
</script>