/**
 * Helper function to handle image paths correctly in both development and production (GitHub Pages)
 * @param {string} path - The path to the image
 * @returns {string} - The corrected image URL
 */
export function getImageUrl(path) {
  const basePath = import.meta.env.BASE_URL || '/';
  
  // Handle external URLs
  if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path;
  }

  // For local images
  if (path && path.startsWith('/')) {
    return `${basePath}${path.slice(1)}`;
  }
  
  return path ? `${basePath}${path}` : generatePlaceholder();
}

/**
 * Generate SVG placeholder as a data URI
 */
export function generatePlaceholder() {
  return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+CiAgPHJlY3QgZmlsbD0iI2YwZjBmMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiLz4KICA8dGV4dCBmaWxsPSIjODg4ODg4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjEwMCIgeT0iMTA1Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+CiAgPGcgc3Ryb2tlPSIjODg4ODg4IiBzdHJva2Utd2lkdGg9IjIiPgogICAgPHJlY3QgeD0iNjAiIHk9IjUwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9Im5vbmUiLz4KICAgIDxsaW5lIHgxPSI2MCIgeTE9IjUwIiB4Mj0iMTQwIiB5Mj0iMTEwIi8+CiAgICA8bGluZSB4MT0iMTQwIiB5MT0iNTAiIHgyPSI2MCIgeTI9IjExMCIvPgogIDwvZz4KPC9zdmc+';
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
