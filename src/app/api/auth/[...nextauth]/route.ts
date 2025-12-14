// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import { PrismaClient } from "@prisma/client"

// 1. Inicializa o cliente Prisma
// Uma boa prática para evitar instanciar múltiplas vezes em desenvolvimento
const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// 2. Define as opções de configuração
export const authOptions: NextAuthOptions = {
    // Adapter para conectar NextAuth ao Prisma
    adapter: PrismaAdapter(prisma), 
    
    // Provedores de Autenticação
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        // Futuramente, podemos adicionar:
        // GitHubProvider({ ... }),
        // GoogleProvider({ ... }),
    ],

    // Configuração de Sessão (Usando JWT para escalar melhor)
    session: {
        strategy: "jwt",
    },

    // Páginas customizadas (Vamos criar depois)
    pages: {
        signIn: '/login',
        verifyRequest: '/login/verificar-email',
        // error: '/auth/error', 
    },

    // JWT Callback para incluir o ID do usuário no token
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id
            }
            return token
        },
        async session({ session, token }) {
            // Adiciona o userId da JWT para o objeto de sessão
            if (token.userId) {
                session.user.id = token.userId as string
            }
            return session
        }
    },
    
    // Variável de ambiente obrigatória
    secret: process.env.NEXTAUTH_SECRET,
}

// 3. Cria o handler de requisições
const handler = NextAuth(authOptions)

// 4. Exporta para as rotas GET e POST
export { handler as GET, handler as POST }