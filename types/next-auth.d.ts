// 📁 types/next-auth.d.ts (CORRIGIDO PARA TIPAR NOME E isAdmin)

import NextAuth, { DefaultSession, DefaultUser, JWT as DefaultJWT } from "next-auth";

declare module "next-auth" {
  /**
   * Extends module NextAuth to add custom properties to the session.
   */
  interface Session {
    user: {
      id: string; 
      isAdmin: boolean; // ADICIONADO: Status Admin
    } & DefaultSession["user"];
  }

  /**
   * Extends the built-in User type to include custom fields from your database.
   */
  interface User extends DefaultUser {
    id: string; 
    isAdmin: boolean; // ADICIONADO: Status Admin
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends module next-auth/jwt to add custom properties to the JWT token.
   */
  interface JWT extends DefaultJWT {
    id: string;
    isAdmin: boolean; // ADICIONADO: Status Admin
  }
}