// 📁 tailwind.config.js 
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRÍTICO: Mapeamento de todos os arquivos
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // PALETA DARK/GOLD REVISADA
      colors: { 
        'brand-dark': '#1C1C1C',      // Quase Preto (Fundo Principal)
        'brand-surface': '#2C2C2C',   // Superfícies e Cards
        'brand-accent': '#FFD700',    // Dourado (Botões e Destaques)
        'brand-text': '#E0E0E0',      // Texto Claro
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}