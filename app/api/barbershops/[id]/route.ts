// 📁 app/api/barbershops/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const { name, address } = await request.json();

    if (!name || !address) {
      return NextResponse.json({ error: "Nome e endereço são obrigatórios" }, { status: 400 });
    }

    const barbershop = await prisma.barbershop.update({
      where: { id: params.id },
      data: {
        name,
        address
      }
    });

    return NextResponse.json(barbershop);
  } catch (error) {
    console.error("Erro ao atualizar barbearia:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}