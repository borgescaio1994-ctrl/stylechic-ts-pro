// 📁 components/auth/GoogleSignInButton.tsx
"use client"; // <--- ESTA LINHA É ESSENCIAL E RESOLVE O ERRO DE RUNTIME

import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button'; 

/**
 * Componente de cliente que encapsula a lógica de signIn.
 */
export function GoogleSignInButton({ providerId, children }) {
    
    // O evento onClick só pode existir dentro de um Client Component
    const handleSignIn = () => {
        signIn(providerId, { callbackUrl: "/dashboard/barbershops" });
    };

    return (
        <Button
            onClick={handleSignIn} 
            className="w-full justify-center rounded-md border border-brand-accent bg-brand-accent px-4 py-2 text-sm font-medium text-brand-dark shadow-sm hover:bg-brand-accent/90 transition-colors flex items-center"
        >
            <LogIn className="w-5 h-5 mr-2" />
            {children}
        </Button>
    );
}