// 📁 app/dashboard/barber/page.tsx

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BarberDashboard from "@/components/BarberDashboard";

export default async function BarberDashboardPage() {
  const session = await getServerSession(authOptions);

  // 1. Redireciona para o login se não houver sessão
  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/barber");
  }

  // 2. Redireciona para a home se não for BARBER
  if (session.user.role !== 'BARBER') {
    redirect("/");
  }

  // 3. Buscar dados do barbeiro
  const barber = await prisma.barber.findUnique({
    where: { userId: session.user.id },
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

  return <BarberDashboard barber={barber} />;
}