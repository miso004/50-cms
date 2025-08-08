/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': ['Pretendard GOV', 'sans-serif'],
        'sans': ['Pretendard GOV', 'sans-serif'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-out-up': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          }
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-out',
        'fade-out-up': 'fade-out-up 0.2s ease-out'
      }
    },
  },
  plugins: [],
}

