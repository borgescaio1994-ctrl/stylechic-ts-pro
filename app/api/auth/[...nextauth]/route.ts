// 📁 app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; 
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; 
import { Role } from "@prisma/client"; 
import bcrypt from 'bcryptjs'; 

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // 1. Provedor Google (para Login Social)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    
    // 2. Provedor Credentials (para Login Manual após Cadastro)
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

          // Retorna o objeto user, que será usado para criar a sessão
          return user; 
        }
    }),
  ],

  session: {
    strategy: "jwt", 
  },
  
  pages: { 
    signIn: '/login', // Redireciona a chamada do NextAuth para nossa página customizada
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: Role }).role; 
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        (session.user as { role: Role }).role = token.role as Role;
      }
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };