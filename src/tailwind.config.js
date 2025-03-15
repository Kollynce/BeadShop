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
          // ...existing code...
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
          primary: '#FFD60A',
          secondary: '#FF69B4',
          tertiary: '#32CD32',  
          quaternary: '#1E90FF',
        },
        
        //...existing code...
      },
      //...existing code...
    },
  },
  plugins: [],
}