// 📁 components/layout/Header.tsx (TENTATIVA FINAL DE LAYOUT)

import { AuthButton } from '../AuthButton';

export function Header() {
  return (
    // Z-index muito alto para garantir que esteja no topo
    <header className="fixed top-0 left-0 right-0 z-[999] flex justify-between items-center p-4 bg-white shadow-md">
      
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-800">💅 StyleChic Pro</h1> 
      </div>
      
      <nav>
        {/* Futuros links de navegação aqui */}
      </nav>
      
      {/* Container com posicionamento relativo, para contexto de layout */}
      <div className="relative"> 
          <AuthButton /> 
      </div>
    </header>
  );
}