// 📁 app/layout.tsx

import './globals.css';
import { NextAuthProvider } from '../components/NextAuthProvider'; 
// CORRIGINDO O CAMINHO: '../components/layout/Header'
import { Header } from '../components/layout/Header'; // <-- CORREÇÃO AQUI

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <NextAuthProvider>
          {/* O HEADER É RENDERIZADO AQUI, AGORA COM ACESSO À SESSÃO */}
          <Header /> 
          
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}