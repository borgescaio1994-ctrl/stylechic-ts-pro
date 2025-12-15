// 📁 app/api/auth/[...nextauth]/route.ts (Completo e Final)

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// 🛑 NOVO: Importe o CredentialsProvider
import CredentialsProvider from "next-auth/providers/credentials"; 
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; 
import { Role } from "@prisma/client"; 
import bcrypt from 'bcryptjs'; // Importe o bcrypt

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    
    // 🛑 NOVO: Adicione o CredentialsProvider para login manual
    CredentialsProvider({
        name: "E-mail e Senha",
        credentials: {
          email: { label: "E-mail", type: "email" },
          password: { label: "Senha", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            return null;
          }

          // Se for válido, retorna o usuário (o NextAuth usará este objeto)
          return user; 
        }
    }),
  ],

  session: {
    strategy: "jwt", 
  },
  
  pages: { // Redireciona para nossa página customizada
    signIn: '/login', 
  },

  callbacks: {
    // ... (Mantenha os callbacks jwt e session intactos)
    async jwt({ token, user }) {
      if (user) {
        // ... (Mantém o token.role)
        token.role = (user as { role: Role }).role; 
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        // ... (Mantém o session.user.role)
        (session.user as { role: Role }).role = token.role as Role;
      }
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };