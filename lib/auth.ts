// 📁 lib/auth.ts (FINAL E CORRIGIDO - COM CALLBACKS JWT)

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; 
import { JWT } from "next-auth/jwt";

// 1. Definição das Opções de Autenticação
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    // Usar estratégia JWT é obrigatório para os callbacks funcionarem
    session: {
        strategy: "jwt",
    },
    
    // =======================================================
    // CORREÇÃO: INJETANDO O ID DO PRISMA NO JWT/SESSION
    // =======================================================
    callbacks: {
        // 1. Adiciona o ID do usuário (vindo do Prisma) ao token JWT
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Adiciona o id ao token
            }
            return token as JWT; 
        },
        
        // 2. Adiciona o ID do token JWT de volta à sessão (lido pelo getServerSession)
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string; // Lê o id do token
            }
            return session;
        },
    },
    // =ERROS DE TIPAGEM NO PRISMA/NEXTAUTH (RESOLVIDO PELO types/next-auth.d.ts)=
};

// 2. Criação e Exportação dos Route Handlers
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };