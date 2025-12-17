// 📁 components/BarberProfile.tsx

import { Button } from "@/components/ui/button";

interface BarberProfileProps {
  barber: any;
}

export const BarberProfile = ({ barber }: BarberProfileProps) => {
  const especialidades = barber.services.map((s: any) => s.name).join(", ");

  return (
    <div className="bg-brand-dark p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={barber.user.image || "/default-avatar.jpg"}
          alt={barber.user.name || "Barbeiro"}
          className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-semibold text-brand-accent mb-2">
            {barber.user.name}
          </h3>
          <p className="text-brand-text mb-2">
            <strong>Especialidades:</strong> {especialidades || "Geral"}
          </p>
          <p className="text-brand-text mb-4">
            Biografia: Especialista em cuidados masculinos com anos de experiência.
          </p>
          <div className="mb-4">
            <h4 className="text-lg font-medium text-brand-accent mb-2">Serviços Oferecidos:</h4>
            <ul className="list-disc list-inside text-brand-text">
              {barber.services.map((service: any) => (
                <li key={service.id}>
                  {service.name} - R$ {service.price.toFixed(2)} ({service.duration} min)
                </li>
              ))}
            </ul>
          </div>
          <Button className="bg-brand-accent text-brand-dark hover:bg-brand-accent/80">
            Agendar com {barber.user.name}
          </Button>
        </div>
      </div>
      {barber.gallery.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-brand-accent mb-4">Galeria de Trabalhos:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {barber.gallery.map((image: any) => (
              <img
                key={image.id}
                src={image.imageUrl}
                alt={image.description || "Trabalho"}
                className="w-full h-32 object-cover rounded-lg border-2 border-brand-accent"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};