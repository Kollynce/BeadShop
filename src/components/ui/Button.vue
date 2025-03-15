<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-btn shadow-btn transition-btn focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        /* Primary button - Orange (10% accent color) */
        'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-500 dark:active:bg-orange-700': variant === 'primary',
        
        /* Secondary button - Neutral (30% secondary color) */
        'bg-light-neutral-200 text-light-neutral-800 hover:bg-light-neutral-300 dark:bg-dark-neutral-700 dark:text-dark-neutral-100 dark:hover:bg-dark-neutral-600': variant === 'secondary',
        
        /* Outline button - Transparent with border */
        'bg-white dark:bg-transparent text-light-text-primary dark:text-dark-text-primary border border-light-neutral-300 dark:border-dark-neutral-600 hover:bg-light-neutral-100 dark:hover:bg-dark-secondary': variant === 'outline',
        
        /* Danger button - Red accent */
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
        
        /* Button sizes */
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
        'w-full': fullWidth,
        'opacity-50 cursor-not-allowed pointer-events-none': disabled
      }
    ]"
  >
    <slot></slot>
  </button>
</template>
