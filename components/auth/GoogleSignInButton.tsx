'use client'; 

import { signIn } from "next-auth/react";
import React from 'react';

export function GoogleSignInButton() {
  // A função signIn é a forma recomendada de iniciar o fluxo do NextAuth
  const handleSignIn = () => {
    // 'google' é o ID do provedor que definimos em route.ts
    // callbackUrl: '/' garante que o usuário seja redirecionado para a página inicial após o sucesso
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleSignIn}
      type="button" // Use button, não <a>
      className="w-full flex justify-center items-center py-3 px-4 mb-6 border border-gray-300 rounded-lg shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
    >
      {/* O ícone precisa estar na pasta public/google.svg para evitar o erro 404 */}
      <img src="/google.svg" alt="Google" className="w-5 h-5 mr-3" />
      Continuar com Google
    </button>
  );
}