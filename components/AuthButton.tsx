// 📁 components/AuthButton.tsx
"use client"; // <--- ESSENCIAL PARA USAR useSession, signIn, signOut

import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react"; 

// Usa classes simples do Tailwind para estilizar
const Button = ({ children, onClick, className }) => (
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
        return <Button className="bg-gray-300 text-gray-600">Carregando...</Button>;
    }

    // Se estiver logado
    if (session) {
        return (
            <div className="flex items-center space-x-2">
                <Button 
                    onClick={() => signOut()} 
                    className="bg-red-500 hover:bg-red-600 text-white"
                >
                    <LogOut className="w-4 h-4 mr-2" /> Sair
                </Button>
            </div>
        );
    }

    // Se não estiver logado
    return (
        <Button 
            onClick={() => signIn("google")} // Chama o login
            className="bg-blue-600 hover:bg-blue-700 text-white"
        >
            <LogIn className="w-4 h-4 mr-2" /> Entrar
        </Button>
    );
};