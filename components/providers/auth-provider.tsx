// 📁 components/providers/index.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

// Define a tipagem das propriedades
interface AuthProviderProps {
  children: ReactNode;
}

// O componente AuthProvider envolve a aplicação com o SessionProvider do NextAuth
// Note a exportação nomeada (named export)
export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}