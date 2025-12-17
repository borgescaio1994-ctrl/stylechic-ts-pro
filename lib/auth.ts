// 📁 lib/auth.ts (COMPLETO E CORRIGIDO - ADICIONADO PAGES)

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; 
import { JWT } from "next-auth/jwt";

// CRÍTICO: LISTA DE EMAILS DE ADMINISTRADORES
const ADMIN_EMAILS = ["stylechic1994@gmail.com"]; 

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
    
    // =======================================================
    // CORREÇÃO 1: FORÇAR CALLBACK PARA A PÁGINA DE LOGIN
    // =======================================================
    pages: {
        signIn: '/login',
        // Redireciona o usuário para /login após o sign in bem-sucedido.
        // O código de redirecionamento para /admin/dashboard estará lá.
        error: '/login', // Tratar erros na mesma página
    },
    // =======================================================
    
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;

                // Buscar role do banco
                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: { role: true }
                });
                token.role = dbUser?.role || 'CLIENT';

                if (user.email && ADMIN_EMAILS.includes(user.email)) {
                    token.isAdmin = true;
                    token.role = 'ADMIN'; // Garantir que admin tenha role ADMIN
                } else {
                    // @ts-ignore
                    token.isAdmin = (user as any).isAdmin ?? false;
                }
            }
            return token as JWT;
        },

        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.role = token.role as string;
                session.user.isAdmin = token.isAdmin as boolean;

                if (session.user.email && ADMIN_EMAILS.includes(session.user.email)) {
                    session.user.isAdmin = true;
                }
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };