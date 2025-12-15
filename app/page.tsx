// 📁 app/page.tsx (Corrigido e com Tema Dark/Gold)

import React from 'react';
import { Calendar, Briefcase, Users } from 'lucide-react'; 
import { Header } from "@/components/layout/Header"; // Importado aqui, pois foi removido do layout

// --- Componente de Hero (Chamada Principal) ---
const HeroSection = () => (
    // Fundo da superfície, texto de destaque dourado, e texto claro
  <section className="bg-brand-surface text-brand-text py-32 text-center border-b border-gray-700">
    <div className="container mx-auto px-4">
      <h2 className="text-6xl font-black mb-4 text-brand-accent tracking-tight">
        Transforme seu Visual com Excelência
      </h2>
      <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-400">
        A plataforma premium para agendamento de barbearias e salões. Agende o seu próximo nível de estilo.
      </p>
      <a 
        href="/login" 
        // Botão Dourado
        className="bg-brand-accent text-brand-dark text-xl font-bold px-10 py-4 rounded-xl shadow-xl hover:bg-brand-accent/90 transition duration-300 transform hover:scale-[1.02] inline-flex items-center"
      >
        <Calendar className="w-6 h-6 mr-2" /> Agende Agora
      </a>
    </div>
  </section>
);

// --- Componente de Serviços (Exemplo de Cards) ---
const ServicesSection = () => (
  <section id="servicos" className="py-20 bg-brand-dark">
    <div className="container mx-auto px-4 text-center">
      <h3 className="text-4xl font-extrabold mb-12 text-brand-text">Serviços Premium</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="p-8 border-t-4 border-brand-accent bg-brand-surface rounded-xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
          <Briefcase className="w-10 h-10 text-brand-accent mx-auto mb-4" />
          <h4 className="text-2xl font-bold mb-3 text-brand-text">Corte e Estilo</h4>
          <p className="text-gray-400">Transformação moderna e personalizada com as últimas tendências.</p>
        </div>
        {/* Card 2 */}
        <div className="p-8 border-t-4 border-brand-accent bg-brand-surface rounded-xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
          <Briefcase className="w-10 h-10 text-brand-accent mx-auto mb-4" />
          <h4 className="text-2xl font-bold mb-3 text-brand-text">Coloração Premium</h4>
          <p className="text-gray-400">Mechas e tinturas vibrantes com a saúde do seu cabelo em primeiro lugar.</p>
        </div>
        {/* Card 3 */}
        <div className="p-8 border-t-4 border-brand-accent bg-brand-surface rounded-xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
          <Briefcase className="w-10 h-10 text-brand-accent mx-auto mb-4" />
          <h4 className="text-2xl font-bold mb-3 text-brand-text">Tratamentos de Luxo</h4>
          <p className="text-gray-400">Hidratação profunda e reconstrução com a tecnologia mais avançada.</p>
        </div>
      </div>
    </div>
  </section>
);

// --- Componente Principal da Página ---
export default function HomePage() {
  return (
    <div className="bg-brand-dark">
      <Header /> 
      <main className="pt-16"> 
        <HeroSection />
        <ServicesSection />
      </main>

      {/* Footer com o fundo escuro primário */}
      <footer className="bg-brand-dark text-brand-text text-center py-8 mt-10 border-t border-gray-700">
        <p className="text-lg font-medium text-brand-accent">StyleChic Pro</p>
        <p className="text-sm mt-2 opacity-70">© {new Date().getFullYear()}. Seu estilo, nosso compromisso.</p>
      </footer>
    </div>
  );
}