// 📁 lib/auth.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Importação NOMEADA da instância do Prisma

// 1. Definição das Opções de Autenticação (Exportação Nomeada)
export const authOptions: NextAuthOptions = {
    // CRÍTICO: Conecta o NextAuth ao Prisma para persistência de dados
    adapter: PrismaAdapter(prisma), 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    // Usar estratégia JWT para sessões no App Router
    session: {
        strategy: "jwt",
    },
    // Opcional: Redirecionamentos personalizados
    // pages: {
    //     signIn: '/auth/signin', 
    //     error: '/auth/error',
    // },
};

// 2. Exportação Padrão dos Route Handlers (Para Next.js App Router)
// O NextAuth usa esta exportação para criar automaticamente os endpoints /api/auth/signin, /api/auth/signout, etc.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };