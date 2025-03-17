<template>
  <div class="min-h-screen bg-light-primary dark:bg-dark-primary">
    <!-- Animation element for cart add effect -->
    <div 
      v-if="animatingItem" 
      class="cart-animation fixed pointer-events-none z-50" 
      ref="cartAnimationEl"
      :style="{ backgroundImage: `url(${animatingItem?.image || animatingItem?.imageUrl || getImageUrl('placeholder.jpg')})` }">
    </div>
    
    <!-- Scroll to top button -->
    <button 
      v-show="showScrollTop" 
      @click="scrollToTop" 
      class="scroll-to-top-btn fixed bottom-6 right-6 bg-accent-primary hover:bg-accent-secondary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 z-50"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
    
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-light-secondary dark:bg-dark-secondary">
      <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg fade-slide-up">
            <h1 class="text-2xl sm:text-4xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
              Discover Handcrafted Jewelry
              <span class="animated-text-wrapper">
                <span 
                  v-for="(text, index) in animatedTexts" 
                  :key="text"
                  class="animated-text-item"
                  :class="{ active: currentTextIndex === index }">
                  {{ text }}
                </span>
              </span>
            </h1>
            <p class="mt-4 text-xl text-light-text-secondary dark:text-dark-text-secondary">Our handcrafted beaded jewelry pieces combine artistry and elegance, adding the perfect colorful accent to enhance any outfit.</p>
            
            <!-- Shop Collection button moved here for mobile - will show on all devices but lg devices will have it in original position -->
            <div class="mt-6 block lg:hidden">
              <router-link to="/products" class="inline-block rounded-md border border-transparent bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark px-8 py-3 text-center font-medium text-white">Shop Collection</router-link>
            </div>
          </div>
          <div>
            <div class="mt-10">
              <!-- Improved infinite scrolling image grid with mobile responsiveness -->
              <div aria-hidden="true" class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                <div class="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div class="flex items-center justify-center space-x-3 sm:space-x-6 lg:space-x-8 overflow-hidden w-full max-w-screen-sm mx-auto px-4 sm:px-0">
                    <!-- First column scrolling up - visible on all screens -->
                    <div class="scroll-container w-1/2 sm:w-auto max-w-[45vw] sm:max-w-none">
                      <div class="scroll-content scroll-up">
                        <!-- Original set -->
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <!-- Duplicate set for seamless loop -->
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    <!-- Middle column scrolling down - visible on all screens -->
                    <div class="scroll-container w-1/2 sm:w-auto">
                      <div class="scroll-content scroll-down">
                        <!-- Original set -->
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <!-- Duplicate set for seamless loop -->
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    <!-- Last column scrolling up at a different speed - hidden on mobile -->
                    <div class="scroll-container hidden sm:block">
                      <div class="scroll-content scroll-up-slow">
                        <!-- Original set -->
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <!-- Duplicate set for seamless loop -->
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="h-64 w-full overflow-hidden rounded-lg product-image-container">
                          <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" alt="" class="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Original button position - only visible on lg screens -->
              <router-link to="/products" class="hidden lg:inline-block rounded-md border border-transparent bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark px-8 py-3 text-center font-medium text-white">Shop Collection</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Collection Section - Modified to be truly full width -->
    <section class="py-16 bg-light-primary dark:bg-dark-primary w-full">
      <div class="text-center mb-12 fade-slide-up">
        <h2 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Our Collections</h2>
      </div>
      <div class="w-full px-4 sm:px-6 lg:px-8 max-w-none mx-auto">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Collection Card for each category -->
            <div v-for="(collection, index) in collections" 
              :key="collection.name" 
              class="collection-card relative overflow-hidden rounded-lg shadow-lg group h-80 fade-slide-up"
              :style="{ animationDelay: index * 100 + 'ms' }">
              
              <!-- Collection Image -->
              <img :src="processImageUrl(collection.image)" 
                   :alt="collection.name" 
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   @error="handleImageError">
              
              <!-- Overlay with content that appears on hover -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col justify-center items-center p-6">
                
                <!-- Collection name and description - visible on hover -->
                <div class="text-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 class="text-white text-2xl font-bold mb-2">{{ collection.name }}</h3>
                  <p class="text-white text-sm mb-4">{{ collection.description }}</p>
                  <router-link :to="`/products?category=${collection.category}`" 
                    class="inline-block bg-btn-primary hover:bg-btn-primary-hover text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                    View Collection
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="bg-light-secondary dark:bg-dark-secondary py-16">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-10 fade-slide-up">
          <h2 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Featured Products</h2>
          <router-link to="/products" class="text-btn-primary hover:text-accent-secondary font-medium">
            View all products <span aria-hidden="true">&rarr;</span>
          </router-link>
        </div>
        
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
        </div>
        
        <div v-else-if="featuredProducts.length === 0" class="text-center py-12">
          <p class="text-light-neutral-600 dark:text-dark-neutral-600">No products found. Please check back later.</p>
        </div>
        
        <!-- Modified grid classes to ensure 3 products per row at medium to large screens -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="(product, index) in featuredProducts" 
              :key="product.id" 
              class="relative fade-slide-up"
              :style="{ animationDelay: index * 100 + 'ms' }">
            <!-- Debugging info (can be removed in production) -->
            <!-- <div class="absolute top-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 z-10">
              {{ product.image ? product.image.substring(0, 20) + '...' : 'No image' }}
            </div> -->
            
            <ProductCard 
              :product="product" 
              :processImageUrl="processImageUrl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Product Features Section -->
    <section class="bg-light-secondary dark:bg-dark-secondary">
      <div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl">Craftsmanship Details</h2>
          <p class="mt-4 text-light-text-secondary dark:text-dark-text-secondary">Our handcrafted beaded jewelry combines traditional techniques with modern design. Each piece is meticulously created using premium materials, ensuring both beauty and durability for everyday wear.</p>
          <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div v-for="feature in features" :key="feature.name" class="border-t border-light-neutral-300 dark:border-dark-neutral-700 pt-4">
              <dt class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ feature.name }}</dt>
              <dd class="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img :src="getPublicImageUrl('images/Auqa Sand.jpeg')" alt="Close-up of beaded bracelet showing intricate pattern work." class="rounded-lg bg-light-neutral-100 dark:bg-dark-neutral-800" @error="handleImageError" />
          <img :src="getPublicImageUrl('images/Golden black.jpeg')" alt="Detail view of beaded necklace clasp and finishing." class="rounded-lg bg-light-neutral-100 dark:bg-dark-neutral-800" @error="handleImageError" />
          <img :src="getPublicImageUrl('images/Golden Green.jpeg')" alt="Arrangement of colorful beads used in our jewelry collection." class="rounded-lg bg-light-neutral-100 dark:bg-dark-neutral-800" @error="handleImageError" />
          <img :src="getPublicImageUrl('images/Neeon Moon 3.jpeg')" alt="Handcrafting process showing artisan creating a beaded piece." class="rounded-lg bg-light-neutral-100 dark:bg-dark-neutral-800" @error="handleImageError" />
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="relative py-16 overflow-hidden">
      <div class="mx-auto max-w-2xl lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-accent-quaternary to-accent-secondary rounded-xl shadow-xl overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00TTAgMGg0djRIMHoiLz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>
          
          <div class="relative py-10 px-6 md:px-10">
            <!-- Newsletter content - Using a layout that works better for wider section -->
            <div class="flex flex-col md:flex-row gap-8">
              <!-- Left side - Text content -->
              <div class="w-full md:w-1/2 text-white">
                <span class="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold mb-4">
                  Stay Connected
                </span>
                <h3 class="text-2xl md:text-3xl font-bold mb-4">Join Our Jewelry Community</h3>
                <p class="text-white text-opacity-90 mb-6">
                  Subscribe to receive updates on new collections, exclusive offers, and styling tips.
                </p>
                <div class="flex flex-wrap gap-4 mb-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 mr-2">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <p class="text-sm">Early access to sales</p>
                  </div>
                  <div class="flex items-center">
                    <div class="flex-shrink-0 mr-2">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <p class="text-sm">Exclusive offers</p>
                  </div>
                </div>
              </div>
              
              <!-- Right side - Form -->
              <div class="w-full md:w-1/2">
                <div class="bg-white rounded-xl shadow-md p-6">
                  <form @submit.prevent="subscribeToNewsletter" class="space-y-4">
                    <h4 class="text-gray-800 text-xl font-semibold mb-4">Subscribe to our newsletter</h4>
                    <div>
                      <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        v-model="newsletter.name" 
                        placeholder="Enter your name" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      >
                    </div>
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        v-model="newsletter.email" 
                        required
                        placeholder="Enter your email" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      >
                    </div>
                    <div class="pt-2">
                      <button 
                        type="submit" 
                        class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center"
                        :class="{'opacity-75 cursor-not-allowed': newsletter.loading}"
                        :disabled="newsletter.loading"
                      >
                        <svg v-if="newsletter.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{{ newsletter.loading ? 'Subscribing...' : 'Subscribe Now' }}</span>
                      </button>
                    </div>
                    <p v-if="newsletter.message" :class="{'text-green-600': newsletter.success, 'text-red-600': !newsletter.success}" class="text-sm mt-2 text-center">
                      {{ newsletter.message }}
                    </p>
                    <p class="text-xs text-gray-500 text-center mt-4">
                      By subscribing, you agree to our Privacy Policy.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { firebaseService } from '../services/firebaseService'
