// 📁 components/providers/Providers.tsx

"use client";

import { AuthProvider } from "./auth-provider"; // Importa o componente nomeado

// Componente que agrupa todos os providers
// Note que este é um *default export*, que é o que layout.tsx espera
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {/* Adicione outros providers aqui, como Toaster/Theme Provider, se necessário */}
      {children}
    </AuthProvider>
  );
}