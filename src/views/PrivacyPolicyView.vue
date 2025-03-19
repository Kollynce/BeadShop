<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue';

const route = useRoute();

onMounted(() => {
  // Scroll to top when page loads
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <Breadcrumbs :items="[
      { name: 'Home', href: '/' },
      { name: 'Privacy Policy', href: '/privacy-policy' }
    ]" />
    
    <div class="max-w-4xl mx-auto bg-white dark:bg-dark-neutral-200 p-6 rounded-lg shadow-sm my-8">
      <h1 class="text-2xl font-bold mb-6 text-light-text-primary dark:text-dark-text-primary">Privacy Policy</h1>
      
      <div class="space-y-6 text-light-text-secondary dark:text-dark-neutral-700">
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Introduction</h2>
          <p>Welcome to Sticky Kreation ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share information about you when you visit our website, make purchases, or interact with us.</p>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Information We Collect</h2>
          <p>We collect information that you provide directly to us, information we collect automatically, and information from third-party sources.</p>
          
          <div class="ml-4 mt-3">
            <h3 class="font-medium mb-1 text-light-text-primary dark:text-dark-text-primary">Personal Information</h3>
            <p>When you make a purchase, create an account, sign up for our newsletter, or contact us, we may collect:</p>
            <ul class="list-disc ml-6 mt-1">
              <li>Contact information (name, email address, phone number, shipping address)</li>
              <li>Account login details (email address and password)</li>
              <li>Payment information (processed by our secure payment processors)</li>
              <li>Purchase history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
          </div>
          
          <div class="ml-4 mt-3">
            <h3 class="font-medium mb-1 text-light-text-primary dark:text-dark-text-primary">Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information about your device and usage, including:</p>
            <ul class="list-disc ml-6 mt-1">
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Browsing history and interactions with our site</li>
              <li>Time and date of your visits</li>
              <li>Referring websites or applications</li>
            </ul>
          </div>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">How We Use Cookies</h2>
          <p>We use cookies and similar technologies to improve your browsing experience, analyze site traffic, personalize content, and deliver targeted advertisements. Cookies help us:</p>
          <ul class="list-disc ml-6 mt-1">
            <li>Remember your preferences and settings</li>
            <li>Understand how you interact with our website</li>
            <li>Keep track of items in your shopping cart</li>
            <li>Authenticate your account and keep you logged in</li>
            <li>Measure the effectiveness of our marketing campaigns</li>
          </ul>
          
          <div class="ml-4 mt-3">
            <h3 class="font-medium mb-1 text-light-text-primary dark:text-dark-text-primary">Types of Cookies We Use</h3>
            <p><strong>Necessary Cookies:</strong> These cookies are essential for the website to function properly and cannot be disabled.</p>
            <p><strong>Functional Cookies:</strong> These cookies enable enhanced website functionality and personalization.</p>
            <p><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website.</p>
            <p><strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites to display relevant advertisements.</p>
          </div>
          
          <div class="ml-4 mt-3">
            <h3 class="font-medium mb-1 text-light-text-primary dark:text-dark-text-primary">Managing Cookie Preferences</h3>
            <p>You can manage your cookie preferences at any time by clicking "Cookie Preferences" in our cookie banner or by adjusting your browser settings. Please note that blocking certain cookies may affect your experience on our website.</p>
          </div>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul class="list-disc ml-6 mt-1">
            <li>Process and fulfill your orders</li>
            <li>Manage your account and provide customer support</li>
            <li>Communicate with you about products, services, and promotions</li>
            <li>Personalize your shopping experience</li>
            <li>Improve our website, products, and services</li>
            <li>Detect, prevent, and address technical issues or fraudulent activities</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">How We Share Your Information</h2>
          <p>We may share your personal information with:</p>
          <ul class="list-disc ml-6 mt-1">
            <li>Service providers who help us operate our business (payment processors, shipping companies, etc.)</li>
            <li>Marketing and advertising partners (with your consent)</li>
            <li>Law enforcement or other authorities when required by law</li>
            <li>Professional advisors such as lawyers, auditors, and insurers</li>
          </ul>
          <p class="mt-2">We do not sell your personal information to third parties.</p>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Your Rights</h2>
          <p>Depending on where you live, you may have certain rights regarding your personal information, including:</p>
          <ul class="list-disc ml-6 mt-1">
            <li>Access to the personal information we hold about you</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing of your data</li>
            <li>Data portability</li>
            <li>Objection to processing of your personal information</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p class="mt-2">To exercise any of these rights, please contact us at hello@kreativekanvas.shop.</p>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Data Security</h2>
          <p>We have implemented appropriate security measures to protect your personal information from accidental loss, unauthorized access, use, alteration, and disclosure. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.</p>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Children's Privacy</h2>
          <p>Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.</p>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date, and the updated version will be effective as soon as it is accessible.</p>
        </section>
        
        <section>
          <h2 class="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          <p class="mt-2">Email: hello@kreativekanvas.shop</p>
          <p>Phone: +2547 4141 4261</p>
          <p>Address: Kitengela, Nairobi Kenya</p>
        </section>
        
        <p class="mt-8 text-sm">Last Updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
section {
  @apply border-b border-gray-200 dark:border-dark-neutral-600 pb-6;
}

section:last-of-type {
  @apply border-b-0;
}
</style>