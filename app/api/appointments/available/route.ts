import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const barberId = searchParams.get('barberId');
  const date = searchParams.get('date');
  if (!barberId || !date) {
    return NextResponse.json({ error: 'Missing barberId or date' }, { status: 400 });
  }
  try {
    const appointments = await (prisma as any).appointment.findMany({
      where: {
        barberId,
        date: {
          gte: new Date(date + 'T00:00:00.000Z'),
          lt: new Date(date + 'T23:59:59.999Z'),
        },
        status: { not: 'CANCELLED' },
      },
      include: { service: true },
    });
    // Generate slots 9:00 to 18:00, 30min
    const start = 9 * 60;
    const end = 18 * 60;
    const slots: string[] = [];
    for (let m = start; m < end; m += 30) {
      const hour = Math.floor(m / 60);
      const min = m % 60;
      slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
    }
    // Mark busy
    const busySlots = new Set<string>();
    appointments.forEach((app: any) => {
      const appDate = new Date(app.date);
      const appStart = appDate.getUTCHours() * 60 + appDate.getUTCMinutes();
      const appEnd = appStart + app.service.duration;
      for (let m = appStart; m < appEnd; m += 30) {
        const hour = Math.floor(m / 60);
        const min = m % 60;
        busySlots.add(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
      }
    });
    const available = slots.filter(slot => !busySlots.has(slot));
    return NextResponse.json(available);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar horários disponíveis' }, { status: 500 });
  }
}