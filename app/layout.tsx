// 📁 app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

// Importação do AuthProvider (que deve estar em components/providers/auth-provider.tsx)
import { AuthProvider } from "@/components/providers/auth-provider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Style Chic - Agendamentos",
  description: "Sistema de agendamento online para salão de beleza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* Envolvendo a aplicação no AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}