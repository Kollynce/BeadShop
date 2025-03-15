<template>
  <nav class="flex mb-4" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li v-for="(item, index) in items" :key="index" class="inline-flex items-center">
        <template v-if="index === 0">
          <router-link :to="item.path" class="inline-flex items-center text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-primary dark:hover:text-accent-primary">
            <HomeIcon class="w-4 h-4 mr-2" />
            {{ item.text }}
          </router-link>
        </template>
        <template v-else>
          <ChevronRightIcon class="w-4 h-4 mx-1 text-light-neutral-400 dark:text-dark-neutral-600" />
          <router-link 
            v-if="item.path"
            :to="item.path"
            class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-primary dark:hover:text-accent-primary"
          >
            {{ item.text }}
          </router-link>
          <span 
            v-else
            class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
          >
            {{ item.text }}
          </span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>
