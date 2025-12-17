// 📁 components/landing/CTA.tsx

export const CTA = () => {
  return (
    <section id="agendamento" className="py-20 bg-brand-accent">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-brand-dark mb-6">
          Pronto para um Novo Visual?
        </h2>
        <p className="text-xl text-brand-dark mb-8">
          Agende seu horário agora e transforme seu estilo com nossos profissionais.
        </p>
        <a
          href="/login"
          className="bg-brand-dark text-brand-accent px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-surface transition-colors"
        >
          Agendar Agora
        </a>
      </div>
    </section>
  );
};