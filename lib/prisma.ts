// 📁 lib/prisma.ts (CORRIGIDO)

import { PrismaClient } from "@prisma/client";

// Função para criar uma nova instância do Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declaração global para evitar múltiplas instâncias em ambiente de desenvolvimento
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Cria ou reutiliza a instância do prisma
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = prismaClientSingleton();
} else {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = prismaClientSingleton();
  }
  prisma = globalThis.prismaGlobal;
}

// Exportação nomeada correta
export { prisma };