// 📁 types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// 1. Estende o tipo de Sessão (o que você recebe com useSession)
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // <== Adiciona o ID do Prisma ao tipo de usuário da sessão
    } & DefaultSession["user"];
  }
}

// 2. Estende o tipo JWT (usado para adicionar o ID no token, se você usar a estratégia JWT)
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

// 3. Estende o tipo de Usuário (o que você recebe do Prisma no adaptador)
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }
}