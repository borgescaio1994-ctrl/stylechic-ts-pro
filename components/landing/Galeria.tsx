// 📁 components/landing/Galeria.tsx

const imagens = [
  "/galeria1.jpg",
  "/galeria2.jpg",
  "/galeria3.jpg",
  "/galeria4.jpg",
  "/galeria5.jpg",
  "/galeria6.jpg"
];

export const Galeria = () => {
  return (
    <section id="galeria" className="py-20 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-brand-accent mb-12">
          Nossa Galeria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imagens.map((imagem, index) => (
            <div key={index} className="overflow-hidden rounded-lg border-2 border-brand-accent">
              <img
                src={imagem}
                alt={`Trabalho ${index + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};