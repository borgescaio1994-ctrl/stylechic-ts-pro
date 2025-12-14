// 📁 app/page.tsx

import React from 'react';
import { Home, Calendar, Users, Briefcase } from 'lucide-react'; 
// Importa o componente de autenticação que criamos em components/AuthButton.tsx
import { AuthButton } from '@/components/AuthButton'; 

// --- Componente de Navegação (Header) ---
const Header = () => (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-pink-600">StyleChic Pro</h1>
      <nav className="hidden md:flex space-x-6 items-center">
        <a href="#servicos" className="text-gray-600 hover:text-pink-600 transition duration-300 flex items-center">
          <Home className="w-5 h-5 mr-1" /> Início
        </a>
        <a href="#equipe" className="text-gray-600 hover:text-pink-600 transition duration-300 flex items-center">
          <Users className="w-5 h-5 mr-1" /> Equipe
        </a>
        
        {/* NOVO: Botão de Login/Logout */}
        <AuthButton />

        {/* Botão Agendar (opcionalmente) */}
        <a href="#agendamento" className="text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full transition duration-300 flex items-center">
          <Calendar className="w-5 h-5 mr-1" /> Agendar
        </a>
      </nav>
    </div>
  </header>
);

// --- Componente de Hero (Chamada Principal) ---
const HeroSection = () => (
  <section className="bg-pink-50 text-gray-800 py-20 text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-extrabold mb-4 text-pink-700">
        Transforme seu Visual com Estilo
      </h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Seu destino premium para cortes, cores e tratamentos. Agende seu momento de beleza e relaxamento.
      </p>
      <a 
        href="#agendamento" 
        className="bg-pink-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105 inline-flex items-center"
      >
        <Calendar className="w-6 h-6 mr-2" /> Agende Agora
      </a>
    </div>
  </section>
);

// --- Componente de Serviços (Exemplo de Cards) ---
const ServicesSection = () => (
  <section id="servicos" className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h3 className="text-4xl font-bold mb-12 text-gray-800">Nossos Serviços Exclusivos</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
          <Briefcase className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h4 className="text-2xl font-semibold mb-2">Corte e Estilo</h4>
          <p className="text-gray-600">Transformação moderna e personalizada para seu tipo de cabelo.</p>
        </div>
        {/* Card 2 */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
          <Briefcase className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h4 className="text-2xl font-semibold mb-2">Coloração Premium</h4>
          <p className="text-gray-600">Mechas, balaiagens e tinturas com as melhores marcas do mercado.</p>
        </div>
        {/* Card 3 */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
          <Briefcase className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h4 className="text-2xl font-semibold mb-2">Tratamentos de Luxo</h4>
          <p className="text-gray-600">Reconstrução capilar profunda e hidratação com tecnologia de ponta.</p>
        </div>
      </div>
    </div>
  </section>
);

// --- Componente Principal da Página ---
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Cabeçalho */}
      <Header />

      <main>
        {/* 2. Seção Principal (Hero) */}
        <HeroSection />

        {/* 3. Seção de Serviços */}
        <ServicesSection />
        
        {/* Adicione mais seções aqui: Equipe, Localização, Testemunhos, Footer, etc. */}
      </main>

      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} StyleChic Pro. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}