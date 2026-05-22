/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive'],
      },
      colors: {
        brand: {
          light: '#FF9B7A',
          DEFAULT: '#FF4B1F',
          dark: '#FF6B35'
        },
        dark: {
          DEFAULT: '#1a1a1a',
          footer: '#1a0a00',
          gradient: '#3d1400'
        },
        bg: {
          DEFAULT: '#faf9f7',
          card: '#f5f5f0'
        }
      }
    },
  },
  plugins: [],
}
