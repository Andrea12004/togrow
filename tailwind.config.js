/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flyonui/dist/js/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: `
          -83px 58px 28px 0px rgba(189, 91, 0, 0.00), 
          -53px 37px 26px 0px rgba(189, 91, 0, 0.01), 
          -30px 21px 22px 0px rgba(189, 91, 0, 0.05), 
          -13px 9px 16px 0px rgba(189, 91, 0, 0.09), 
          -3px 2px 9px 0px rgba(189, 91, 0, 0.10)
        `,
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [
    // Otros plugins que uses
    flowbite.plugin(),
  ],
}