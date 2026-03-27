/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#0b1320",
        slate: "#111827",
        accent: "#f97316",
        mint: "#10b981",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 25px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