import { useCartStore } from '@/stores/cart'
import { mockDataLoader } from '../utils/mockDataLoader'
import ProductCard from '@/components/ProductCard.vue'
import { formatCurrency } from '@/utils/currency'
import { getImageUrl, getPublicImageUrl } from '@/utils/imageLoader'

// Update utility function to process image URLs
const processImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/300x300?text=No+Image';
  
  // Handle base64 images with the incorrect prefix
  if (typeof url === 'string' && url.startsWith('base64://')) {
    return url.replace('base64://', '');
  }
  
  // Handle Firebase storage URLs that might need special processing
  if (typeof url === 'string' && url.includes('firebasestorage.googleapis.com')) {
    return url; // Ensure Firebase URLs pass through correctly
  }
  
  // For normal URLs
  return url;
}

// Function to handle image errors
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  event.target.src = getImageUrl('placeholder.jpg');
  
  // If the local fallback fails, use inline SVG
  event.target.onerror = function() {
    const parent = event.target.parentNode;
    if (parent) {
      const svgElement = document.createElement('div');
      svgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 24 24" width="100%" height="100%">
          <rect width="100%" height="100%" fill="#f0f0f0"/>
          <path d="M12 6v12M6 12h12" stroke="#aaa" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      svgElement.className = 'broken-image';
      parent.replaceChild(svgElement, event.target);
    }
  };
}

