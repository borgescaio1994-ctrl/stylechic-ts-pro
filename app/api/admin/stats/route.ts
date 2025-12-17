// 📁 app/api/admin/stats/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    // Estatísticas gerais
    const totalUsers = await prisma.user.count();
    const totalBarbers = await prisma.barber.count();
    const totalAppointments = await prisma.appointment.count();
    const totalServices = await prisma.service.count();
    const totalBarbershops = await prisma.barbershop.count();

    // Agendamentos por status
    const appointmentsByStatus = await prisma.appointment.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    // Receita total (aproximada, baseada em serviços completados)
    const completedAppointments = await prisma.appointment.findMany({
      where: { status: 'COMPLETED' },
      include: { service: true }
    });
    const totalRevenue = completedAppointments.reduce((sum, apt) => sum + apt.service.price, 0);

    // Agendamentos recentes (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentAppointments = await prisma.appointment.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    return NextResponse.json({
      totalUsers,
      totalBarbers,
      totalAppointments,
      totalServices,
      totalBarbershops,
      appointmentsByStatus,
      totalRevenue,
      recentAppointments
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}