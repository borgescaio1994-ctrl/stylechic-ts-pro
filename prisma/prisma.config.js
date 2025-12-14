// 📁 prisma.config.js
// -----------------------------------------------------

const { defineConfig } = require('prisma');

module.exports = defineConfig({
  datasources: {
    db: {
      provider: 'postgresql',
      // Aqui informamos ao Prisma onde buscar a URL do banco de dados
      url: process.env.DATABASE_URL,
    },
  },
});