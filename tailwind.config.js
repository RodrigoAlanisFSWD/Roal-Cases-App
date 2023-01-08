/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#F6F6F6",
        "primary": "#89A3C6",
        "secondary": "#525252",
        "dark": "#555555",
        "danger": "#FF4B4B",
        "modal": "rgba(255, 255, 255, 0.75)",
        "modalBlack": "rgba(0, 0, 0, 0.5)",
      },
      gridTemplateColumns: {
        "navbar-small": "1fr 80% 1fr",
        "navbar": "repeat(3, 1fr)"
      },
      fontFamily: {
        "vogue": "Vogue"
      },
      animation: {
        "hideMenu": "hideMenu 300ms forwards",
        "showMenu": "showMenu 300ms forwards"
      },
      keyframes: {
        "hideMenu": {
          "from": {
            "opacity": 1,
            "transform": "translateY(0%)"
          },
          "to": {
            "transform": "translateY(-100%)",
            "opacity": 0
          }
        },
        "showMenu": {
          "from": {
            "opacity": 0,
          },
          "to": {
            "transform": "translateY(0%)",
            "opacity": 1
          }
        },
      },
      gridAutoRows: {
        "none": "0px"
      }
    },
  },
  plugins: [],
}