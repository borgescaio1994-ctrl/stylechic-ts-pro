// 📁 components/AuthButton.tsx
'use client'; 

import { signIn, signOut, useSession } from 'next-auth/react';
// Adapte o import abaixo se seu botão estiver em outra pasta ou tiver outro nome!
import { Button } from '@/components/ui/button'; 
import { LogIn, LogOut, User } from 'lucide-react'; 

export const AuthButton = () => {
  const { data: session, status } = useSession();

  // 1. Loading
  if (status === 'loading') {
    return <div className="text-gray-500">Carregando...</div>;
  }

  // 2. Logado (Mostrar LogOut e Nome)
  if (session) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 flex items-center">
          <User className="w-5 h-5 mr-1 text-pink-600" />
          Olá, {session.user?.name?.split(' ')[0]}
        </span>
        <button 
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white flex items-center px-3 py-2 rounded-full transition duration-300"
        >
          <LogOut className="w-4 h-4 mr-1" /> Sair
        </button>
      </div>
    );
  }

  // 3. Deslogado (Mostrar Login)
  return (
    <button 
      onClick={() => signIn('google')} 
      className="bg-pink-600 hover:bg-pink-700 text-white flex items-center px-4 py-2 rounded-full transition duration-300"
    >
      <LogIn className="w-5 h-5 mr-1" /> Login
    </button>
  );
};