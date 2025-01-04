/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        themeBrown: "#af824c",
      },
    },
  },
  plugins: [],
};
