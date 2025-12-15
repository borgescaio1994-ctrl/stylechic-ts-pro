// 📁 app/login/page.tsx (Código Corrigido)

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
// CORREÇÃO: Importa authOptions do caminho correto '@/lib/auth'
import { authOptions } from "@/lib/auth"; 
import { SignInForm } from "@/components/auth/SignInForm"; 

/**
 * Esta página é responsável por exibir o formulário de login/registro.
 * É um Server Component (async function).
 */
export default async function LoginPage() {
    // 1. Verifica a sessão (Server-side)
    const session = await getServerSession(authOptions);

    if (session) {
        // Redireciona para o painel principal se já estiver autenticado
        redirect("/dashboard");
    }

    // 2. Obtém os provedores configurados
    const providers = await getProviders();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 pt-20">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-2xl border border-gray-100">
                <header className="text-center">
                    <h1 className="text-4xl font-extrabold text-brand-accent">
                        Acesso StyleChic Pro
                    </h1>
                    <p className="mt-3 text-base text-gray-500">
                        Faça login para gerenciar agendamentos e serviços.
                    </p>
                </header>

                {/* 3. Passa os provedores para o componente cliente */}
                <SignInForm providers={providers} />
                
                {/* Rodapé com link opcional para cadastro */}
                 <footer className="text-center pt-4 text-sm text-gray-500">
                    Novo por aqui? 
                    <a href="/register" className="font-medium text-brand-accent hover:text-brand-accent/90 ml-1">
                        Crie sua conta
                    </a>
                </footer>
            </div>
        </div>
    );
}