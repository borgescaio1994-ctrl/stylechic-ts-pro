// 📁 components/layout/Header.tsx (COMPLETO E ATUALIZADO)

"use client";

import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-lg sticky top-0 z-10">
      {/* LOGO/Título */}
      <Link href="/" className="text-2xl font-extrabold text-indigo-700 flex items-center">
        <span className="text-yellow-500 text-4xl mr-2">⭐</span> StyleChic Pro
      </Link>

      {/* Navegação e Botão de Autenticação */}
      <nav>
        {isLoading ? (
          <div className="text-gray-500">Carregando...</div>
        ) : (
          <div>
            {session ? (
              // Se logado: Botão Sair
              <button 
                // Função signOut com callbackUrl para redirecionar diretamente para a Home
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="bg-red-500 text-white px-5 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-150 font-semibold"
              >
                Sair ({session.user.name})
              </button>
            ) : (
              // Se não logado: Botão Entrar
              <Link 
                // Link correto para a página de Sign In
                href="/api/auth/signin" 
                className="bg-indigo-500 text-white px-5 py-2 rounded-xl shadow-md hover:bg-indigo-600 transition duration-150 font-semibold"
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}