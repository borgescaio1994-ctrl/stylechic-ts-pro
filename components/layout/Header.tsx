// 📁 components/layout/Header.tsx

import { AuthButton } from '../AuthButton'; 

export function Header() {
  return (
    // Aumentamos o z-index para garantir que esteja acima de TUDO
    // e usamos um 'min-w-full' explícito para clareza.
    <header className="fixed top-0 left-0 right-0 z-50 min-w-full flex justify-between items-center p-4 bg-white shadow-md">
      
      {/* Container para o logo e título */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-800">💅 StyleChic Pro</h1> 
      </div>
      
      <nav>
        {/* Futuros links de navegação aqui */}
      </nav>
      
      {/* O AuthButton (que tem o cursor-pointer) */}
      {/* Colocamos o AuthButton fora da nav para garantir que seja um item flex individual */}
      <AuthButton /> 
    </header>
  );
}