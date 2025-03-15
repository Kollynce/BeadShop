/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Light theme colors (60-30-10 rule)
        light: {
          // 60% - Primary/Base colors
          primary: '#FFF5E1', // Light Peach background
          secondary: '#F8F1E9', // Off-White for contrast areas
          
          // 30% - Secondary colors
          neutral: {
            100: '#F9F9F9',
            200: '#E9E9E9',
            300: '#DADADA',
            400: '#BABABA',
            500: '#9A9A9A',
            600: '#6B6B6B',
            700: '#4A4A4A',
            800: '#2C2C2C',
            900: '#181818',
          },
          
          // 10% - Accent colors
          accent: '#FFD60A', // Yellow accent
          text: {
            primary: '#2A1B3D', 
            secondary: '#6B4E9B',
          },
        },
        
        // Dark theme colors (60-30-10 rule)
        dark: {
          // 60% - Primary/Base colors
          primary: '#2A1B3D', // Deep Purple background
          secondary: '#3B2A50', // Medium Purple for contrast areas
          
          // 30% - Secondary colors
          neutral: {
            100: '#1A1A1A',
            200: '#2C2C2C',
            300: '#404040',
            400: '#585858',
            500: '#717171',
            600: '#8F8F8F',
            700: '#ADADAD',
            800: '#CFCFCF',
            900: '#F0F0F0',
          },
          
          // 10% - Accent colors
          accent: '#FFD60A', // Yellow accent stays consistent
          text: {
            primary: '#F8F1E9',
            secondary: '#DADADA',
          },
        },
        
        // Common accent colors (consistent across themes)
        accent: {
          primary: '#FFD60A', // Yellow (main accent)
          secondary: '#FF69B4', // Pink
          tertiary: '#32CD32', // Green  
          quaternary: '#1E90FF', // Blue
        },
        
        // Orange color palette for buttons
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Primary orange
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        
        // Functional button colors
        'btn-primary': '#F97316', // Orange 500
        'btn-primary-hover': '#EA580C', // Orange 600
        'btn-primary-dark': '#C2410C', // Orange 700
      },
      scale: {
        '102': '1.02'
      },
      borderRadius: {
        'btn': '0.375rem', // 6px
      },
      boxShadow: {
        'btn': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'btn-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      transitionProperty: {
        'btn': 'background-color, border-color, color, fill, stroke, box-shadow',
      }
    },
  },
  plugins: [],
}
