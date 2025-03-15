/**
 * Helper function to handle image paths correctly in both development and production (GitHub Pages)
 * @param {string} path - The path to the image
 * @returns {string} - The corrected image URL
 */
export function getImageUrl(path) {
  const basePath = import.meta.env.BASE_URL || '/';
  
  // Handle external URLs (starting with http or https)
  if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path;
  }

  // For local images, ensure they're correctly prefixed with the base URL
  if (path && path.startsWith('/')) {
    return `${basePath}${path.slice(1)}`;
  }
  
  return path ? `${basePath}${path}` : generatePlaceholder();
}

/**
 * Generate a placeholder image as a data URI
 * @returns {string} - Data URI for a placeholder image
 */
export function generatePlaceholder() {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjYWFhIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
}

/**
 * Vue directive for handling image errors
 */
export const imageErrorDirective = {
  mounted(el) {
    el.onerror = () => {
      el.src = generatePlaceholder();
      el.onerror = null; // Prevent infinite error loops
    };
  }
};
