// src/app/login/page.tsx

import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Esta página é responsável por exibir o formulário de login.
 */
export default async function LoginPage() {
    // 1. Verifica se o usuário já está logado
    const session = await getServerSession(authOptions);

    if (session) {
        // Redireciona para o painel principal se já estiver autenticado
        redirect("/dashboard");
    }

    // 2. Obtém os provedores de autenticação configurados (apenas Email, por enquanto)
    const providers = await getProviders();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-xl">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">
                    Acesso StyleChic Pro
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Faça login ou crie sua conta para gerenciar seus serviços de beleza.
                </p>

                {/* --- Formulário de Login (Simples) --- */}
                <div className="space-y-4">
                    {/* Renderiza um botão para cada provedor */}
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <div key={provider.name}>
                                {/* NOTA: O formulário de email será mais complexo e será adicionado na próxima etapa. */}
                                <button
                                    // Ação de login será implementada no lado do cliente
                                    className="w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Continuar com {provider.name}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}