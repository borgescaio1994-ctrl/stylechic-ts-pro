// 📁 app/dashboard/page.tsx

// Componentes de Servidor
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogOut } from 'lucide-react';

// Componente de Cliente (para usar signOut)
import { SignOutButton } from '@/components/SignOutButton'; 

/**
 * Componente da página principal do painel.
 * Esta rota é protegida pelo middleware.
 */
export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    // O token contém o ID do usuário
    const userId = session?.user.id;
    
    // Assegurando o tema com classes Tailwind
    return (
        <div className="container mx-auto p-8 bg-brand-dark min-h-screen text-brand-text">
            
            {/* Cabeçalho do Dashboard */}
            <header className="flex justify-between items-center mb-10 border-b border-gray-700 pb-4">
                <h1 className="text-4xl font-bold text-brand-accent">Painel Principal</h1>
                
                {/* Botão de Logout */}
                <SignOutButton /> 
            </header>

            <p className="text-lg text-gray-400 mb-6">
                Bem-vindo(a), {session?.user?.name || "Style Chic"}. 
                <span className="block text-sm opacity-70 mt-1">Seu ID de usuário (Prisma): {userId}</span>
            </p>

            <p className="mb-8 text-brand-text">Esta é uma rota protegida. Se você está vendo isto, o login funcionou.</p>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-brand-text">Próximos Passos (Funcionalidades de Admin):</h2>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                    <li><span className="font-medium text-brand-accent">Gerenciar Barbearia:</span> Criar a UI para adicionar/editar dados da Barbearia.</li>
                    <li><span className="font-medium text-brand-accent">Gerenciar Serviços:</span> Criar a UI para CRUD de Serviços (`Corte`, `Barba`, etc.).</li>
                    <li><span className="font-medium text-brand-accent">Agendamentos:</span> Implementar a criação e visualização de agendamentos.</li>
                </ul>
            </div>
            
        </div>
    );
}