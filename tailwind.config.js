/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3c7',
          100: '#fde68a', 
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Mr. Rossi inspired colors
        happiness: {
          yellow: '#fbbf24',
          orange: '#f59e0b',
          red: '#ea580c',
          pink: '#ec4899',
          purple: '#8b5cf6',
          blue: '#3b82f6',
          green: '#10b981',
        },
        // Italian sunset palette
        sunset: {
          cream: '#fef3c7',
          peach: '#fed7aa',
          coral: '#fecaca',
          rose: '#fda4af',
          lavender: '#e9d5ff',
        }
      },
      fontFamily: {
        comic: ['Comic Sans MS', 'Chalkboard SE', 'Comic Neue', 'cursive'],
        primary: ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'happiness-float': 'happiness-float 3s ease-in-out infinite',
        'joy-bounce': 'joy-bounce 2s infinite',
        'whimsy-wiggle': 'whimsy-wiggle 2s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-gentle': 'bounce 2s infinite',
      },
      keyframes: {
        'happiness-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        'joy-bounce': {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0px)' },
          '40%, 43%': { transform: 'translateY(-10px)' },
          '70%': { transform: 'translateY(-5px)' },
        },
        'whimsy-wiggle': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'happiness': '0 10px 30px rgba(245, 158, 11, 0.3)',
        'joy': '0 15px 35px rgba(234, 88, 12, 0.2)',
        'magic': '0 20px 40px rgba(139, 92, 246, 0.3)',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '5': '5deg',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}