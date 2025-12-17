// 📁 app/api/services/route.ts

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

    const services = await prisma.service.findMany({
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

    return NextResponse.json(services);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const { name, description, price, duration } = await request.json();

    if (!name || !price || !duration) {
      return NextResponse.json({ error: "Nome, preço e duração são obrigatórios" }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration)
      }
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}