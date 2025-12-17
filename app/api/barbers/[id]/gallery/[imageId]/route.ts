// 📁 app/api/barbers/[id]/gallery/[imageId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    if (session.user.role !== 'BARBER') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    // Verificar se o barbeiro pertence ao usuário
    const barber = await prisma.barber.findUnique({
      where: { id: params.id },
    });

    if (!barber || barber.userId !== session.user.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    // Verificar se a imagem existe e pertence ao barbeiro
    const image = await prisma.gallery.findUnique({
      where: { id: params.imageId },
    });

    if (!image || image.barberId !== params.id) {
      return NextResponse.json({ error: 'Imagem não encontrada' }, { status: 404 });
    }

    // Deletar imagem
    await prisma.gallery.delete({
      where: { id: params.imageId },
    });

    return NextResponse.json({ message: 'Imagem removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover imagem da galeria:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}