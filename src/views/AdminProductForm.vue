<template>
  <div class="admin-product-form container mx-auto px-4 py-8 bg-light-primary dark:bg-dark-primary min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h1>
      <router-link 
        to="/admin/products" 
        class="text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-primary dark:hover:text-accent-primary transition-colors"
      >
        Back to Products
      </router-link>
    </div>

    <div class="bg-light-secondary dark:bg-dark-secondary rounded-lg shadow-md p-6 mb-6 border border-light-neutral-300 dark:border-dark-neutral-700">
      <form @submit.prevent="saveProduct">
        <!-- Basic Information -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Product Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="product.name" 
                required
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
            
            <div>
              <label for="category" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Category</label>
              <select 
                id="category" 
                v-model="product.category" 
                required
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
                <option value="">Select a category</option>
                <option value="Beaded Jewelry">Beaded Jewelry</option>
                <option value="String Jewelry">String Jewelry</option>
                <option value="Metal Jewelry">Metal Jewelry</option>
                <option value="Gemstones">Gemstones</option>
                <option value="Earrings">Earrings</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Rings">Rings</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label for="price" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Price (KES)</label>
              <input 
                type="number" 
                id="price" 
                v-model.number="product.price" 
                min="0.01" 
                step="0.01"
                required
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
            
            <div>
              <label for="stock" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Stock Quantity</label>
              <input 
                type="number" 
                id="stock" 
                v-model.number="product.stock" 
                min="0" 
                required
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
          </div>
        </div>
        
        <!-- Description -->
        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Description</label>
          <textarea 
            id="description" 
            v-model="product.description" 
            rows="4"
            required
            class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary resize-y"
          ></textarea>
        </div>
        
        <!-- Images -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary flex items-center">
            <span>Product Images</span>
            <span class="ml-2 text-xs text-light-text-secondary dark:text-dark-text-secondary font-normal bg-accent-primary/10 dark:bg-accent-primary/20 text-accent-primary dark:text-accent-primary px-2 py-0.5 rounded-full">Required</span>
          </h2>
          
          <!-- Featured Image Selection -->
          <div class="mb-4">
            <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Gallery Preview</h3>
            <div class="bg-light-neutral-50 dark:bg-dark-neutral-800 rounded-lg p-4 border border-light-neutral-200 dark:border-dark-neutral-700">
              <div v-if="product.images.length === 0" class="flex flex-col items-center justify-center py-8">
                <svg class="w-12 h-12 text-light-neutral-400 dark:text-dark-neutral-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="text-light-neutral-500 dark:text-dark-neutral-400 text-center">
                  No images added yet<br>
                  <span class="text-sm">Add at least one product image below</span>
                </p>
              </div>
              
              <!-- Image Gallery -->
              <div v-else class="relative">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <div 
                    v-for="(image, index) in product.images" 
                    :key="index"
                    class="group relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-light-neutral-200 dark:bg-dark-neutral-700"
                  >
                    <img 
                      :src="getImageSrc(image)" 
                      class="w-full h-full object-cover transition-transform group-hover:scale-105"
                      :alt="`Product image ${index + 1}`"
                      @error="handleImageError($event, index)"
                    >
                    
                    <!-- Image Controls Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                      <div class="flex justify-between items-center">
                        <span class="text-white text-xs bg-black/50 px-1.5 py-0.5 rounded">
                          Image #{{ index + 1 }}
                        </span>
                        <div class="flex space-x-1">
                          <!-- Set as primary -->
                          <button
                            v-if="index !== 0" 
                            type="button"
                            @click="makeImagePrimary(index)"
                            class="bg-light-primary/90 text-accent-primary rounded-full w-6 h-6 flex items-center justify-center hover:bg-light-primary transition-colors"
                            title="Set as primary image"
                          >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                          </button>
                          
                          <!-- Move left -->
                          <button 
                            v-if="index > 0"
                            type="button"
                            @click="moveImage(index, index - 1)" 
                            class="bg-light-primary/90 text-light-text-primary rounded-full w-6 h-6 flex items-center justify-center hover:bg-light-primary transition-colors"
                            title="Move left"
                          >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                          </button>
                          
                          <!-- Move right -->
                          <button 
                            v-if="index < product.images.length - 1"
                            type="button"
                            @click="moveImage(index, index + 1)" 
                            class="bg-light-primary/90 text-light-text-primary rounded-full w-6 h-6 flex items-center justify-center hover:bg-light-primary transition-colors"
                            title="Move right"
                          >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                          
                          <!-- Remove -->
                          <button 
                            type="button"
                            @click="removeImage(index)" 
                            class="bg-accent-tertiary rounded-full w-6 h-6 flex items-center justify-center hover:bg-accent-tertiary/90 transition-colors"
                            title="Remove image"
                          >
                            <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Primary Image Badge -->
                    <div v-if="index === 0" class="absolute top-2 left-2 bg-accent-quaternary text-white text-xs px-1.5 py-0.5 rounded">
                      Primary
                    </div>
                  </div>
                </div>
                
                <!-- Image Count Badge -->
                <div class="absolute -top-3 -right-3 bg-accent-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                  {{ product.images.length }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Image Upload Area -->
          <div class="bg-light-secondary dark:bg-dark-secondary rounded-lg border border-light-neutral-300 dark:border-dark-neutral-700 overflow-hidden">
            <div class="p-4">
              <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">Add Product Images</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- File Upload Area -->
                <div class="bg-light-neutral-50/50 dark:bg-dark-neutral-800/50 rounded-lg border border-dashed border-light-neutral-400 dark:border-dark-neutral-500 p-4 relative">
                  <div class="flex flex-col items-center justify-center">
                    <svg class="w-10 h-10 text-light-neutral-400 dark:text-dark-neutral-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <div class="text-center mb-3">
                      <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary font-medium">
                        Drag and drop or click to upload
                      </p>
                      <p class="text-xs text-light-neutral-500 dark:text-dark-neutral-400 mt-1">
                        PNG, JPG or JPEG (max. 5MB)
                      </p>
                    </div>
                    
                    <input 
                      type="file" 
                      id="image-upload"
                      @change="handleFileUpload"
                      accept="image/png, image/jpeg, image/jpg"
                      class="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
                      aria-label="Upload product image"
                    />
                    
                    <button 
                      type="button"
                      class="flex items-center text-sm bg-accent-quaternary hover:bg-accent-quaternary/90 text-white py-1.5 px-3 rounded-btn shadow-btn hover:shadow-btn-hover transition-all z-10"
                      @click="document.getElementById('image-upload').click()"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                      Browse Files
                    </button>
                  </div>
                </div>
                
                <!-- URL Upload Area -->
                <div class="bg-light-neutral-50/50 dark:bg-dark-neutral-800/50 rounded-lg border border-light-neutral-300 dark:border-dark-neutral-600 p-4">
                  <div class="space-y-3">
                    <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      Or add image from URL
                    </label>
                    <div class="flex">
                      <input 
                        type="url" 
                        v-model="newImageUrl" 
                        placeholder="https://example.com/image.jpg"
                        class="flex-1 p-2 border border-r-0 border-light-neutral-300 dark:border-dark-neutral-600 rounded-l bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
                      >
                      <button 
                        type="button"
                        @click="addImage" 
                        class="bg-accent-quaternary hover:bg-accent-quaternary/90 text-white py-2 px-3 rounded-r shadow-btn hover:shadow-btn-hover transition-all flex items-center"
                        :disabled="isUploading || !newImageUrl.trim()"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Add
                      </button>
                    </div>
                    <p class="text-xs text-light-neutral-500 dark:text-dark-neutral-400">
                      Enter a direct link to an image file (CORS restrictions may apply)
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Upload Status -->
              <div v-if="isUploading" class="mt-4 bg-accent-quaternary/10 text-accent-quaternary px-4 py-3 rounded border border-accent-quaternary/20 flex items-center">
                <div class="animate-spin mr-2 w-4 h-4 border-2 border-accent-quaternary border-t-transparent rounded-full"></div>
                <span>{{ uploadStatus }}</span>
              </div>
            </div>
            
            <!-- Image Instructions and Tips -->
            <div class="bg-light-neutral-100 dark:bg-dark-neutral-900/50 px-4 py-3 border-t border-light-neutral-200 dark:border-dark-neutral-700">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-accent-tertiary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
                  <p>
                    <span class="font-medium">Tips:</span> Add at least one product image. For best results, use images with a 1:1 aspect ratio.
                  </p>
                  <ul class="list-disc list-inside text-xs text-light-neutral-500 dark:text-dark-neutral-400 pl-1 space-y-0.5">
                    <li>The first image will be the primary product image shown in listings</li>
                    <li>You can rearrange images by using the arrow buttons</li>
                    <li>High-resolution images will be automatically resized to optimize performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Additional Details -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Additional Details</h2>
          
          <!-- Materials & Dimensions -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="materials" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Materials</label>
              <input 
                type="text" 
                id="materials" 
                v-model="product.materials" 
                placeholder="e.g. Sterling silver, glass beads, etc."
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
            <div>
              <label for="dimensions" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Dimensions</label>
              <input 
                type="text" 
                id="dimensions" 
                v-model="product.dimensions" 
                placeholder="e.g. 18 inches, 2.5cm diameter, etc."
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
              >
            </div>
          </div>

          <!-- Product Details (Care, Sizing, Shipping, Returns) -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Care Instructions</label>
              <textarea 
                v-model="product.careInstructions" 
                rows="4"
                placeholder="Enter care instructions, one per line"
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary resize-y"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Sizing & Fit</label>
              <textarea 
                v-model="product.sizingAndFit" 
                rows="3"
                placeholder="Enter sizing and fit information"
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary resize-y"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Shipping Information</label>
              <textarea 
                v-model="product.shippingInfo" 
                rows="2"
                placeholder="Enter shipping information"
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary resize-y"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">Return Policy</label>
              <textarea 
                v-model="product.returnPolicy" 
                rows="2"
                placeholder="Enter return policy"
                class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary resize-y"
              ></textarea>
            </div>
          </div>

          <!-- Featured Product Toggle -->
          <div class="mt-4">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="featured" 
                v-model="product.featured"
                class="h-4 w-4 text-accent-primary focus:ring-accent-primary border-light-neutral-300 dark:border-dark-neutral-600 rounded"
              >
              <label for="featured" class="ml-2 block text-sm text-light-text-primary dark:text-dark-text-primary">
                Featured product (display on homepage)
              </label>
            </div>
          </div>
        </div>
        
        <!-- New Variants Section -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary flex items-center">
            <span>Product Variants</span>
            <span class="ml-2 text-xs text-light-text-secondary dark:text-dark-text-secondary font-normal bg-light-neutral-100 dark:bg-dark-neutral-700 px-2 py-0.5 rounded-full">Optional</span>
          </h2>
          
          <!-- Saved Variants Display -->
          <div v-if="product.variants.length" class="mb-4 bg-light-neutral-50 dark:bg-dark-neutral-800 rounded-lg p-4 border border-light-neutral-200 dark:border-dark-neutral-700">
            <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">Saved Variants</h3>
            <ul class="space-y-2">
              <li v-for="(variant, index) in product.variants" :key="index" 
                  class="flex items-center justify-between p-3 rounded-lg border border-light-neutral-200 dark:border-dark-neutral-600 bg-light-primary dark:bg-dark-primary hover:shadow-sm transition-shadow">
                <div class="flex items-center">
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ variant.name }}</span>
                  <div class="ml-3 flex items-center gap-1">
                    <div v-for="(color, idx) in variant.colors" :key="idx" 
                         class="w-5 h-5 rounded-full border border-light-neutral-300 dark:border-dark-neutral-600 transition-transform hover:scale-110 cursor-pointer flex justify-center items-center"
                         :style="{ backgroundColor: color }"
                         :title="color">
                    </div>
                  </div>
                </div>
                <button type="button" 
                        @click="product.variants.splice(index, 1)" 
                        class="text-light-neutral-500 dark:text-dark-neutral-400 hover:text-accent-tertiary dark:hover:text-accent-tertiary flex items-center transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  <span class="ml-1 text-sm">Remove</span>
                </button>
              </li>
            </ul>
          </div>
          
          <!-- Add New Variant Form -->
          <div class="bg-light-secondary dark:bg-dark-secondary rounded-lg p-5 border border-light-neutral-300 dark:border-dark-neutral-700">
            <h3 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-4">Add New Variant</h3>
            
            <!-- Name and Color Selection -->
            <div class="space-y-4">
              <div>
                <label for="variant-name" class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Variant Name
                </label>
                <input 
                  type="text" 
                  id="variant-name" 
                  v-model="newVariantName" 
                  placeholder="e.g. 'Silver & Blue', 'Rose Gold', 'Extra Large'"
                  class="w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-accent-primary focus:border-accent-primary"
                >
                <p class="mt-1 text-xs text-light-neutral-500 dark:text-dark-neutral-400">
                  Name that describes this product variant (color, size, material, style, etc.)
                </p>
              </div>
              
              <!-- Color Palette -->
              <div>
                <label class="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Color Palette
                  <span class="ml-1 text-xs text-light-neutral-500 dark:text-dark-neutral-400 font-normal">
                    (up to 5 colors)
                  </span>
                </label>
                
                <!-- Selected Colors Display -->
                <div class="flex flex-wrap items-center gap-2 mb-3">
                  <div 
                    v-for="(color, index) in newVariantColors" 
                    :key="index" 
                    class="relative group"
                  >
                    <div class="flex flex-col items-center">
                      <div 
                        class="w-8 h-8 rounded-full border border-light-neutral-300 dark:border-dark-neutral-600 shadow-sm flex items-center justify-center"
                        :style="{ backgroundColor: color }"
                      ></div>
                      <input 
                        type="color" 
                        v-model="newVariantColors[index]" 
                        @input="updateVariantColor(index, $event)" 
                        class="w-5 h-5 mt-1 p-0 border-0 cursor-pointer"
                        :aria-label="`Color ${index + 1}`"
                      >
                      <button 
                        type="button" 
                        @click="removeVariantColor(index)" 
                        class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-accent-tertiary text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove color"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    v-if="newVariantColors.length < 5"
                    type="button" 
                    @click="addNewVariantColor" 
                    class="w-8 h-8 rounded-full border-2 border-dashed border-light-neutral-400 dark:border-dark-neutral-500 flex items-center justify-center hover:border-accent-primary dark:hover:border-accent-primary transition-colors"
                    aria-label="Add color"
                  >
                    <span class="text-light-neutral-500 dark:text-dark-neutral-400 text-xl">+</span>
                  </button>
                </div>
                
                <!-- Preset Colors -->
                <div class="mt-2">
                  <p class="text-xs text-light-neutral-500 dark:text-dark-neutral-400 mb-2">Common colors:</p>
                  <div class="flex flex-wrap gap-1.5">
                    <button 
                      v-for="(color, index) in presetColors" 
                      :key="index"
                      type="button" 
                      @click="addPresetColor(color)" 
                      :style="{ backgroundColor: color }"
                      :disabled="newVariantColors.length >= 5"
                      class="w-6 h-6 rounded-full border border-light-neutral-300 dark:border-dark-neutral-600 hover:scale-110 transition-transform"
                      :aria-label="`Add ${color} color`"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Add Variant Button -->
            <div class="mt-5 flex">
              <button 
                type="button" 
                @click="addVariant" 
                :disabled="!canAddVariant"
                class="flex items-center px-4 py-2 rounded-btn shadow-btn text-white bg-accent-quaternary hover:bg-accent-quaternary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Variant
              </button>
              <div v-if="!canAddVariant" class="ml-2 text-sm text-accent-tertiary flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                Please add a name and at least one color
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-light-neutral-300 dark:border-dark-neutral-700 pt-6 flex justify-end space-x-4">
          <button 
            type="button" 
            @click="$router.go(-1)" 
            class="py-2 px-4 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-btn shadow-btn text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="py-2 px-4 border border-transparent rounded-btn shadow-btn text-sm font-medium text-white bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btn-primary transition-all"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Saving...' : 'Save Product' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="bg-orange-100 dark:bg-orange-900/30 border border-orange-400 dark:border-orange-700 text-orange-700 dark:text-orange-400 px-4 py-3 rounded mb-4 relative">
      <strong class="font-bold mr-1">Error:</strong>
      <span class="block sm:inline">{{ error }}</span>
      <span 
        class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" 
        @click="error = null"
      >
        <span class="text-xl">&times;</span>
      </span>
    </div>
    
    <!-- Warning for temporary images -->
    <div v-if="hasTempImages" class="bg-accent-primary/10 dark:bg-accent-primary/20 border border-accent-primary/30 dark:border-accent-primary/30 text-light-text-primary dark:text-dark-text-primary px-4 py-3 rounded mb-4">
      <strong class="font-bold">Warning:</strong>
      <span class="block sm:inline">
        Some images are temporarily stored locally due to CORS restrictions.
        They will be lost if you refresh the page. Please check the CORS settings for your Firebase Storage.
      </span>
    </div>

    <!-- Size warning -->
    <div v-if="showSizeWarning" class="bg-accent-primary/10 dark:bg-accent-primary/20 border border-accent-primary/30 dark:border-accent-primary/30 text-light-text-primary dark:text-dark-text-primary px-4 py-3 rounded mb-4">
      <strong class="font-bold">Warning:</strong>
      <span class="block sm:inline">
        Some uploaded images may be stored as base64 strings in the database, which has size limitations.
        Very large images may cause problems when saving the product.
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { firebaseService } from '../services/firebaseService';
import { formatCurrency } from '@/utils/currency';

const router = useRouter();
const route = useRoute();

const productId = computed(() => route.params.id);
const isEditMode = computed(() => !!productId.value);

const product = ref({
  name: '',
  category: '',
  description: '',
  price: 0,
  stock: 1,
  images: [],
  featured: false,
  materials: '',
  dimensions: '',
  variants: [],
  careInstructions: `Store in a cool, dry place away from direct sunlight
Avoid contact with perfumes, lotions, and chemicals
Clean gently with a soft, lint-free cloth
Remove before swimming or bathing`,
  sizingAndFit: 'Our standard bracelet length is 7.5 inches. Necklaces are available in 16, 18, and 20 inch lengths. Please contact us for custom sizing.',
  shippingInfo: 'Handmade to order. Please allow 1-3 business days for production plus shipping time.',
  returnPolicy: 'We accept returns within 14 days of delivery for unworn items in original packaging.'
});

const newImageUrl = ref('');
const isSaving = ref(false);
const isUploading = ref(false);
const error = ref(null);
const showSizeWarning = ref(false);
const formKey = computed(() => isEditMode.value ? `product_edit_${productId.value}` : 'product_new');
const uploadStatus = ref('Processing image...');

const hasTempImages = computed(() => {
  return product.value.images.some(img => img.startsWith('temp://'));
});

