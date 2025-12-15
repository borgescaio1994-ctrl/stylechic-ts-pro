// 📁 app/page.tsx (COMPLETO E ATUALIZADO)

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    // Removendo o Header daqui, pois ele já está no layout.tsx
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-24">
      
      <h1 className="text-5xl font-extrabold mb-8 text-gray-900">Bem-vindo ao StyleChic</h1>
      
      <p className="text-xl text-gray-600 mb-6">
        Status da Sessão: {session ? `Logado como ${session.user.name}` : "Não Logado"}
      </p>
      
      {/* Mensagem e Link de ADMIN */}
      {session && session.user.role === "ADMIN" && (
        <p className="mt-4 text-green-700 font-bold text-xl border-2 border-green-300 p-3 rounded-xl bg-green-50 shadow-md">
          ✅ Painel de ADMIN Detectado! Acesse <a href="/admin" className="underline hover:text-green-900 transition duration-150">clicando aqui</a>.
        </p>
      )}
      
      {/* Botões de Ação Central */}
      <div className="mt-12 space-x-6">
        {!session && (
          // Link de Login central corrigido
          <a href="/api/auth/signin" className="bg-indigo-600 text-white px-8 py-4 rounded-xl shadow-xl hover:bg-indigo-700 transition duration-300 text-lg font-semibold">
            Fazer Login
          </a>
        )}
        {session && (
          // Link de Logout central corrigido
          <a href="/api/auth/signout?callbackUrl=/" className="border border-red-500 text-red-500 px-8 py-4 rounded-xl shadow-lg hover:bg-red-50 transition duration-300 text-lg font-semibold">
            Sair ({session.user.email})
          </a>
        )}
      </div>
    </div>
  );
}