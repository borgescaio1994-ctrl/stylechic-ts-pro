// 📁 app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// 🛑 Importação corrigida: usando { prisma }
import { prisma } from "@/lib/prisma"; 
import { Role } from "@prisma/client"; 

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // Essencial para usar callbacks com o App Router
  session: {
    strategy: "jwt", 
  },

  callbacks: {
    // 1. Injeta a ROLE do Banco de Dados no JWT Token
    async jwt({ token, user }) {
      if (user) {
        // user é o objeto retornado pelo adaptador do Prisma, que contém a role
        token.role = (user as { role: Role }).role; 
      }
      return token;
    },
    
    // 2. Injeta a ROLE do JWT Token na Sessão
    async session({ session, token }) {
      if (token) {
        // A sessão é lida pelo useSession() no lado do cliente
        (session.user as { role: Role }).role = token.role as Role;
      }
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };