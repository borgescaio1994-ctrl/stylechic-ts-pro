// 📁 types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// 1. Augmentação da Sessão (O que getServerSession lê)
declare module "next-auth" {
  /**
   * Extende a sessão para incluir a ID do usuário (vindo do Prisma/Adapter).
   */
  interface Session {
    user: {
      id: string; // <-- CRÍTICO: Define que o user sempre terá um ID.
    } & DefaultSession["user"];
  }
}

// 2. Augmentação do JWT (O token que trafega a informação)
declare module "next-auth/jwt" {
  /**
   * Extende o JWT para incluir a ID do usuário.
   */
  interface JWT extends DefaultJWT {
    id: string; // <-- CRÍTICO: Define que o token terá um ID.
  }
}