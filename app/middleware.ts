// 📁 middleware.ts

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// As rotas que você quer proteger
const protectedPaths = ['/dashboard', '/admin']; 

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // 1. Redirecionar usuários autenticados da página /login para /dashboard
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
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
    
    return NextResponse.next();
}

// Configuração do matcher: define quais rotas o middleware deve rodar
export const config = {
    matcher: [
        '/login', 
        '/dashboard/:path*', // Protege /dashboard e todas as sub-rotas
        '/admin/:path*'      // Protege /admin e todas as sub-rotas
    ],
};