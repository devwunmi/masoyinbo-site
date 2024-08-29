import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1C1F41',
          DEFAULT: '#1C1F41', 
          dark: '#000000', 
          lightPink:'#F7E6E6',
        },
        secondary: {
          saffron: '#F9BC33', 
          DEFAULT: '#CB6F35', 
          dark: '#FF3939', 
          cream: '#F5F5F5',
        },
        background: {
          light: '#1C1F41', 
          dark: '#000000', 
        },
        "text": {
          light: '#000000', 
          dark: '#FFFFFF', 
          saffron: '#F9BC33', 
        },
        danger: {
          light: '#FF3939', 
          dark: '#FF3939', 
        },
        success: {
          light: '#006B35', 
          dark: '#006B35', 
        },
      },
      boxShadow: {
        '3xl': '0px 5px 15px rgba(0, 0, 0, 0.35)',
        '4xl': '0px 3px 8px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
