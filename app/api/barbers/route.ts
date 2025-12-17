// 📁 app/api/barbers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const barbers = await (prisma as any).barber.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
            phone: true,
          },
        },
        barbershop: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(barbers);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar barbeiros' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { name, email, phone, password, barbershopId } = await request.json();

    if (!name || !email || !password || !barbershopId) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    // Verificar se email já existe
    const existingUser = await (prisma as any).user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário
    const user = await (prisma as any).user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: 'BARBER',
      },
    });

    // Criar barbeiro
    const barber = await (prisma as any).barber.create({
      data: {
        userId: user.id,
        barbershopId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
            phone: true,
          },
        },
        barbershop: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(barber, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar barbeiro:', error);
    return NextResponse.json({ error: 'Erro ao criar barbeiro' }, { status: 500 });
  }
}