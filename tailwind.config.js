/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gray: {
          950: '#030712',
        },
        surface: {
          DEFAULT: '#0a0a12',
          light: '#0f0f1a',
          lighter: '#14142a',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
    },
  },
  plugins: [],
};
