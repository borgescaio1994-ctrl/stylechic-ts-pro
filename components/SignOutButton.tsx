// 📁 components/SignOutButton.tsx
"use client"; // CRÍTICO

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button'; 

export function SignOutButton() {
    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-red-700 hover:bg-red-800 text-white"
        >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
        </Button>
    );
}