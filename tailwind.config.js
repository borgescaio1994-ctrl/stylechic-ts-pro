// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Configuração de cores para um visual mais elegante (Ex: Azul Marinho e Dourado)
      colors: {
        'primary-dark': '#002E5C', // Azul Marinho Profundo
        'primary-light': '#E6EBF0', // Cinza Claro Suave
        'accent-gold': '#C8A35C', // Dourado Suave para destaque
      },
      // Configuração das fontes
      fontFamily: {
        // Fonte Serif para Títulos (Elegância)
        heading: ['var(--font-playfair)', 'serif'],
        // Fonte Sans-serif Limpa para Corpo
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;