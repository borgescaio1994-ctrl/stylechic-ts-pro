// 📁 types/next-auth.d.ts

import { DefaultSession } from "next-auth";

// Estende a tipagem do NextAuth para incluir a nossa 'role' customizada
declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "CLIENTE"; 
    } & DefaultSession["user"];
  }
}