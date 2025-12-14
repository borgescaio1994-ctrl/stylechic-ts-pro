// 📁 components/providers/Providers.tsx
"use client"; // CRÍTICO: Indica que este é um componente de cliente

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// Este componente é o wrapper de todos os contextos de cliente
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}