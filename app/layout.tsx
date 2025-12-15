// 📁 app/layout.tsx (ATUALIZADO E CORRIGIDO)

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// CORREÇÃO AQUI: Importação Padrão (sem chaves)
import Header from '@/components/layout/Header'; 
import SessionProvider from "@/components/providers/SessionProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StyleChic Pro",
  description: "Sistema de Agendamento para Salão de Beleza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SessionProvider>
          <Header /> {/* Adicionando o Header em todas as páginas */}
          <main>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}