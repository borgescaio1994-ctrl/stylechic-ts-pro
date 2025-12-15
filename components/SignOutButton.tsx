// 📁 components/SignOutButton.tsx
"use client";

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
// Importa o componente Button que você já configurou (shadcn/ui style)
import { Button } from '@/components/ui/button'; 

/**
 * Componente de cliente que chama a função signOut do NextAuth.
 */
export function SignOutButton() {
    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/' })}
            // Usando cores escuras/vermelhas para Logout
            className="bg-red-700 hover:bg-red-800 text-white"
        >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
        </Button>
    );
}