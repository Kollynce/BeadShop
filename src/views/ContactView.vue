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

            <!-- Location card (replacing map) -->
            <div class="bg-light-primary dark:bg-dark-primary rounded-xl shadow-lg ring-1 ring-light-neutral-300 dark:ring-dark-neutral-700 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="p-8">
                <h3 class="text-xl font-semibold leading-7 text-light-text-primary dark:text-dark-text-primary mb-6 flex items-center">
                  <MapPinIcon class="h-6 w-6 text-accent-primary mr-2" />
                  Our Location
                </h3>
                
                <div class="text-light-text-secondary dark:text-dark-text-secondary">
                  <p class="font-medium text-lg mb-2">Kreative Kanvas Jewelry</p>
                  <p class="mb-1">Kitengela, Nairobi</p>
                  <p>Kenya</p>
                </div>
                
                <div class="mt-6">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=-1.4774,36.9584&destination_place_id=Kitengela+Nairobi+Kenya" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary-dark text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <MapPinIcon class="h-5 w-5" />
                    <span class="font-medium">View on Google Maps</span>
                  </a>
                </div>
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
import { ref, reactive } from 'vue';
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
</style>
