/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#005BFC",
        secondary: "#1177CB",
        accent: "#42A5F5",
        "soft-blue": "#B7D5E6",
        "softer-blue": "#D4E2F0",
      },
    },
  },
  plugins: [],
};
