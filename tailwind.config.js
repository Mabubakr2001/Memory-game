/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "250px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        main: {
          1: "#fff",
          2: "#152938",
          3: "#bcced9",
        },
        secondary: {
          1: "#6395B8",
          2: {
            normal: "#FDA214",
            hov: "#da8d11",
          },
          3: "#DFE7EC",
        },
      },
      fontFamily: {
        sans: ["Atkinson Hyperlegible", "sans-serif"],
      },
      height: {
        105: "530px",
      },
      width: {
        105: "530px",
      },
      borderRadius: {
        circle: "50%",
      },
    },
  },
  plugins: [],
};
