// 📁 app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Importe a fonte (Server Side)
import Providers from "@/components/providers/Providers"; // Importa o componente cliente
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Style Chic Pro",
  description: "Agendamentos de beleza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers> {/* Aqui usamos o provedor cliente */}
          {children}
        </Providers>
      </body>
    </html>
  );
}