<template>
  <div class="bg-light-primary dark:bg-dark-primary min-h-screen">
    <!-- Hero section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 fade-in">
        <img
          src="/images/Neeon Moon 1.jpeg"
          alt="Jewelry crafting"
          class="h-full w-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gray-900 opacity-60"></div>
      </div>
      <div class="relative px-6 py-32 sm:py-40 lg:px-8">
        <div class="mx-auto max-w-2xl text-center slide-up">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Beabed Art</h1>
          <p class="mt-6 text-lg leading-8 text-white">Crafting uniquely beautiful jewelry to celebrate life's special moments</p>
        </div>
      </div>
    </div>

    <!-- Our story section -->
    <div class="overflow-hidden bg-light-secondary dark:bg-dark-secondary py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4 slide-up" style="animation-delay: 0.3s">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-accent-primary">Our Story</h2>
              <p class="mt-2 text-3xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl">Handcrafted with passion</p>
              <p class="mt-6 text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary">
                Beabed Art was born from a simple love of creating beautiful things. What started as a hobby in a small home workshop has grown into a passionate pursuit of craftsmanship and artistic expression.
              </p>
              <p class="mt-6 text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary">
                Every piece in our collection is handcrafted with meticulous attention to detail, using traditional techniques passed down through generations alongside innovative modern approaches.
              </p>
              <p class="mt-6 text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary">
                We believe jewelry should be as unique as the person wearing it, telling a story and creating a connection that lasts a lifetime.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80"
            alt="Jewelry making process"
            class="slide-in-right w-[48rem] max-h-[30rem] object-cover rounded-xl shadow-xl ring-1 ring-light-neutral-300 dark:ring-dark-neutral-700 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            style="animation-delay: 0.6s"
            width="2432"
            height="1442"
          />
        </div>
      </div>
    </div>

    <!-- Values section -->
    <div class="bg-light-primary dark:bg-dark-primary py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center slide-up" style="animation-delay: 0.3s">
          <h2 class="text-base font-semibold leading-7 text-accent-primary">Our Values</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl">
            What guides our craft
          </p>
          <p class="mt-6 text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary">
            At Beabed Art, these principles guide everything we do, from design to customer service.
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div v-for="(value, index) in values" 
                 :key="index" 
                 class="relative pl-16 stagger-item" 
                 :style="{ animationDelay: `${0.3 + index * 0.2}s` }">
              <dt class="text-base font-semibold leading-7 text-light-text-primary dark:text-dark-text-primary">
                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary">
                  <component :is="value.icon" class="h-6 w-6 text-light-text-primary dark:text-dark-text-primary" />
                </div>
                {{ value.title }}
              </dt>
              <dd class="mt-2 text-base leading-7 text-light-text-secondary dark:text-dark-text-secondary">
                {{ value.description }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    
    <!-- Team section -->
    <div class="bg-light-secondary dark:bg-dark-secondary py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 slide-up" style="animation-delay: 0.3s">
          <h2 class="text-3xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl">Our Team</h2>
          <p class="mt-6 text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary">
            Meet the creative minds and skilled hands behind every Beabed Art creation.
          </p>
        </div>
        <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <li v-for="(member, index) in team" 
              :key="member.name" 
              class="group stagger-item" 
              :style="{ animationDelay: `${0.5 + index * 0.2}s` }">
            <img :class="['aspect-[3/2] w-full rounded-2xl object-cover transition-all duration-300 group-hover:opacity-90', 
              'ring-1 ring-light-neutral-300 dark:ring-dark-neutral-700']" 
              :src="member.image" :alt="member.name" />
            <div class="mt-6">
              <h3 class="text-lg font-semibold leading-8 tracking-tight text-light-text-primary dark:text-dark-text-primary">{{ member.name }}</h3>
              <p class="text-base leading-7 text-accent-primary">{{ member.role }}</p>
              <p class="mt-4 text-base leading-7 text-light-text-secondary dark:text-dark-text-secondary">{{ member.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Call to action section -->
    <div class="bg-light-primary dark:bg-dark-primary">
      <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div class="relative isolate overflow-hidden bg-accent-primary px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 fade-in" style="animation-delay: 0.3s">
          <svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stop-color="#7775D6" />
                <stop offset="1" stop-color="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 class="text-3xl font-bold tracking-tight text-light-text-primary sm:text-4xl">Visit Our Workshop</h2>
            <p class="mt-6 text-lg leading-8 text-light-text-primary/80">
              See our jewelry making process firsthand and discuss custom pieces with our designers.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <RouterLink to="/contact" 
                class="rounded-btn bg-btn-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-btn hover:bg-btn-primary-hover hover:shadow-btn-hover transition-btn">
                Schedule a Visit
              </RouterLink>
              <RouterLink to="/products" 
                class="text-sm font-semibold leading-6 text-light-text-primary hover:text-accent-secondary transition-colors">
                Shop Our Collection <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </div>
          <div class="relative my-8">
            <img 
              class="w-[48rem] max-h-[30rem] object-cover rounded-xl shadow-xl 
                ring-1 ring-light-neutral-300 dark:ring-dark-neutral-700 
                sm:w-[57rem] md:-ml-4 lg:-ml-0" 
              src="/images/Golden black.jpeg" 
              alt="Jewelry workshop" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineComponent } from 'vue';
import { onMounted } from 'vue';

// Add intersection observer to handle animations
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = 'visible';
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all animated elements
  document.querySelectorAll('.fade-in, .slide-up, .slide-in-right, .stagger-item').forEach(el => {
    el.style.visibility = 'hidden';
    observer.observe(el);
  });
});

// Values data
const values = [
  {
    title: 'Quality Craftsmanship',
    description: 'Every piece is crafted to the highest standards, using premium materials and meticulous attention to detail.',
    icon: defineComponent({
      template: `
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
        </svg>
      `
    })
  },
  {
    title: 'Artistic Innovation',
    description: 'We blend traditional techniques with contemporary design to create unique pieces that stand out.',
    icon: defineComponent({
      template: `
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      `
    })
  },
  {
    title: 'Personalized Experience',
    description: 'We believe in creating personal connections with our customers and offering jewelry that tells their unique story.',
    icon: defineComponent({
      template: `
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      `
    })
  },
  {
    title: 'Sustainable Practices',
    description: `We're committed to environmentally responsible practices, from ethically sourced materials to eco-friendly packaging.`,
    icon: defineComponent({
      template: `
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
        </svg>
      `
    })
  },
];

// Team data
const team = [
  {
    name: 'Emma Anderson',
    role: 'Founder & Lead Designer',
    description: 'Emma brings over 15 years of jewelry design experience and a passion for creating pieces that tell stories.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1061&q=80'
  },
  {
    name: 'Daniel Martinez',
    role: 'Master Craftsman',
    description: 'Daniel\'s precision and attention to detail ensure that every piece meets our exacting quality standards.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Sophia Chen',
    role: 'Materials Specialist',
    description: 'Sophia sources the finest materials from around the world, ensuring both quality and ethical practices.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=928&q=80'
  },
];
</script>

<style scoped>
.transition-btn {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation classes */
.fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

.stagger-item {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
