// 📁 components/layout/Header.tsx (CORRIGIDO PARA EXIBIR NOME)

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
// Assumindo que o AuthButton existe e lida com o logout/avatar
import { AuthButton } from "../AuthButton"; 

export const Header = async () => {
  // Lê a sessão do lado do servidor
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-brand-dark p-4 shadow-md">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        {/* Logo/Título */}
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-brand-accent">StyleChic Pro</span>
        </div>

        {/* Informação do Usuário e AuthButton */}
        <div className="flex items-center space-x-4">
          {session ? (
            // CORREÇÃO: Exibir o nome da sessão
            <div className="text-sm text-brand-text-light mr-4 hidden sm:block">
              Olá, <span className="font-semibold">{session.user.name || session.user.email}</span>
            </div>
          ) : null}
          
          <AuthButton /> 
        </div>
      </div>
    </header>
  );
};