<script setup>
import { RouterLink } from 'vue-router';
import { getPublicImageUrl } from '@/utils/imageLoader';
</script>

<template>
  <footer class="bg-light-secondary dark:bg-dark-secondary py-10 mt-auto border-t border-light-neutral-200 dark:border-dark-neutral-600 transition-colors duration-200">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center mb-4">
            <img :src="getPublicImageUrl('images/sticky.PNG')" alt="Kreative Kanvas Logo" class="h-16 w-auto mr-2" />
          </div>
          <p class="text-sm text-light-text-secondary dark:text-dark-neutral-700 leading-relaxed">
            Exquisite handcrafted jewelry for every occasion. Quality materials, timeless designs that capture your unique style.
          </p>
          
        </div>
        
        <div>
          <h3 class="font-bold text-lg mb-4 text-light-text-primary dark:text-dark-text-primary border-b-2 border-orange-500 dark:border-orange-500 inline-block pb-1">Shop</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/products" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">All Products</RouterLink></li>
            <li><RouterLink to="/products?category=rings" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Rings</RouterLink></li>
            <li><RouterLink to="/products?category=necklaces" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Necklaces</RouterLink></li>
            <li><RouterLink to="/products?category=bracelets" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Bracelets</RouterLink></li>
            <li><RouterLink to="/products?category=earrings" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Earrings</RouterLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-bold text-lg mb-4 text-light-text-primary dark:text-dark-text-primary border-b-2 border-orange-500 dark:border-orange-500 inline-block pb-1">Customer Service</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/contact" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Contact Us</RouterLink></li>
            <li><a href="#" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Shipping Policy</a></li>
            <li><a href="#" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" class="text-sm text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">FAQs</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-bold text-lg mb-4 text-light-text-primary dark:text-dark-text-primary border-b-2 border-orange-500 dark:border-orange-500 inline-block pb-1">Connect With Us</h3>
          <div class="flex space-x-4 mb-4">
            <!-- Social icons - Accent color on hover (10%) -->
            <a href="#" class="text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.66.254 1.216.598 1.772 1.153a4.974 4.974 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.974 4.974 0 01-1.153 1.772 4.974 4.974 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.974 4.974 0 01-1.772-1.153 4.974 4.974 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.974 4.974 0 011.153-1.772A4.974 4.974 0 015.45 3.525c.636-.247 1.363-.416 2.427-.465C8.901 3.013 9.256 3 11.685 3h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          </div>
          
          <!-- Address and contact - Secondary color (30%) -->
          <div class="text-sm text-light-text-secondary dark:text-dark-neutral-700 space-y-1">
            <p>Kitengela</p>
            <p>Nairobi Kenya, Kitengela</p>
            <p class="mt-2">hello@kreativekanvas.shop</p>
            <p>+2547 4141 4261</p>
          </div>
        </div>
      </div>
      
      <!-- Footer bottom - Secondary color (30%) -->
      <div class="mt-10 pt-8 border-t border-light-neutral-200 dark:border-dark-neutral-600 text-center">
        <p class="text-sm text-light-neutral-600 dark:text-dark-neutral-600">&copy; {{ new Date().getFullYear() }} Sticky Kreation . All rights reserved.</p>
        <div class="mt-2 flex justify-center space-x-6 text-xs">
          <a href="#" class="text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Privacy Policy</a>
          <a href="#" class="text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Terms of Service</a>
          <a href="#" class="text-light-text-secondary dark:text-dark-neutral-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
</template>
