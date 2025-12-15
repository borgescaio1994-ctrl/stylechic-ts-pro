// app/layout.tsx

import type { Metadata } from "next";
// IMPORTANTE: Mantenha as importações das fontes
import { Playfair_Display, Inter } from "next/font/google"; 
import "./globals.css";

// 1. Importar a Navbar
import Navbar from '@/components/Navbar'; 
// 2. Importar o Wrapper de Sessão (CORREÇÃO do erro useSession)
import { SessionWrapper } from '@/components/auth/SessionWrapper'; 

// Configuração da fonte Serif para Títulos
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Configuração da fonte Sans-serif para Corpo
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "StyleChic Pro",
  description: "Sistema de Gestão para Salão de Beleza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Aplicar as variáveis CSS das fontes no <html> para o Tailwind ler
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      {/* 4. Aplica a fonte do corpo (body) e um fundo cinza suave (bg-gray-50) */}
      <body className={`font-body bg-gray-50`}>
        
        {/* 5. SessionWrapper envolve toda a aplicação para fornecer o contexto de autenticação */}
        <SessionWrapper>
            
            {/* 6. A Navbar aparece em todas as páginas */}
            <Navbar /> 
            
            <main className="min-h-screen">
                {children}
            </main>
            
        </SessionWrapper>
      </body>
    </html>
  );
}