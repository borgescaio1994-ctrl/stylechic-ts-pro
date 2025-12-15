// 📁 app/layout.tsx (Corrigido para Hydration e Fonte)

import type { Metadata } from "next";
// IMPORTAÇÃO CORRETA DA FONTE
import { Inter } from "next/font/google"; 
import "./globals.css";

import Providers from "@/components/providers/Providers";
// REMOVIDA A IMPORTAÇÃO DO HEADER AQUI (movido para page.tsx)

// 1. DEFINIÇÃO DA FONTE (CORREÇÃO: Esta linha estava faltando/removida)
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
      {/* Aplica a classe da fonte, fundo escuro e cor de texto claro no corpo */}
      <body className={`${inter.className} bg-brand-dark text-brand-text`}> 
        <Providers>
          {/* O Header foi movido para o page.tsx */}
          <div className="pt-0 min-h-screen"> 
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}