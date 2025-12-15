// 📁 app/admin/page.tsx

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // 1. Redireciona para o login se não houver sessão
  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  // 2. Redireciona para a home se a role não for ADMIN
  if (session.user.role !== "ADMIN") {
    // Redireciona para a página inicial se não for ADMIN
    redirect("/"); 
  }

  // Se passou pelas verificações, exibe o Dashboard
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        💻 Dashboard de Administração
      </h1>
      
      {/* Exemplo de Card do Painel */}
      <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-indigo-500">
        <p className="text-lg mb-4 text-gray-700">
          Bem-vindo, **{session.user.name}**! Seu painel de controle está pronto.
        </p>
        <p className="text-sm text-gray-600">
          Utilize os links abaixo para gerenciar o salão:
        </p>
        
        {/* Links de Gerenciamento */}
        <div className="mt-6 space-y-3">
          <a href="#" className="block text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 ease-in-out">
            → Gerenciar Agendamentos
          </a>
          <a href="#" className="block text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 ease-in-out">
            → Gerenciar Serviços
          </a>
          <a href="#" className="block text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 ease-in-out">
            → Gerenciar Usuários e Equipe
          </a>
        </div>
      </div>
    </div>
  );
}