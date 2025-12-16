// 📁 app/page.tsx (CORREÇÃO FINAL DO REDIRECIONAMENTO)

import { Header } from "@/components/layout/Header"; 
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth"; 

// Este é um Server Component, perfeito para checar a sessão antes de renderizar
export default async function Home() {
    // 1. CHECA A SESSÃO
    const session = await getServerSession(authOptions);

    if (session) {
        // 2. REDIRECIONAMENTO ADMIN: Se for admin, envia para o dashboard
        if (session.user.isAdmin) {
            redirect("/admin/dashboard");
        }
        // 3. REDIRECIONAMENTO COMUM: Se não for admin, envia para o dashboard padrão
        redirect("/dashboard/barbershops"); 
        
        // NOTA: Se o usuário NÃO estiver logado, o código continuará para renderizar o JSX abaixo
    }

    return (
        <div>
            {/* 4. RENDERIZAÇÃO: O Header será renderizado para usuários NÃO logados ou para exibir o conteúdo da Home */}
            <Header /> 
            <main className="p-8">
                <h1 className="text-4xl font-bold text-center text-brand-accent">
                    Bem-vindo ao StyleChic Pro
                </h1>
                <p className="mt-4 text-center text-lg text-brand-text-light">
                    Transforme seu visual com estilo. Clique em Login no canto superior para começar.
                </p>
                {/* Aqui você pode ter mais conteúdo para usuários deslogados */}
            </main>
        </div>
    );
}