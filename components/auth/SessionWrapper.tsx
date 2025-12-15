// components/auth/SessionWrapper.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// Este componente é um Client Component devido ao 'use client' e ao SessionProvider
export function SessionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}