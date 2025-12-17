// 📁 components/AuthButton.tsx (Alterado)
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Usa classes simples do Tailwind para estilizar
const Button = ({ children, onClick, className }: ButtonProps) => (
    <button 
        onClick={onClick} 
        className={`flex items-center px-4 py-2 rounded font-semibold transition-colors ${className}`}
    >
        {children}
    </button>
);

export const AuthButton = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Button className="bg-gray-700 text-gray-400">Carregando...</Button>;
    }

    // Se estiver logado
    if (session) {
        return (
            <div className="flex items-center space-x-2">
                <Button 
                    onClick={() => signOut()} 
                    // Botão Sair com fundo mais escuro
                    className="bg-red-800 hover:bg-red-700 text-white" 
                >
                    <LogOut className="w-4 h-4 mr-2" /> Sair
                </Button>
            </div>
        );
    }

    // Se não estiver logado
    return (
        <Button 
            onClick={() => signIn()} 
            // Botão Entrar com cor de acento dourada e texto escuro
            className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark" 
        >
            <LogIn className="w-4 h-4 mr-2" /> Entrar
        </Button>
    );
};