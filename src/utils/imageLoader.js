import { ref } from 'vue';

// Base URL for assets based on deployment environment
const baseUrl = import.meta.env.BASE_URL || '/';

/**
 * Get proper image URL with fallback handling
 * @param {string} path - Image path
 * @returns {string} - Valid image URL
 */
export function getImageUrl(path) {
  // Handle both relative and absolute paths
  if (!path) {
    return new URL('../assets/placeholder.jpg', import.meta.url).href;
  }
  
  if (path.startsWith('http')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Try to use the Vite asset import system
  try {
    return new URL(`../assets/${cleanPath}`, import.meta.url).href;
  } catch (error) {
    // Fallback to public directory
    return `${baseUrl}${cleanPath}`;
  }
}

/**
 * Get URL for public folder images accounting for the base URL
 * @param {string} path - Image path within public folder
 * @returns {string} - Full URL to the public image
 */
export function getPublicImageUrl(path) {
  if (!path) return null;
  
  if (path.startsWith('http')) {
    return path;
  }
  
  // Ensure the path doesn't have a leading slash when combined with baseUrl
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Combine the base URL with the path
  return `${baseUrl}${cleanPath}`;
}

/**
 * Vue composable for image loading with error handling
 * @param {string} src - Initial image source
 * @returns {object} - Image source and error handler
 */
export function useImage(src) {
  const imgSrc = ref(getImageUrl(src));
  
  const handleError = () => {
    imgSrc.value = new URL('../assets/placeholder.jpg', import.meta.url).href;
  };
  
  return {
    imgSrc,
    handleError
  };
}
