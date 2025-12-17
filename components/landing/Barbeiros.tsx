// 📁 components/landing/Barbeiros.tsx

const barbeiros = [
  {
    nome: "Carlos Silva",
    especialidade: "Cortes Clássicos",
    imagem: "/barbeiro1.jpg",
    descricao: "Especialista em cortes tradicionais e barba."
  },
  {
    nome: "João Santos",
    especialidade: "Estilos Modernos",
    imagem: "/barbeiro2.jpg",
    descricao: "Criador de tendências e estilos contemporâneos."
  },
  {
    nome: "Pedro Oliveira",
    especialidade: "Barba e Bigode",
    imagem: "/barbeiro3.jpg",
    descricao: "Mestre em design de barba e cuidados masculinos."
  }
];

export const Barbeiros = () => {
  return (
    <section id="barbeiros" className="py-20 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-brand-accent mb-12">
          Nossos Barbeiros
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbeiros.map((barbeiro, index) => (
            <div key={index} className="bg-brand-dark p-6 rounded-lg text-center border-2 border-brand-accent">
              <img
                src={barbeiro.imagem}
                alt={barbeiro.nome}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold text-brand-accent mb-2">
                {barbeiro.nome}
              </h3>
              <p className="text-brand-text mb-4">{barbeiro.especialidade}</p>
              <p className="text-brand-text">{barbeiro.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};