// 📁 app/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      
      {/* Aqui você adicionaria seu Header, Banner, etc., se as importações estivessem corretas. */}
      {/* Exemplo: <Header /> */}
      
      <h1 className="text-4xl font-bold mb-6 text-indigo-700">StyleChic Pro</h1>
      
      <p className="text-lg text-gray-700">
        Status da Sessão: {session ? **`Logado como ${session.user.name}`** : "Não Logado"}
      </p>
      
      {/* Mensagem e Link de ADMIN */}
      {session && session.user.role === "ADMIN" && (
        <p className="mt-4 text-green-600 font-semibold text-xl border-2 border-green-300 p-2 rounded">
          ✅ Acesso ADMIN Detectado! Acesse o Painel <a href="/admin" className="underline hover:text-green-800 transition duration-150">clicando aqui</a>.
        </p>
      )}
      
      {/* Botões de Ação */}
      <div className="mt-8 space-x-4">
        {!session && (
          <a href="/api/auth/signin" className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition duration-150">
            Fazer Login
          </a>
        )}
        {session && (
          <a href="/api/auth/signout" className="border border-red-500 text-red-500 px-6 py-3 rounded-lg shadow-md hover:bg-red-50 transition duration-150">
            Sair ({session.user.email})
          </a>
        )}
      </div>
    </div>
  );
}