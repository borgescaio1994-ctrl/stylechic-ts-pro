// 📁 app/api/auth/register/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, username, birthdate, phone } = body;

    // 1. Validação
    if (!email || !password || !name || !username || !phone || !birthdate) {
      return NextResponse.json({ message: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    // 2. Verificar se o usuário já existe
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email: email }, { username: username }] }
    });
    
    if (existingUser) {
      return NextResponse.json({ message: "E-mail ou nome de usuário já cadastrado." }, { status: 409 });
    }

    // 3. Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Criar o novo usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        phone,
        // Atenção: O campo role agora é String, o valor deve ser string.
        role: "CLIENT", 
        birthdate: new Date(birthdate), 
        password: hashedPassword,
      },
    });

    // Remove a senha antes de retornar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPass } = newUser;

    return NextResponse.json({ 
        message: "Usuário cadastrado com sucesso!", 
        user: userWithoutPass 
    }, { status: 201 });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    // Retorna a mensagem genérica de erro interno se houver falha
    return NextResponse.json({ message: "Ocorreu um erro interno no servidor." }, { status: 500 });
  }
}