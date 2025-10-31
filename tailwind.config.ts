import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT:"#0ea5a4", dark:"#0b7c7b", light:"#5fd3d3" },
        gold: { DEFAULT: "#ffd700", light: "#ffed4e", dark: "#b8860b" }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-slow': 'bounce 2s infinite'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [],
}
export default config
