import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      boxShadow: {
        'archi': '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
        'navbar': '0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)'
      },
      colors: {
        'archi-purple': {
          light: "#EDECF9",
          DEFAULT: "#4745C4",
          dark: "#2B2976"
        }
      }
    },
    
  },
  plugins: [],
} satisfies Config;