// Load product data from server or localStorage
onMounted(async () => {
  if (isEditMode.value) {
    try {
      const productData = await firebaseService.getProduct(productId.value);
      if (productData) {
        product.value = { ...productData };
      } else {
        console.error('Product not found');
        router.push('/admin/products');
      }
    } catch (err) {
      console.error('Error loading product:', err);
      error.value = 'Failed to load product';
    }
  } else {
    // For new products, try to load data from localStorage
    const savedForm = localStorage.getItem(formKey.value);
    if (savedForm) {
      try {
        product.value = JSON.parse(savedForm);
      } catch (err) {
        console.error('Error parsing saved form data:', err);
      }
    }
  }
});

// Save form data to localStorage when it changes
watch(() => product.value, (newValue) => {
  localStorage.setItem(formKey.value, JSON.stringify(newValue));
}, { deep: true });

// Clean up localStorage when component unmounts after successful save
onBeforeUnmount(() => {
  // Only keep localStorage if there was an error (form not successfully submitted)
  if (!error.value && !isSaving.value) {
    localStorage.removeItem(formKey.value);
  }
});

const addImage = () => {
  if (newImageUrl.value.trim()) {
    product.value.images.push(newImageUrl.value.trim());
    newImageUrl.value = '';
  }
};

const removeImage = (index) => {
  product.value.images.splice(index, 1);
};

// Convert any base64 or temp URLs to displayable images
const getImageSrc = (url) => {
  if (url.startsWith('base64://')) {
    return url.replace('base64://', '');
  } else if (url.startsWith('temp://')) {
    return url.replace('temp://', '');
  }
  return url;
};

// Handle file upload with better error handling and resize feedback
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.match('image.*')) {
    error.value = 'Please select an image file';
    return;
  }
  
  isUploading.value = true;
  error.value = null;

  try {
    // Check original file size and update status accordingly
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    
    if (file.size > 1024 * 1024) { // Larger than 1MB
      uploadStatus.value = `Resizing ${fileSizeMB}MB image for optimal performance...`;
    } else {
      uploadStatus.value = `Processing ${fileSizeMB}MB image...`;
    }
    
    // Process file - will be converted to base64
    const imageUrl = await firebaseService.uploadProductImage(file);
    product.value.images.push(imageUrl);
    
    // Show size warning if we're storing base64 data
    if (imageUrl.startsWith('base64://')) {
      showSizeWarning.value = true;
    }
    
    // Reset file input
    event.target.value = '';
  } catch (err) {
    console.error('Error processing image:', err);
    error.value = `Failed to process image: ${err.message || 'Unknown error'}`;
  } finally {
    isUploading.value = false;
  }
};

// Modified saveProduct to handle different image types
const saveProduct = async () => {
  isSaving.value = true;
  error.value = null;
  
  try {
    // Validate form
    if (!product.value.name || !product.value.category || !product.value.description || product.value.images.length === 0) {
      throw new Error('Please fill out all required fields and add at least one image');
    }
    
    // Check total size of base64 images
    const base64Images = product.value.images.filter(img => img.startsWith('base64://'));
    if (base64Images.length > 0) {
      // Calculate approximate size of all base64 strings
      const totalBase64Size = base64Images.reduce((size, img) => size + img.length, 0);
      const approxSizeInKB = totalBase64Size / 1024;
      
      // Warn if total size exceeds 700KB (to stay well under Firestore's 1MB limit)
      if (approxSizeInKB > 700) {
        if (!confirm(`Warning: Your product has approximately ${approxSizeInKB.toFixed(0)}KB of image data, which is approaching Firestore's limit. Continue anyway?`)) {
          isSaving.value = false;
          return;
        }
      }
    }
    
    // Proceed with saving
    if (isEditMode.value) {
      await firebaseService.updateProduct(productId.value, product.value);
    } else {
      await firebaseService.createProduct(product.value);
    }
    
    // Clear localStorage after successful save
    localStorage.removeItem(formKey.value);
    router.push('/admin/products');
  } catch (err) {
    console.error('Error saving product:', err);
    error.value = err.message;
  } finally {
    isSaving.value = false;
  }
};

