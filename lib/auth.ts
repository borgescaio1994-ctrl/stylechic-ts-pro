// 📁 lib/auth.ts (CORREÇÃO FINAL DE DUPLICATE EXPORT)

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; 


// 1. Definição das Opções de Autenticação (Exportação Nomeada)
// Esta é a ÚNICA vez que 'authOptions' é exportado.
export const authOptions: NextAuthOptions = { 
    adapter: PrismaAdapter(prisma), 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login', 
    },
};

// 2. Criação do Handler
const handler = NextAuth(authOptions);

// Exporta SOMENTE os handlers (GET/POST). 
export { handler as GET, handler as POST };