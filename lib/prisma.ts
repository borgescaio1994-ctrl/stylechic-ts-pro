// 📁 lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// CRÍTICO: Define o tipo global para evitar erro de TypeScript no ambiente de desenvolvimento
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 1. Usa a instância global se existir (no desenvolvimento), ou cria uma nova
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Opcional: Ativa logs de query para depuração
    log:
      process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// 2. Se não estiver em produção, salva a nova instância no objeto global
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Exporta a instância nomeada 'prisma' (usada pelo NextAuth Adapter) e a exportação default
export default prisma;