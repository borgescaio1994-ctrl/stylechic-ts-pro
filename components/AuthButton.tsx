// 📁 components/AuthButton.tsx

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, LogIn } from "lucide-react";

export function AuthButton() {
  // Use o hook para obter o status da sessão e os dados do usuário
  const { data: session, status } = useSession();

  // 1. Estado de Carregamento (Inicial)
  if (status === "loading") {
    return (
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg cursor-not-allowed">
        Carregando...
      </button>
    );
  }

  // 2. Estado Autenticado (Logado)
  if (status === "authenticated") {
    const user = session.user;

    return (
      <div className="flex items-center space-x-3">
        {/* Exibe o Avatar e Nome do Usuário */}
        <div className="flex items-center space-x-2">
          <Avatar>
            {/* Usa a imagem do Google, se disponível */}
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User Avatar"} />
            {/* Fallback para o nome (primeira letra) */}
            <AvatarFallback>{user.name ? user.name[0] : 'U'}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            {/* Exibe o nome ou email, se o nome não estiver disponível */}
            Olá, {user.name || user.email}!
          </span>
        </div>

        {/* Botão Sair */}
        <button
          onClick={() => signOut()}
          className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut size={16} className="mr-2" />
          Sair
        </button>
      </div>
    );
  }

  // 3. Estado Não Autenticado (Deslogado)
  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
    >
      <LogIn size={16} className="mr-2" />
      Entrar
    </button>
  );
}