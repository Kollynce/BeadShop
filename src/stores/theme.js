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
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only change theme if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        theme.value = e.matches ? 'dark' : 'light';
      }
    });
  }

  // Watch for changes and update localStorage and DOM
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // Apply theme to document
  function applyTheme(newTheme) {
    // Apply with transition effect
    if (newTheme === 'dark') {
      document.documentElement.classList.add('theme-transition');
      document.documentElement.classList.add('dark');
      
      // Remove the transition class after the transition completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 300);
    } else {
      document.documentElement.classList.add('theme-transition');
      document.documentElement.classList.remove('dark');
      
      // Remove the transition class after the transition completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 300);
    }
    
    // Update meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        newTheme === 'dark' ? '#2A1B3D' : '#FFF5E1'
      );
    }
  }

  // Toggle theme
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  }
  
  // Set a specific theme
  function setTheme(newTheme) {
    if (newTheme === 'light' || newTheme === 'dark') {
      theme.value = newTheme;
    }
  }
  
  // Reset to system preference
  function resetToSystemPreference() {
    localStorage.removeItem('theme');
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return {
    theme,
    toggleTheme,
    setTheme,
    resetToSystemPreference
  };
});