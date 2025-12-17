// 📁 components/landing/Hero.tsx

export const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/barbearia-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-brand-accent">
          StyleChic Pro
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-brand-text">
          Transforme seu visual com estilo e elegância. A melhor barbearia da cidade.
        </p>
        <a href="#agendamento" className="bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors">
          Agendar Agora
        </a>
      </div>
    </section>
  );
};