import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const barberServices = await (prisma as any).barberService.findMany({
      where: { barberId: params.id },
      include: { service: true },
    });
    const services = barberServices.map((bs: any) => bs.service);
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar serviços' }, { status: 500 });
  }
}