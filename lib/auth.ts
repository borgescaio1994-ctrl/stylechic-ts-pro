// 📁 lib/auth.ts

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Importa a instância do Prisma Client
import { db } from "./prisma"; 

const authOptions: AuthOptions = {
  // Conecta o Adapter ao NextAuth
  adapter: PrismaAdapter(db),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "database", // Sessões no banco de dados
    maxAge: 30 * 24 * 60 * 60, 
  },

  // Callbacks para adicionar ID e Role à sessão
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        // Faz o casting para garantir que o 'role' do DB seja lido
        session.user.role = (user as any).role; 
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// EXPORTAÇÃO PADRÃO para ser importada pelo route.ts
export default authOptions;