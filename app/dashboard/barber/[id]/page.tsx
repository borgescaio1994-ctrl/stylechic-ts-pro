// 📁 app/dashboard/barber/[id]/page.tsx

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BarberDashboard from "@/components/BarberDashboard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BarberDashboardPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  // 1. Redireciona para o login se não houver sessão
  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/barber/" + params.id);
  }

  // 2. Redireciona para a home se não for ADMIN ou BARBER
  if (session.user.role !== 'ADMIN' && session.user.role !== 'BARBER') {
    redirect("/");
  }

  // 3. Buscar dados do barbeiro pelo id
  const barber = await (prisma as any).barber.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      barbershop: true,
      appointments: {
        include: {
          service: true,
          user: true,
        },
        orderBy: { date: 'asc' },
      },
      gallery: true,
    },
  });

  if (!barber) {
    redirect("/");
  }

  // 4. Se for BARBER, verificar se é o próprio
  if (session.user.role === 'BARBER' && barber.userId !== session.user.id) {
    redirect("/");
  }

  return <BarberDashboard barber={barber} />;
}