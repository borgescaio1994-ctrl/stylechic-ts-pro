// 📁 app/barbeiros/page.tsx

import { prisma } from "@/lib/prisma";
import { BarberProfile } from "@/components/BarberProfile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: { especialidade?: string };
}

export default async function BarbeirosPage({ searchParams }: PageProps) {
  const especialidade = searchParams.especialidade || "";

  const barbers: any[] = await (prisma as any).barber.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      services: {
        include: {
          service: true,
        },
      },
      gallery: true,
    },
  });

  // Filtrar por especialidade se fornecida
  const filteredBarbers = especialidade
    ? barbers.filter((barber: any) =>
        barber.services.some((bs: any) =>
          bs.service.name.toLowerCase().includes(especialidade.toLowerCase())
        )
      )
    : barbers;

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center text-brand-accent mb-12">
          Nossos Barbeiros
        </h1>

        {/* Filtro */}
        <form method="GET" className="mb-8 flex justify-center">
          <input
            type="text"
            name="especialidade"
            placeholder="Filtrar por especialidade..."
            defaultValue={especialidade}
            className="px-4 py-2 rounded-l-lg bg-brand-surface text-brand-text border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <Button type="submit" className="rounded-l-none bg-brand-accent text-brand-dark hover:bg-brand-accent/80">
            Filtrar
          </Button>
        </form>

        {/* Lista de Barbeiros */}
        <div className="space-y-8">
          {filteredBarbers.length > 0 ? (
            filteredBarbers.map(barber => (
              <BarberProfile
                key={barber.id}
                barber={{
                  ...barber,
                  services: barber.services.map((bs: any) => bs.service),
                }}
              />
            ))
          ) : (
            <p className="text-center text-brand-text">
              Nenhum barbeiro encontrado para a especialidade "{especialidade}".
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}