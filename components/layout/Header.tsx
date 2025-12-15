// 📁 components/layout/Header.tsx (Alterado)

import { AuthButton } from '../AuthButton';

export function Header() {
  return (
    // Header escuro e fixo
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 bg-brand-surface shadow-xl border-b border-gray-700">
      
      {/* Logo/Nome da Aplicação com cor de acento dourada */}
      <h1 className="text-2xl font-extrabold text-brand-accent">💅 StyleChic Pro</h1> 
      
      <nav className="flex space-x-6 items-center">
        {/* Links de navegação (futuro) */}
      </nav>
      
      <AuthButton /> 
    </header>
  );
}