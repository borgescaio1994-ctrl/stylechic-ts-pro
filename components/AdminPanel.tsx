// 📁 components/AdminPanel.tsx

"use client";

import { useSession } from "next-auth/react";
import { Lock, Settings } from "lucide-react";

export function AdminPanel() {
  const { data: session, status } = useSession();

  // 1. Carregando ou Deslogado
  if (status === "loading" || status !== "authenticated") {
    // Não exibe nada ou apenas um placeholder se for necessário
    return null;
  }

  // 2. Verifica a Role
  // Utilizamos a tipagem estendida que definimos para acessar session.user.role
  const userRole = session.user.role;

  // Se o usuário não for ADMIN, não renderiza o painel
  if (userRole !== "ADMIN") {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-red-200 mt-6">
        <Lock className="w-6 h-6 text-red-500 mx-auto mb-2" />
        <p className="text-sm text-red-600">
          Acesso Negado. Você está logado como **{userRole}**.
        </p>
      </div>
    );
  }

  // 3. Renderiza o Painel de Administrador
  return (
    <div className="bg-blue-50 border border-blue-300 p-6 rounded-xl mt-6">
      <h2 className="text-2xl font-bold text-blue-700 flex items-center mb-4">
        <Settings className="w-6 h-6 mr-3" />
        Painel de Administração
      </h2>
      <p className="text-blue-800">
        Bem-vindo, Administrador! Aqui você pode gerenciar agendamentos, serviços e a equipe.
      </p>
      {/* Aqui virão links para /admin/servicos, /admin/agendamentos etc. */}
    </div>
  );
}