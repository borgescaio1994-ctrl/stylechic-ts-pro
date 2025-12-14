// 📁 auth.ts (NA RAIZ DO PROJETO)

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers, // Contém GET e POST, necessários no route.ts
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      // Lembre-se de configurar estas variáveis no seu .env.local
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Adicione outros provedores aqui
  ],
  // Você pode adicionar outras configurações aqui, como pages, callbacks, etc.
});