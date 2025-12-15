// components/Navbar.tsx

'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
    // Usar useSession para determinar se o usuário está logado
    const { data: session } = useSession(); 
    
    const navLinks = [
        { href: "/", label: "Início" },
        { href: "/agendamentos", label: "Agendamentos" },
    ];

    return (
        // * CORREÇÃO AQUI: Aplicação da classe de fundo Azul Marinho *
        <header className="bg-primary-dark shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                
                {/* Logo/Título Principal */}
                {/* * CORREÇÃO AQUI: Aplicação da fonte heading e cor Dourado * */}
                <h1 className="text-3xl font-heading font-bold text-accent-gold tracking-wider">
                    StyleChic Pro
                </h1>

                {/* Links de Navegação */}
                <nav className="flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {/* * CORREÇÃO AQUI: Texto Branco e hover Dourado * */}
                            <span className="text-white hover:text-accent-gold transition duration-200 text-lg">
                                {link.label}
                            </span>
                        </Link>
                    ))}
                    
                    {/* Botão de Login/Logout */}
                    {session ? (
                        <Link href="/api/auth/signout">
                            {/* Botão Sair - Texto Branco com hover Vermelho */}
                             <span className="text-white hover:text-red-400 transition duration-200 text-lg flex items-center">
                                Sair
                            </span>
                        </Link>
                    ) : (
                        <Link href="/login">
                            {/* Botão Login - Fundo Dourado e Texto Azul Marinho */}
                            <span className="py-2 px-4 rounded-full bg-accent-gold text-primary-dark font-semibold hover:opacity-90 transition duration-200">
                                Login
                            </span>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;