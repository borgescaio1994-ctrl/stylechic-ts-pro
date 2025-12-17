// 📁 app/api/appointments/[id]/status/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    if (session.user.role !== 'BARBER') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const { status } = await req.json();

    if (!['COMPLETED', 'CANCELLED'].includes(status)) {
      return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
    }

    // Verificar se o agendamento pertence ao barbeiro
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: { barber: true },
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
    }

    if (appointment.barber.userId !== session.user.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    // Atualizar status
    const updatedAppointment = await prisma.appointment.update({
      where: { id: params.id },
      data: { status },
      include: {
        service: true,
        user: true,
      },
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Erro ao atualizar status do agendamento:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}