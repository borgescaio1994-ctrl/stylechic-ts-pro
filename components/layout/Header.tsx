// 📁 components/layout/Header.tsx

import { AuthButton } from '../AuthButton'; // Importa o AuthButton

export function Header() {
  return (
    // Estilo Tailwind básico para fixar o header no topo e dar um visual inicial
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-white shadow-md">
      {/* Coloque aqui o logo ou nome da sua aplicação */}
      <h1 className="text-xl font-bold text-gray-800">💅 StyleChic Pro</h1> 
      
      <nav>
        {/* Futuros links de navegação aqui */}
      </nav>
      
      {/* Renderização do Botão de Autenticação */}
      <AuthButton /> 
    </header>
  );
}