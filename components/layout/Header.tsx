// 📁 components/layout/Header.tsx (ATUALIZADO COM NAVEGAÇÃO COMPLETA)

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// Assumindo que o AuthButton existe e lida com o logout/avatar
import { AuthButton } from "../AuthButton";
import Link from "next/link";

export const Header = async () => {
  // Lê a sessão do lado do servidor
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-brand-dark p-4 shadow-md">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        {/* Logo/Título */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-brand-accent hover:text-brand-text transition-colors">
            StyleChic Pro
          </Link>
        </div>

        {/* Navegação */}
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="text-brand-text hover:text-brand-accent transition-colors">Home</a>
          <a href="#servicos" className="text-brand-text hover:text-brand-accent transition-colors">Serviços</a>
          <a href="#barbeiros" className="text-brand-text hover:text-brand-accent transition-colors">Barbeiros</a>
          <a href="#galeria" className="text-brand-text hover:text-brand-accent transition-colors">Galeria</a>
          <a href="#contato" className="text-brand-text hover:text-brand-accent transition-colors">Contato</a>
        </nav>

        {/* Informação do Usuário e AuthButton */}
        <div className="flex items-center space-x-4">
          {session ? (
            // CORREÇÃO: Exibir o nome da sessão
            <div className="text-sm text-brand-text mr-4 hidden sm:block">
              Olá, <span className="font-semibold">{session.user.name || session.user.email}</span>
            </div>
          ) : null}

          <AuthButton />
        </div>
      </div>
    </header>
  );
};