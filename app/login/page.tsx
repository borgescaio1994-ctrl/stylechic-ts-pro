// 📁 app/login/page.tsx (CORRIGIDO para usar o GoogleSignInButton)

import { getProviders } from "next-auth/react"; 
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// A importação do authOptions precisa ser direta, por isso usamos lib/auth
import { authOptions } from "@/lib/auth"; 

// Importamos o novo componente CLIENTE
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton"; 

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        // Redireciona para a rota correta após o login
        redirect("/dashboard/barbershops"); 
    }

    // Busca os provedores (Google, etc.) - Isso roda no Servidor
    const providers = await getProviders();

    return (
        // Aplicando classes do tema Dark/Gold
        <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-brand-surface p-8 shadow-xl text-brand-text">
                <h1 className="text-center text-3xl font-extrabold text-brand-accent">
                    Acesso StyleChic Pro
                </h1>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Faça login para gerenciar suas barbearias e agendamentos.
                </p>

                {/* --- Botões de Provedores --- */}
                <div className="space-y-4">
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <div key={provider.name}>
                                {/* Usamos o componente CLIENTE para encapsular o onClick */}
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