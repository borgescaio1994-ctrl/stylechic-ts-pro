// 📁 components/providers/Providers.tsx
"use client"; // CRÍTICO: Deve ser Cliente para usar SessionProvider

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// Export default para corresponder ao import Providers from no layout
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}