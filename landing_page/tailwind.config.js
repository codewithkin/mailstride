/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F80ED',
        secondary: '#1E293B',
        accent: '#FACC15',
        background: '#F8FAFC',
      },
      fontFamily: {
        'oswald': ['var(--font-oswald)'],
        'dm-sans': ['var(--font-dm-sans)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.border-gradient-br-blue-indigo': {
          borderImage: 'linear-gradient(to bottom right, #60A5FA, #6366F1) 1',
        },
        '.border-gradient-br-purple-pink': {
          borderImage: 'linear-gradient(to bottom right, #A855F7, #EC4899) 1',
        },
        '.border-gradient-br-gray-slate': {
          borderImage: 'linear-gradient(to bottom right, #9CA3AF, #64748B) 1',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 