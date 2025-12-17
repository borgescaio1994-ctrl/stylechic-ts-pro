// 📁 app/api/services/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const service = await prisma.service.findUnique({
      where: { id: params.id },
      include: {
        barbers: {
          include: {
            barber: {
              include: {
                user: {
                  select: { name: true }
                }
              }
            }
          }
        }
      }
    });

    if (!service) {
      return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const { name, description, price, duration } = await request.json();

    if (!name || !price || !duration) {
      return NextResponse.json({ error: "Nome, preço e duração são obrigatórios" }, { status: 400 });
    }

    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration)
      }
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    await prisma.service.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Serviço deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}