const newCollection = ref([])
const trending = ref([])
const featuredProducts = ref([])
const loading = ref(true)
const cartStore = useCartStore()
const animatingItem = ref(null)
const cartAnimationEl = ref(null)

// Blog posts data
const blogPosts = ref([
  { id: 1, title: 'Blog Post 1', excerpt: 'Lorem ipsum dolor sit amet...', image: 'https://via.placeholder.com/400x200?text=Blog+1' },
  { id: 2, title: 'Blog Post 2', excerpt: 'Consectetur adipiscing elit...', image: 'https://via.placeholder.com/400x200?text=Blog+2' },
  { id: 3, title: 'Blog Post 3', excerpt: 'Sed do eiusmod tempor...', image: 'https://via.placeholder.com/400x200?text=Blog+3' },
])

// Callouts data
const callouts = [
  {
    name: 'Beaded Bracelets',
    description: 'Handcrafted wrist art',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Collection of colorful beaded bracelets with various designs and patterns.',
    href: '#',
  },
  {
    name: 'Statement Necklaces',
    description: 'Elegant beaded necklaces featuring unique pendant designs and colorful bead work.',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Elegant beaded necklaces featuring unique pendant designs and colorful bead work.',
    href: '#',
  },
  {
    name: 'Beaded Earrings',
    description: 'Collection of handcrafted beaded earrings with intricate patterns.',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of handcrafted beaded earrings with intricate patterns.',
    href: '#',
  },
]

