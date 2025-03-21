/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme colors (60-30-10 rule)
        light: {
          // 60% - Primary/Base colors
          primary: '#FFF5E1',   // Soft cream background
          secondary: '#F8F1E9', // Warmer off-white for secondary areas
          
          // 30% - Secondary colors
          neutral: {
            100: '#F9F9F9', // Nearly white
            200: '#E9E9E9', // Very light gray
            300: '#DADADA', // Light gray
            400: '#BABABA', // Medium light gray
            500: '#9A9A9A', // Medium gray
            600: '#6B6B6B', // Medium dark gray
            700: '#4A4A4A', // Dark gray
            800: '#2C2C2C', // Very dark gray
            900: '#181818', // Nearly black
          },
          
          // 10% - Accent colors
          accent: '#FFD60A',    // Vibrant yellow
          text: {
            primary: '#2A1B3D',  // Deep purple for primary text
            secondary: '#6B4E9B', // Lighter purple for secondary text
          },
        },
        
        // Dark theme colors (60-30-10 rule)
        dark: {
          // 60% - Primary/Base colors
          primary: '#2A1B3D',
          secondary: '#3B2A50',
          
          // 30% - Secondary colors
          neutral: {
            100: '#1A1A1A',
            200: '#2C2C2C',
            300: '#404040',
            400: '#585858',
            500: '#717171',
            600: '#8F8F8F',
            700: '#ADADAD',
            800: '#E5E5E5', // Made lighter for better contrast
            900: '#F8F8F8', // Made lighter for better contrast
          },
          
          // 10% - Accent colors
          accent: '#FFD60A',
          text: {
            primary: '#FFFFFF', // Made pure white for maximum contrast
            secondary: '#E5E5E5', // Made lighter for better visibility
          },
        },
        
        // Common accent colors (consistent across themes)
        accent: {
          primary: '#FFD60A',    // Vibrant yellow - brand primary
          secondary: '#FF69B4',  // Hot pink
          tertiary: '#32CD32',   // Lime green
          quaternary: '#1E90FF', // Bright blue
        },
        
        // Semantic colors for consistent UI patterns
        btn: {
          primary: '#FF8C00',        // Orange for primary buttons
          'primary-hover': '#FF7000', // Darker orange for hover
          'primary-dark': '#FF6000',  // Even darker for dark mode hover
          secondary: '#6B4E9B',      // Purple for secondary buttons
        },
      },
      boxShadow: {
        btn: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'btn-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        btn: '0.375rem',
      },
      transitionProperty: {
        btn: 'background-color, border-color, color, fill, stroke, box-shadow',
      },
      transitionDuration: {
        btn: '200ms',
      },
    },
  },
  plugins: [],
}