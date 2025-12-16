// 📁 components/providers/Providers.tsx (CORRIGIDO)

"use client"; // CRÍTICO: Deve ser Client Component

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

// Definição das propriedades (Opcional, mas boa prática)
interface ProvidersProps {
  children: ReactNode;
}

// CRÍTICO: Usamos export default function Providers
// para corresponder ao "import Providers from..." no layout.
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}