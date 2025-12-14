// 📁 app/layout.tsx (Corrigido e final)

import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

import Providers from "@/components/providers/Providers";
import { Header } from "@/components/layout/Header"; // <--- CAMINHO CORRETO AGORA

// 1. DEFINIÇÃO DA FONTE
const inter = Inter({ subsets: ["latin"] }); 

// 2. METADATA
export const metadata: Metadata = {
  title: "StyleChic Pro",
  description: "Transforme seu Visual com Estilo",
};

// 3. EXPORTAÇÃO DA FUNÇÃO DE LAYOUT
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <Header /> 
          {children}
        </Providers>
      </body>
    </html>
  );
}