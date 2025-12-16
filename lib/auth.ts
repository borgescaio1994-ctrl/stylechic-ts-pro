// 📁 lib/auth.ts (FINAL COM CHECK ADMIN POR EMAIL E CALLBACKS)

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; 
import { JWT } from "next-auth/jwt";

// =======================================================
// CRÍTICO: LISTA DE EMAILS DE ADMINISTRADORES
// EMAIL DO USUÁRIO ADICIONADO: stylechic1994@gmail.com
// =======================================================
const ADMIN_EMAILS = ["stylechic1994@gmail.com"]; 

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    // Estratégia JWT é necessária para usar callbacks
    session: {
        strategy: "jwt",
    },
    
    callbacks: {
        // 1. Adiciona o ID, Nome e Status Admin ao token JWT (lido no primeiro login)
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; 
                token.name = user.name; 
                
                // Força o status Admin se o email estiver na lista
                if (user.email && ADMIN_EMAILS.includes(user.email)) {
                    token.isAdmin = true;
                } else {
                    // Caso contrário, usa o valor do DB (se existir)
                    // @ts-ignore
                    token.isAdmin = (user as any).isAdmin ?? false;
                }
            }
            return token as JWT; 
        },
        
        // 2. Adiciona o ID, Nome e Status Admin do token JWT de volta à sessão (lido pelo getServerSession)
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string; 
                session.user.name = token.name as string; 
                session.user.isAdmin = token.isAdmin as boolean; 

                // Reforça o check no caso de atualização da lista de emails
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