<template>
  <div class="min-h-screen bg-light-primary dark:bg-dark-primary">
    <div class="relative isolate bg-light-secondary dark:bg-dark-secondary">
      <!-- Hero section with banner image -->
      <div class="relative">
        <!-- Banner image -->
        <div class="absolute inset-0">
          <img
            src="/images/Auqu Sand varients.jpeg"
            alt="Jewelry crafting"
            class="h-full w-full object-cover object-center"
          />
          <div class="absolute inset-0 bg-gray-900 opacity-60"></div>
        </div>

        <!-- Header content -->
        <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div class="text-center animate-fadeIn">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Get in Touch
            </h2>
            <p class="mt-4 text-lg leading-8 text-gray-200 max-w-2xl mx-auto">
              We're here to help bring your jewelry dreams to life. Reach out to us for any questions, custom orders, or collaborations.
            </p>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-12">
          <!-- Contact information cards - 5 columns -->
          <div class="lg:col-span-5 space-y-8 animate-slideInLeft">
            <!-- Contact card -->
            <div class="bg-light-primary dark:bg-dark-primary rounded-xl shadow-lg ring-1 ring-light-neutral-300 dark:ring-dark-neutral-700 p-8 hover:shadow-xl transition-all duration-300">
              <h3 class="text-xl font-semibold leading-7 text-light-text-primary dark:text-dark-text-primary mb-6">
                Contact Details
              </h3>
              <dl class="space-y-6 text-sm leading-6">
                <div class="flex items-center gap-x-4 group">
                  <dt class="flex-none">
                    <span class="sr-only">Address</span>
                    <MapPinIcon class="h-6 w-6 text-accent-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </dt>
                  <dd class="text-light-text-secondary dark:text-dark-text-secondary">
                    <p class="font-medium">Nairobi Kenya</p>
                    <p>Kitengela</p>
                  </dd>
                </div>
                <div class="flex items-center gap-x-4 group">
                  <dt class="flex-none">
                    <span class="sr-only">Telephone</span>
                    <PhoneIcon class="h-6 w-6 text-accent-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a class="text-light-text-primary dark:text-dark-text-primary hover:text-accent-primary transition-colors" 
                       href="tel:+2547 4141 4271">
                      +2547 4141 4261
                    </a>
                  </dd>
                </div>
                <div class="flex items-center gap-x-4 group">
                  <dt class="flex-none">
                    <span class="sr-only">Email</span>
                    <EnvelopeIcon class="h-6 w-6 text-accent-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a class="text-light-text-primary dark:text-dark-text-primary hover:text-accent-primary transition-colors" 
                       href="mailto:hello@kreativekanvas.shop">
                      hello@kreativekanvas.shop
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Studio hours card -->
            <div class="bg-light-primary dark:bg-dark-primary rounded-xl shadow-lg ring-1 ring-light-neutral-300 dark:ring-dark-neutral-700 p-8 hover:shadow-xl transition-all duration-300">
              <h3 class="text-xl font-semibold leading-7 text-light-text-primary dark:text-dark-text-primary mb-6">
                Studio Hours
              </h3>
              <dl class="space-y-4 text-sm leading-6">
                <div class="flex items-center gap-x-4">
                  <dt class="flex-none">
                    <ClockIcon class="h-6 w-6 text-accent-primary" aria-hidden="true" />
                  </dt>
                  <dd class="text-light-text-secondary dark:text-dark-text-secondary space-y-2">
                    <div class="flex justify-between items-center">
                      <span>Monday - Friday</span>
                      <span class="font-medium">9AM - 6PM</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>Saturday</span>
                      <span class="font-medium">10AM - 4PM</span>
                    </div>
                    <div class="flex justify-between items-center text-light-neutral-500 dark:text-dark-neutral-400">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Map card -->
            <div class="bg-light-primary dark:bg-dark-primary rounded-xl shadow-lg ring-1 ring-light-neutral-300 dark:ring-dark-neutral-700 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative h-64">
                <div id="map" ref="mapContainer" class="w-full h-full"></div>
                
                <div v-if="mapLoading" class="absolute inset-0 flex items-center justify-center bg-light-neutral-100 dark:bg-dark-neutral-800 bg-opacity-75 dark:bg-opacity-75 backdrop-blur-sm">
                  <div class="text-center">
                    <div class="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p class="text-light-text-secondary dark:text-dark-text-secondary">Loading map...</p>
                  </div>
                </div>
              </div>
              
              <div class="p-4 bg-light-primary dark:bg-dark-primary border-t border-light-neutral-200 dark:border-dark-neutral-700">
                <a 
                  :href="directionsUrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors group"
                >
                  <MapPinIcon class="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span class="font-medium">Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact form - 7 columns -->
          <div class="lg:col-span-7 animate-slideInRight">
            <div class="bg-light-primary dark:bg-dark-primary rounded-xl shadow-lg ring-1 ring-light-neutral-300 dark:ring-dark-neutral-700 p-8">
              <h3 class="text-xl font-semibold leading-7 text-light-text-primary dark:text-dark-text-primary mb-6">
                Send us a Message
              </h3>
              
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label for="first-name" class="block text-sm font-medium leading-6 text-light-text-primary dark:text-dark-text-primary">First name</label>
                    <div class="mt-2">
                      <input v-model="form.firstName" type="text" id="first-name" autocomplete="given-name"  
                        class="block w-full rounded-md border-0 py-1.5 text-light-text-primary dark:text-dark-text-primary shadow-sm ring-1 ring-inset ring-light-neutral-300 dark:ring-dark-neutral-700 placeholder:text-light-neutral-400 dark:placeholder:text-dark-neutral-400 focus:ring-2 focus:ring-inset focus:ring-accent-primary sm:text-sm sm:leading-6"
                        :class="{ 'ring-red-500': errors.firstName }">
                      <p v-if="errors.firstName" class="mt-2 text-sm text-red-600">{{ errors.firstName }}</p>
                    </div>
                  </div>

                  <div>
                    <label for="last-name" class="block text-sm font-medium leading-6 text-light-text-primary dark:text-dark-text-primary">Last name</label>
                    <div class="mt-2">
                      <input v-model="form.lastName" type="text" id="last-name" autocomplete="family-name" 
                        class="block w-full rounded-md border-0 py-1.5 text-light-text-primary dark:text-dark-text-primary shadow-sm ring-1 ring-inset ring-light-neutral-300 dark:ring-dark-neutral-700 placeholder:text-light-neutral-400 dark:placeholder:text-dark-neutral-400 focus:ring-2 focus:ring-inset focus:ring-accent-primary sm:text-sm sm:leading-6"
                        :class="{ 'ring-red-500': errors.lastName }">
                      <p v-if="errors.lastName" class="mt-2 text-sm text-red-600">{{ errors.lastName }}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-light-text-primary dark:text-dark-text-primary">Email</label>
                  <div class="mt-2">
                    <input v-model="form.email" id="email" name="email" type="email" autocomplete="email" 
                      class="block w-full rounded-md border-0 py-1.5 text-light-text-primary dark:text-dark-text-primary shadow-sm ring-1 ring-inset ring-light-neutral-300 dark:ring-dark-neutral-700 placeholder:text-light-neutral-400 dark:placeholder:text-dark-neutral-400 focus:ring-2 focus:ring-inset focus:ring-accent-primary sm:text-sm sm:leading-6"
                      :class="{ 'ring-red-500': errors.email }">
                    <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
                  </div>
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium leading-6 text-light-text-primary dark:text-dark-text-primary">Subject</label>
                  <div class="mt-2">
                    <input v-model="form.subject" type="text" id="subject"  
                      class="block w-full rounded-md border-0 py-1.5 text-light-text-primary dark:text-dark-text-primary shadow-sm ring-1 ring-inset ring-light-neutral-300 dark:ring-dark-neutral-700 placeholder:text-light-neutral-400 dark:placeholder:text-dark-neutral-400 focus:ring-2 focus:ring-inset focus:ring-accent-primary sm:text-sm sm:leading-6"
                      :class="{ 'ring-red-500': errors.subject }">
                    <p v-if="errors.subject" class="mt-2 text-sm text-red-600">{{ errors.subject }}</p>
                  </div>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium leading-6 text-light-text-primary dark:text-dark-text-primary">Message</label>
                  <div class="mt-2">
                    <textarea v-model="form.message" id="message" rows="4" 
                      class="block w-full rounded-md border-0 py-1.5 text-light-text-primary dark:text-dark-text-primary shadow-sm ring-1 ring-inset ring-light-neutral-300 dark:ring-dark-neutral-700 placeholder:text-light-neutral-400 dark:placeholder:text-dark-neutral-400 focus:ring-2 focus:ring-inset focus:ring-accent-primary sm:text-sm sm:leading-6"
                      :class="{ 'ring-red-500': errors.message }"></textarea>
                    <p v-if="errors.message" class="mt-2 text-sm text-red-600">{{ errors.message }}</p>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button type="submit" 
                    :disabled="isSubmitting"
                    class="rounded-btn bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white py-2.5 px-3.5 text-sm font-semibold shadow-btn hover:shadow-btn-hover transition-btn disabled:bg-light-neutral-300 dark:disabled:bg-dark-neutral-600">
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </form>

              <div v-if="formSubmitted" class="mt-6 rounded-md bg-green-50 dark:bg-dark-neutral-800 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-green-800 dark:text-green-200 text-justify">Thank you for your message! We'll get back to you soon.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline';

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
});

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);
const mapContainer = ref(null);
const mapLoading = ref(true);

// Kitengela, Nairobi coordinates
const storeLocation = {
  lat: -1.4774,
  lng: 36.9584,
  address: 'Kitengela, Nairobi, Kenya'
};

// Computed URL for directions
const directionsUrl = computed(() => {
  return `https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}&destination_place_id=Kitengela+Nairobi+Kenya`;
});

const validateForm = () => {
  let valid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '');
  
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required';
    valid = false;
  }
  
  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required';
    valid = false;
  }
  
  if (!form.email.trim()) {
    errors.email = 'Email is required';
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address';
    valid = false;
  }
  
  if (!form.subject.trim()) {
    errors.subject = 'Subject is required';
    valid = false;
  }
  
  if (!form.message.trim()) {
    errors.message = 'Message is required';
    valid = false;
  }
  
  return valid;
};

const submitForm = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear form
    Object.keys(form).forEach(key => form[key] = '');
    
    // Show success message
    formSubmitted.value = true;
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Initialize Google Maps with standard approach
function initMap() {
  try {
    // Check if the map container exists
    if (!mapContainer.value) {
      console.error('Map container not found');
      mapLoading.value = false;
      return;
    }
    
    // Check if Google Maps is loaded
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API not loaded');
      mapLoading.value = false;
      return;
    }

    // Define map options
    const mapOptions = {
      center: { lat: storeLocation.lat, lng: storeLocation.lng },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "poi",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "transit",
          "elementType": "labels.icon",
          "stylers": [{"visibility": "off"}]
        }
      ]
    };

    // Create new map instance
    const map = new google.maps.Map(mapContainer.value, mapOptions);

    // Create marker
    const marker = new google.maps.Marker({
      position: { lat: storeLocation.lat, lng: storeLocation.lng },
      map: map,
      title: 'Kreative Kanvas Jewelry',
      animation: google.maps.Animation.DROP
    });

    // Create info window content
    const contentString = `
      <div class="p-3">
        <h3 class="font-bold text-base mb-1">Kreative Kanvas Jewelry</h3>
        <p class="text-sm">${storeLocation.address}</p>
        <p class="text-sm mt-1">
          <a href="tel:+2547 4141 4271" class="text-blue-600 hover:text-blue-800">
            +2547 4141 4271
          </a>
        </p>
      </div>
    `;

    // Create info window
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 250
    });
    
    // Open info window by default after a short delay
    setTimeout(() => {
      infoWindow.open({
        anchor: marker,
        map
      });
    }, 500);

    // Add event listener to marker
    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map
      });
    });
    
    // Hide loading indicator
    mapLoading.value = false;
  } catch (error) {
    console.error('Error initializing map:', error);
    mapLoading.value = false;
  }
}

// Load Google Maps API
const loadGoogleMapsApi = () => {
  // Check if Google Maps API is already loaded
  if (window.google && window.google.maps) {
    initMap();
    return;
  }
  
  // Create script element
  const googleMapsApiScript = document.createElement('script');
  
  // Use a public API key or replace with your own
  const apiKey = 'AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk'; // This is a public testing key
  
  // Set script attributes
  googleMapsApiScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  googleMapsApiScript.async = true;
  googleMapsApiScript.defer = true;
  
  // Set up callbacks
  googleMapsApiScript.onload = () => {
    // Initialize map when API is loaded
    initMap();
  };
  
  googleMapsApiScript.onerror = (event) => {
    console.error('Failed to load Google Maps API:', event);
    mapLoading.value = false;
  };
  
  // Add script to document
  document.head.appendChild(googleMapsApiScript);
};

onMounted(() => {
  // Initialize map
  loadGoogleMapsApi();
});
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
  background-size: 24px 24px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out;
}

.animate-slideInRight {
  animation: slideInRight 0.8s ease-out;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--light-primary);
  color: var(--light-text-primary);
  border-color: var(--light-neutral-300);
  outline: none;
  transition: all 0.2s;
  border-radius: 0.375rem;
}

.dark .contact-form input[type="email"],
.dark .contact-form input[type="text"],
.dark .contact-form textarea {
  background-color: var(--dark-primary);
  color: var(--dark-text-primary);
  border-color: var(--dark-neutral-700);
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px var(--accent-primary-alpha);
}

.contact-form label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: var(--light-text-primary);
}

.dark .contact-form label {
  color: var(--dark-text-primary);
}

/* Google Maps custom styles */
:deep(.gm-style .gm-style-iw-c) {
  padding: 12px;
  border-radius: 8px;
}

:deep(.gm-style .gm-style-iw-d) {
  overflow: auto !important;
  max-height: none !important;
}

:deep(.gm-style-iw button.gm-ui-hover-effect) {
  top: 2px !important;
  right: 2px !important;
}
</style>
