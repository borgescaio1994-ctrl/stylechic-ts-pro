// 📁 components/landing/Servicos.tsx

const servicos = [
  {
    nome: "Corte de Cabelo",
    preco: "R$ 30,00",
    descricao: "Cortes clássicos e modernos para todos os estilos."
  },
  {
    nome: "Barba",
    preco: "R$ 20,00",
    descricao: "Aparação e modelagem profissional da barba."
  },
  {
    nome: "Corte + Barba",
    preco: "R$ 45,00",
    descricao: "Combo completo para um visual impecável."
  },
  {
    nome: "Sobrancelha",
    preco: "R$ 15,00",
    descricao: "Design e limpeza das sobrancelhas."
  },
  {
    nome: "Lavagem",
    preco: "R$ 10,00",
    descricao: "Lavagem completa com produtos premium."
  },
  {
    nome: "Tratamento Capilar",
    preco: "R$ 25,00",
    descricao: "Tratamentos para cabelos danificados."
  }
];

export const Servicos = () => {
  return (
    <section id="servicos" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-brand-accent mb-12">
          Nossos Serviços
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico, index) => (
            <div key={index} className="bg-brand-surface p-6 rounded-lg border-2 border-brand-accent">
              <h3 className="text-2xl font-semibold text-brand-accent mb-2">
                {servico.nome}
              </h3>
              <p className="text-brand-text mb-4">{servico.descricao}</p>
              <p className="text-3xl font-bold text-brand-accent">{servico.preco}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};