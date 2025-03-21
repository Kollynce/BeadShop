<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary text-center">Returns & Exchanges</h1>

      <!-- Return Policy Overview -->
      <div class="bg-light-primary dark:bg-dark-primary rounded-lg p-8 shadow-sm border border-light-neutral-200 dark:border-dark-neutral-600 mb-12">
        <div class="flex items-center mb-6">
          <span class="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
            </svg>
          </span>
          <h2 class="text-2xl font-semibold ml-4 text-light-text-primary dark:text-dark-text-primary">Return Policy</h2>
        </div>
        
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-light-text-secondary dark:text-dark-neutral-700">
            We accept returns within 30 days of delivery for items in their original condition.
          </p>
          <ul class="mt-4 space-y-2 text-light-text-secondary dark:text-dark-neutral-700">
            <li class="flex items-center">
              <svg class="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Items must be unworn and in original packaging
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Original receipt or proof of purchase required
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Return shipping costs are the responsibility of the customer
            </li>
          </ul>
        </div>
      </div>

      <!-- Exchange Process Steps -->
      <div class="bg-light-primary dark:bg-dark-primary rounded-lg p-8 shadow-sm border border-light-neutral-200 dark:border-dark-neutral-600 mb-12">
        <div class="flex items-center mb-6">
          <span class="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </span>
          <h2 class="text-2xl font-semibold ml-4 text-light-text-primary dark:text-dark-text-primary">Exchange Process</h2>
        </div>

        <div class="relative">
          <div class="absolute left-4 inset-y-0 w-0.5 bg-orange-100 dark:bg-orange-900"></div>
          <div class="space-y-8 relative">
            <div v-for="(step, index) in exchangeSteps" :key="index" class="flex items-start">
              <span class="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-semibold relative z-10">
                {{ index + 1 }}
              </span>
              <div class="ml-6">
                <h3 class="text-lg font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">{{ step.title }}</h3>
                <p class="text-light-text-secondary dark:text-dark-neutral-700">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Non-Returnable Items -->
      <div class="bg-light-primary dark:bg-dark-primary rounded-lg p-8 shadow-sm border border-light-neutral-200 dark:border-dark-neutral-600">
        <div class="flex items-center mb-6">
          <span class="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
          <h2 class="text-2xl font-semibold ml-4 text-light-text-primary dark:text-dark-text-primary">Non-Returnable Items</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div v-for="(item, index) in nonReturnableItems" :key="index" 
               class="p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg">
            <h4 class="font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">{{ item.title }}</h4>
            <p class="text-sm text-light-text-secondary dark:text-dark-neutral-700">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const exchangeSteps = [
  {
    title: 'Contact Customer Service',
    description: 'Reach out to our team through email or phone to initiate the exchange process.'
  },
  {
    title: 'Receive Return Authorization',
    description: 'We\'ll provide you with a return authorization number and shipping instructions.'
  },
  {
    title: 'Ship the Item',
    description: 'Package the item securely and send it back using the provided shipping instructions.'
  },
  {
    title: 'Choose Replacement',
    description: 'Once we receive your return, select your replacement item from our current inventory.'
  }
];

const nonReturnableItems = [
  {
    title: 'Custom or Personalized Items',
    description: 'Jewelry pieces that have been customized or personalized specifically for you.'
  },
  {
    title: 'Sale or Clearance Items',
    description: 'Items purchased at a discounted price during sales or clearance events.'
  },
  {
    title: 'Damaged Items',
    description: 'Items that show signs of wear, damage, or alterations after delivery.'
  }
];
</script>