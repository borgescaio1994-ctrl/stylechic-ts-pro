// 📁 app/login/page.tsx (SIMPLIFICADO PARA EVITAR CONFLITO DE REDIRECT)

import { getProviders } from "next-auth/react"; 
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton"; 

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        // Se já estiver logado, mande para a Home, onde o app/page.tsx cuidará do redirecionamento Admin/Usuário
        redirect("/"); 
    }

    const providers = await getProviders();

    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
            {/* ... Conteúdo JSX da tela de login ... */}
            <div className="w-full max-w-md space-y-8 rounded-lg bg-brand-surface p-8 shadow-xl text-brand-text">
                <h1 className="text-center text-3xl font-extrabold text-brand-accent">
                    Acesso StyleChic Pro
                </h1>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Faça login para gerenciar suas barbearias e agendamentos.
                </p>

                <div className="space-y-4">
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <div key={provider.name}>
                                <GoogleSignInButton providerId={provider.id}>
                                    Continuar com {provider.name}
                                </GoogleSignInButton>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}