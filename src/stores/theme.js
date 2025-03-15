import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // Check for system preference or stored preference
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    // Check for system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const theme = ref('light'); // Default to light, will be updated in mounted hook

  // Initialize theme on client-side only (to avoid SSR issues)
  if (typeof window !== 'undefined') {
    theme.value = getInitialTheme();
    applyTheme(theme.value);
  }

  // Watch for changes and update localStorage and DOM
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // Apply theme to document
  function applyTheme(newTheme) {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Toggle theme
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  }

  return {
    theme,
    toggleTheme
  };
});