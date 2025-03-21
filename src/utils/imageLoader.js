import { ref } from 'vue';

// Base URL for assets based on deployment environment
const baseUrl = import.meta.env.BASE_URL || '/';

/**
 * Process base64 encoded images
 * @param {string} url - Potentially base64 encoded image URL
 * @returns {string} - Properly formatted image URL
 */
function processBase64Image(url) {
  if (!url) return null;
  
  // Handle base64 images with the "base64://" prefix
  if (typeof url === 'string' && url.startsWith('base64://')) {
    // Get the actual base64 data after the prefix
    const base64Data = url.replace('base64://', '');
    
    // Check if it already has a data URI prefix
    if (base64Data.startsWith('data:')) {
      return base64Data;
    } else {
      // Add the proper data URI prefix if missing
      return `data:image/jpeg;base64,${base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')}`;
    }
  }
  
  // Handle direct base64 data
  if (typeof url === 'string' && (url.startsWith('data:image/') || url.indexOf(';base64,') !== -1)) {
    return url;
  }
  
  return url;
}

/**
 * Get proper image URL with fallback handling
 * @param {string} path - Image path
 * @returns {string} - Valid image URL
 */
export function getImageUrl(path) {
  // First check if it's a base64 encoded image
  const processedBase64 = processBase64Image(path);
  if (processedBase64 !== path) {
    return processedBase64;
  }
  
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
  // Check for base64 images first
  const processedBase64 = processBase64Image(path);
  if (processedBase64 !== path) {
    return processedBase64;
  }
  
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
  // Process base64 images before setting the source
  const imgSrc = ref(getImageUrl(src));
  
  const handleError = () => {
    console.error('Image failed to load:', src);
    imgSrc.value = new URL('../assets/placeholder.jpg', import.meta.url).href;
  };
  
  return {
    imgSrc,
    handleError
  };
}
