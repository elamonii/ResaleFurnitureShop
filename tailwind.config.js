/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
      themes: [
        {
          recycleFurnitureTheme: {
            "primary": "#4184f0",
            "secondary": "#fa550f",
            "accent": "#faa02a",
            "neutral": "#262c33",
            "base-100": "#e0dddc",
            "info": "#3ABFF8",
            "success": "#36D399",
            "warning": "#FBBD23",
            "error": "#F87272",
          },
        },
      ],
    },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
