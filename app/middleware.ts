// 📁 middleware.ts

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// As rotas que você quer proteger
const protectedPaths = ['/dashboard', '/admin', '/agendamento'];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // 1. Redirecionar usuários autenticados da página /login para /dashboard ou /admin
    if (pathname === '/login' && token) {
        if (token.role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin', req.url));
        } else {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
    }

    // 2. Proteger rotas que exigem autenticação
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected && !token) {
        // Se a rota for protegida e o usuário não tiver token, redireciona para o login
        const loginUrl = new URL('/login', req.url);
        // Adiciona a URL de retorno para que o usuário volte para onde estava
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 3. Verificar roles para páginas especiais
    if (pathname.startsWith('/dashboard')) {
        if (!token || (token.role !== 'ADMIN' && token.role !== 'BARBER')) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    if (pathname.startsWith('/admin')) {
        if (!token || token.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

// Configuração do matcher: define quais rotas o middleware deve rodar
export const config = {
    matcher: [
        '/login', 
        '/dashboard/:path*', // Protege /dashboard e todas as sub-rotas
        '/admin/:path*',      // Protege /admin e todas as sub-rotas
        '/agendamento/:path*' // Protege /agendamento e todas as sub-rotas
    ],
};