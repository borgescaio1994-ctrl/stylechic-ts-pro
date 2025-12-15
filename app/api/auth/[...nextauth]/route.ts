// 📁 app/api/auth/[...nextauth]/route.ts (Código COMPLETO e FUNCIONAL)

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"; 
import CredentialsProvider from "next-auth/providers/credentials"; // Reabilitado para login manual
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; 
// Linha 8 corrigida para usar 'bcryptjs' que foi instalado:
import * as bcrypt from 'bcryptjs'; 

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        // 1. Provedor Google 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent", 
                    access_type: "offline" 
                }
            }
        }),
        
        // 2. Provedor de Credenciais (Login Manual)
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    return null;
                }

                // Comparação da senha criptografada usando bcryptjs
                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    return null;
                }

                // Retorna o objeto user
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            }
        })
    ],

    session: {
        strategy: "jwt", 
    },
    
    pages: { 
        signIn: '/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Adiciona a role do usuário no token JWT
                token.role = (user as { role: string }).role; 
            }
            return token;
        },
        
        async session({ session, token }) {
            if (token) {
                // Adiciona a role do token JWT na sessão do usuário
                (session.user as { role: string }).role = token.role as string;
            }
            return session;
        },
    },
    
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };