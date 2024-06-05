/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1171c0',
        secondary: '#1177CB',
        accent: '#42A5F5',
        'soft-blue': '#B7D5E6',
        'softer-blue': '#D4E2F0',
        'gray-primary': '#787676',
      },
      borderRadius: {
        '16px': '16px',
        '24px': '24px',
        '32px': '32px',
      },
      fontSize: {
        '18px': '18px',
      },
      height: {
        86: '362px',
      },
      boxShadow: {
        'shadow-c-primary': '0px 0px 4px 0px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        header: "url('/assets/images/header_background.png')",
      },
    },
  },
  plugins: [],
}
