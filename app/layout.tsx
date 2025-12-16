// 📁 app/layout.tsx (CORREÇÃO: REMOVE O HEADER DO LAYOUT RAIZ)

import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

import Providers from "@/components/providers/Providers";
// REMOVIDO: import { Header } from "@/components/layout/Header"; 

const inter = Inter({ subsets: ["latin"] }); 

export const metadata: Metadata = {
  title: "StyleChic Pro",
  description: "Transforme seu Visual com Estilo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          {/* REMOVIDO: <Header />  */}
          {children}
        </Providers>
      </body>
    </html>
  );
}