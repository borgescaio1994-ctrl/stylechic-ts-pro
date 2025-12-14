// src/components/providers/auth-provider.tsx

"use client"

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface AuthProviderProps {
    children: ReactNode
}

/**
 * Componente Provider para disponibilizar o contexto de sessão do NextAuth (Auth.js)
 * para toda a aplicação. Deve ser usado no layout raiz.
 */
export function AuthProvider({ children }: AuthProviderProps) {
    return <SessionProvider>{children}</SessionProvider>
}