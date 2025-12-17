import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { barberId, serviceId, date, userId } = body;
    if (!barberId || !serviceId || !date || !userId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    // Get service for duration
    const service = await (prisma as any).service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    // Check availability
    const start = new Date(date);
    const end = new Date(start.getTime() + service.duration * 60000);
    const conflicting = await (prisma as any).appointment.findFirst({
      where: {
        barberId,
        status: { not: 'CANCELLED' },
        date: {
          lt: end,
          gte: start,
        },
      },
    });
    if (conflicting) {
      return NextResponse.json({ error: 'Horário não disponível' }, { status: 409 });
    }
    // Create appointment
    const appointment = await (prisma as any).appointment.create({
      data: {
        barberId,
        serviceId,
        userId,
        date: start,
      },
    });
    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 });
  }
}