// Features data
const features = [
  { name: 'Materials', description: 'Premium glass beads, natural gemstones, and sterling silver components' },
  { name: 'Craftsmanship', description: 'Each piece handcrafted by skilled artisans using traditional techniques' },
  { name: 'Customization', description: 'Available in various sizes, colors, and custom designs upon request' },
  { name: 'Durability', description: 'Double-knotted silk thread and reinforced clasps for everyday wear' },
  { name: 'Care', description: 'Store in provided pouch, avoid water exposure, and clean with soft dry cloth' },
  { name: 'Sustainability', description: 'Ethically sourced materials and eco-friendly packaging' },
]

// Collections data
const collections = ref([
  {
    name: 'Rings',
    description: 'Exquisite engagement rings, wedding bands, and statement pieces crafted with precision and passion.',
    image: getPublicImageUrl('images/Golden Green.jpeg'),
    category: 'rings'
  },
  {
    name: 'Necklaces',
    description: 'Elegant pendants and chains designed to complement any outfit and occasion.',
    image: getPublicImageUrl('images/Neeon Moon.jpeg'),
    category: 'necklaces'
  },
  {
    name: 'Earrings',
    description: 'From subtle studs to dramatic drops, find the perfect accent for your personal style.',
    image: getPublicImageUrl('images/Auqa Sand.jpeg'),
    category: 'earrings'
  },
  {
    name: 'Bracelets',
    description: 'Add sparkle to your wrist with our selection of charm bracelets, bangles, and cuffs.',
    image: getPublicImageUrl('images/Golden black.jpeg'),
    category: 'bracelets'
  },
  {
    name: 'Watches',
    description: 'Precision timepieces that combine functionality with sophisticated design.',
    image: getPublicImageUrl('images/Neeon Moon 2.jpeg'),
    category: 'watches'
  },
  {
    name: 'Luxury Collection',
    description: 'Exclusive high-end pieces for those special moments that deserve extraordinary jewelry.',
    image: getPublicImageUrl('images/Neeon Moon 3.jpeg'),
    category: 'luxury'
  },
])

// Function to provide fallback products if data loading fails
function getFallbackProducts() {
  return [
    {
      id: 'fallback-1',
      name: 'Diamond Ring',
      category: 'rings',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fallback-2',
      name: 'Pearl Necklace',
      category: 'necklaces',
      price: 499.99,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fallback-3',
      name: 'Gold Earrings',
      category: 'earrings',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1610694955371-d4a3f5146182?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fallback-4',
      name: 'Silver Bracelet',
      category: 'bracelets',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];
}

onMounted(async () => {
  try {
    let products;
    
    // First try to load products directly from Firestore
    try {
      const firestoreProducts = await loadFirestoreProducts();
      
      // If we have products from Firestore, use them
      if (firestoreProducts.length > 0) {
        console.log('Loaded products from Firestore:', firestoreProducts.length);
        products = firestoreProducts;
      } else {
        // Fall back to firebaseService or mock data
        console.log('No products in Firestore, using service fallback');
        products = await firebaseService.getProducts();
      }
      
    } catch (firebaseError) {
      console.warn('Firebase fetch failed, using mock data:', firebaseError);
      products = await mockDataLoader.getProducts();
    }
    
    // Make sure we have products before proceeding
    if (!products || products.length === 0) {
      console.warn('No products found in any source, using fallback data');
      products = getFallbackProducts();
    }
    
    console.log('Total products loaded:', products.length);
    
    // Process the products and assign them
    newCollection.value = products.slice(0, 4);
    trending.value = products.slice(4, 8);
    featuredProducts.value = products
      .filter(product => product.featured || Math.random() > 0.5)
      .slice(0, 8);
      
  } catch (error) {
    console.error('Error loading products:', error);
    featuredProducts.value = getFallbackProducts();
  } finally {
    loading.value = false;
  }
});

// Add the loadFirestoreProducts function from ProductsView.vue
const loadFirestoreProducts = async () => {
  try {
    const db = firebaseService.getFirestore();
    if (!db) return []; // Safety check
    
    const productsCollection = firebaseService.getCollection('products');
    const productsSnapshot = await firebaseService.getDocuments(productsCollection);
    
    if (productsSnapshot.empty) {
      return [];
    }
    
    // Process all products and standardize their format
    return productsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure all products have required fields for display
        name: data.name || 'Unnamed Product',
        price: data.price || 0,
        category: data.category || 'Uncategorized',
        description: data.description || '',
        images: data.images || [],
        // Use first image as main image for product card
        image: data.images && data.images.length > 0 ? 
          // Handle base64 images
          (data.images[0].startsWith('base64://') ? 
            data.images[0].replace('base64://', '') : 
            data.images[0]) : 
          'https://via.placeholder.com/300x300?text=No+Image'
      };
    });
  } catch (error) {
    console.error('Error loading products from Firestore:', error);
    return []; // Return empty array in case of error
  }
};

// Newsletter form data
const newsletter = ref({
  name: '',
  email: '',
  loading: false,
  success: false,
  message: ''
})

// Function to handle newsletter subscription
const subscribeToNewsletter = async () => {
  if (!newsletter.value.email) return;
  
  newsletter.value.loading = true;
  newsletter.value.message = '';
  
  try {
    // Call the Firebase service to save the subscription
    const result = await firebaseService.subscribeToNewsletter(
      newsletter.value.email,
      newsletter.value.name
    );
    
    newsletter.value.success = result.success;
    newsletter.value.message = result.message || 'Thank you for subscribing to our newsletter!';
    
    if (result.success) {
      newsletter.value.name = '';
      newsletter.value.email = '';
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    newsletter.value.success = false;
    newsletter.value.message = 'Failed to subscribe. Please try again later.';
  } finally {
    newsletter.value.loading = false;
  }
}

const addToCart = async (product) => {
  // Get button position as starting point
  const buttonRect = event.target.getBoundingClientRect();
  const startX = buttonRect.left + (buttonRect.width / 2);
  const startY = buttonRect.top + (buttonRect.height / 2);
  
  // Get cart icon position as ending point
  const cartIcon = document.querySelector('.group-hover\\:text-gray-500') || 
                   document.querySelector('a[href="/cart"] svg');
  let endX = window.innerWidth - 60;
  let endY = 20;
  
  if (cartIcon) {
    const cartRect = cartIcon.getBoundingClientRect();
    endX = cartRect.left + (cartRect.width / 2);
    endY = cartRect.top + (cartRect.height / 2);
  }
  
  // Start animation with product (image should already be processed)
  animatingItem.value = product;
  
  await nextTick();
  if (cartAnimationEl.value) {
    // Set initial position
    cartAnimationEl.value.style.top = `${startY}px`;
    cartAnimationEl.value.style.left = `${startX}px`;
    cartAnimationEl.value.style.opacity = '1';
    cartAnimationEl.value.style.transform = 'scale(1)';
    
    // Trigger animation
    setTimeout(() => {
      cartAnimationEl.value.style.top = `${endY}px`;
      cartAnimationEl.value.style.left = `${endX}px`;
      cartAnimationEl.value.style.opacity = '0';
      cartAnimationEl.value.style.transform = 'scale(0.3)';
    }, 50);
    
    // Add to cart after animation
    setTimeout(() => {
      cartStore.addToCart(product, 1);
      animatingItem.value = null;
    }, 600);
  } else {
    // Fallback if animation element is not available
    cartStore.addToCart(product, 1);
  }
}

// Add these near the top of your script setup section
const currentTextIndex = ref(0)
const animatedTexts = [
  'That Elevates Style',
  'With Timeless Beauty',
  'For Every Moment',
  'That Tells Stories',
  'With Perfect Detail',
  'For Your Journey'
]

// Update the animation logic in onMounted
onMounted(() => {
  // Smoother title animation with crossfade
  setInterval(() => {
    currentTextIndex.value = (currentTextIndex.value + 1) % animatedTexts.length
  }, 3000) // Slightly longer duration for better readability
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll)
  
  // ...rest of your existing onMounted code...
})

onBeforeUnmount(() => {
  // Clean up scroll event listener
  window.removeEventListener('scroll', handleScroll)
})

// Scroll to top functionality
const showScrollTop = ref(false)

// Function to scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Check scroll position and show/hide button
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500
}

// ...existing code...
</script>

<style scoped>
/* Add any additional custom styles here */
.collection-card {
  transition: all 0.3s ease;
}

.collection-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Cart animation styles */
.cart-animation {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  z-index: 9999;
  position: fixed;
  pointer-events: none;
}

.broken-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

/* Animation styles */
.fade-slide-up {
  animation: fadeSlideUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced infinite scroll animation - true seamless looping */
.scroll-container {
  height: 650px; /* Increased height for full coverage */
  overflow: hidden;
  position: relative;
  width: 176px;
  margin: 0;
}

@media (min-width: 640px) {
  .scroll-container {
    max-width: 176px; /* Reset to original width on sm screens and above */
  }
}

@media (max-width: 639px) {
  .scroll-container {
    width: 45%; /* Slightly less than 50% to account for spacing */
    max-width: 45vw;
  }
  
  /* Make sure the parent container is properly constrained */
  .absolute.transform {
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
  }
}

/* Image container styles with improved spacing */
.scroll-content > div {
  margin-bottom: 15px; /* Increased space between images */
  margin-top: 15px; /* Added top spacing */
  padding: 12px 0; /* Added padding to top and bottom only */
  background-color: #f8f8f8; /* Light background */
  border-radius: 8px;
}

/* Make the images take up full width of their container */
.scroll-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 6px; /* Slight rounding of image corners */
}

/* Different scroll speeds for visual interest */
.scroll-up {
  animation: scrollUp 40s linear infinite; 
}

.scroll-down {
  animation: scrollDown 45s linear infinite;
}

.scroll-up-slow {
  animation: scrollUp 50s linear infinite;
}

@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes scrollDown {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}

/* Updated animation styles */
.animated-text-wrapper {
  position: relative;
  display: block;
  height: 1em;
  overflow: hidden;
  margin-top: 0.2em;
  font-size: 1em;
}

.animated-text-item {
  position: absolute;
  width: 100%;
  opacity: 0;
  transform: translateY(1em);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  line-height: 1;
}

.animated-text-item.active {
  opacity: 1;
  transform: translateY(0);
}

/* Add specific styling for the product image containers */
.product-image-container {
  padding: 15px 0; /* Good padding at top and bottom only */
  margin: 20px 0; /* Increased space between images */
  background-color: #f9f9f9; /* Light background */
  border: 1px solid rgba(0,0,0,0.05); /* Subtle border */
  box-shadow: 0 2px 4px rgba(0,0,0,0.02); /* Subtle shadow */
  height: auto !important; /* Override fixed height to allow padding to work */
  min-height: 230px; /* Minimum height for images */
  display: flex; /* For vertical centering */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
}

/* Adjust the image style within containers */
.product-image-container img {
  max-height: 220px; /* Make images slightly smaller than container */
  width: 100%;
  object-fit: contain; /* Keep aspect ratio without cropping */
  transition: transform 0.3s ease; /* Add smooth hover effect */
}

.product-image-container:hover img {
  transform: scale(1.05); /* Subtle zoom on hover */
}

/* Scroll to top button styles */
.scroll-to-top-btn {
  opacity: 0.8;
  transform: translateY(0);
  transition: opacity 0.3s, transform 0.3s;
}

.scroll-to-top-btn:hover {
  opacity: 1;
  transform: translateY(-5px);
}

@media (max-width: 640px) {
  .scroll-to-top-btn {
    bottom: 4rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>