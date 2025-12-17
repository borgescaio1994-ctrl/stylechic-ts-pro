// 📁 app/api/barbers/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const barber = await (prisma as any).barber.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        barbershop: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!barber) {
      return NextResponse.json({ error: 'Barbeiro não encontrado' }, { status: 404 });
    }

    return NextResponse.json(barber);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar barbeiro' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { name, email, phone, password } = await request.json();

    // Buscar barbeiro atual
    const barber = await (prisma as any).barber.findUnique({
      where: { id: params.id },
      include: { user: true },
    });

    if (!barber) {
      return NextResponse.json({ error: 'Barbeiro não encontrado' }, { status: 404 });
    }

    // Verificar se email já existe (exceto para o próprio usuário)
    if (email && email !== barber.user.email) {
      const existingUser = await (prisma as any).user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
      }
    }

    // Preparar dados para atualização
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    // Atualizar usuário
    const updatedUser = await (prisma as any).user.update({
      where: { id: barber.userId },
      data: updateData,
    });

    // Buscar barbeiro atualizado
    const updatedBarber = await (prisma as any).barber.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        barbershop: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(updatedBarber);
  } catch (error) {
    console.error('Erro ao atualizar barbeiro:', error);
    return NextResponse.json({ error: 'Erro ao atualizar barbeiro' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Verificar se barbeiro existe
    const barber = await (prisma as any).barber.findUnique({
      where: { id: params.id },
    });

    if (!barber) {
      return NextResponse.json({ error: 'Barbeiro não encontrado' }, { status: 404 });
    }

    // Deletar barbeiro (cascade vai deletar o usuário)
    await (prisma as any).barber.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Barbeiro removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover barbeiro:', error);
    return NextResponse.json({ error: 'Erro ao remover barbeiro' }, { status: 500 });
  }
}