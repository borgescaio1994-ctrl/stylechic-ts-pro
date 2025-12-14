// tailwind.config.js
module.exports = {
  content: [
    // Garante que o Tailwind analise todos os arquivos de componentes e páginas
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}