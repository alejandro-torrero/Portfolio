/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#000322",
        secondary: "#B9B6CD",
        tertiary: "#082540",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        accent: {
          blue: "#4a77ff",
          cyan: "#00cea8",
          teal: "#14b8a6",
          violet: "#8b5cf6",
          indigo: "#6366f1",
        },
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {        
        "hero-pattern": "url('/src/assets/bg.jpg')",
      },
    },
  },
  plugins: [],
};
