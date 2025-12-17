// 📁 app/api/barbershops/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const barbershops = await prisma.barbershop.findMany({
      include: {
        owner: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(barbershops);
  } catch (error) {
    console.error("Erro ao buscar barbearias:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const { name, address, ownerId } = await request.json();

    if (!name || !address || !ownerId) {
      return NextResponse.json({ error: "Nome, endereço e proprietário são obrigatórios" }, { status: 400 });
    }

    const barbershop = await prisma.barbershop.create({
      data: {
        name,
        address,
        ownerId
      }
    });

    return NextResponse.json(barbershop, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar barbearia:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}