const newVariantName = ref('');
const newVariantColors = ref([]); // holds an array of color hex values

const addNewVariantColor = () => {
  // Add default white color on click
  newVariantColors.value.push('#ffffff');
};

const updateVariantColor = (index, event) => {
  newVariantColors.value[index] = event.target.value;
};

const removeVariantColor = (index) => {
  newVariantColors.value.splice(index, 1);
};

const addVariant = () => {
  if(newVariantName.value.trim() && newVariantColors.value.length){
    product.value.variants.push({
      name: newVariantName.value.trim(),
      colors: [...newVariantColors.value]
    });
    newVariantName.value = '';
    newVariantColors.value = [];
  }
};

const presetColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'];

const addPresetColor = (color) => {
  if (newVariantColors.value.length < 5) {
    newVariantColors.value.push(color);
  }
};

const canAddVariant = computed(() => {
  return newVariantName.value.trim() && newVariantColors.value.length > 0;
});

const moveImage = (fromIndex, toIndex) => {
  // Get the image being moved
  const imageToMove = product.value.images[fromIndex];
  
  // Remove from current position
  product.value.images.splice(fromIndex, 1);
  
  // Insert at new position
  product.value.images.splice(toIndex, 0, imageToMove);
};

const makeImagePrimary = (index) => {
  if (index <= 0 || index >= product.value.images.length) return;
  
  // Get the image to make primary
  const imageToMakePrimary = product.value.images[index];
  
  // Remove it from the current position
  product.value.images.splice(index, 1);
  
  // Add it to the beginning of the array (making it primary)
  product.value.images.unshift(imageToMakePrimary);
};

const handleImageError = (event, index) => {
  // Replace broken image with placeholder
  event.target.src = '/images/no-image.jpg';
  
  // Optionally log the error for debugging
  console.warn(`Image at index ${index} failed to load:`, product.value.images[index]);
};
</script>

<style scoped>
.admin-product-form {
  min-height: 80vh;
}
</style>