// 📁 app/dashboard/barbershops/page.tsx 

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Importa as opções
import { prisma } from "@/lib/prisma"; 
import { Barbershop } from '@prisma/client'; 
import { BarbershopForm } from "@/components/admin/BarbershopForm"; 
import { SignOutButton } from '@/components/SignOutButton'; // Novo componente de Cliente
import { AlertTriangle, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getBarbershopData(ownerId: string): Promise<Barbershop | null> {
    // Agora o ownerId não será nulo graças ao lib/auth.ts corrigido
    const barbershop = await prisma.barbershop.findFirst({
        where: { ownerId: ownerId },
    });
    return barbershop;
}

export default async function BarbershopsPage() {
    const session = await getServerSession(authOptions);
    const ownerId = session?.user.id;

    if (!ownerId) {
        // Esta mensagem de erro deve ser resolvida pela correção do lib/auth.ts
        return <div className="text-red-500 p-8 bg-brand-dark min-h-screen">Erro: Usuário não autenticado.</div>;
    }

    const barbershop = await getBarbershopData(ownerId);
    
    // Renderização com o tema Dark/Gold
    return (
        <div className="container mx-auto p-8 bg-brand-dark min-h-screen text-brand-text pt-24"> 
            <header className="flex justify-between items-center mb-10 border-b border-gray-700 pb-4">
                <h1 className="text-4xl font-bold text-brand-accent">
                    {barbershop ? "Gerenciar Barbearia" : "Cadastrar Barbearia"}
                </h1>
                 {/* Garantindo que o botão de logout esteja no painel */}
                <SignOutButton /> 
            </header>

            {barbershop ? (
                // --- MODO EDIÇÃO ---
                <div className="space-y-6">
                    <div className="bg-brand-surface p-6 rounded-xl shadow-lg border border-brand-accent/50">
                        <h2 className="text-2xl font-semibold text-brand-text mb-4">Barbearia Atual: {barbershop.name}</h2>
                        <BarbershopForm initialData={barbershop} />
                        <Link href={`/dashboard/barbershops/${barbershop.id}/services`} passHref legacyBehavior>
                             <Button className="mt-6 bg-brand-accent text-brand-dark hover:bg-brand-accent/90">
                                <PlusCircle className="w-5 h-5 mr-2" /> Gerenciar Serviços
                             </Button>
                        </Link>
                    </div>
                </div>

            ) : (
                // --- MODO CADASTRO ---
                <div className="space-y-6">
                    <div className="bg-yellow-900/30 border border-yellow-600/50 text-yellow-300 p-4 rounded-xl flex items-center mb-6">
                        <AlertTriangle className="w-6 h-6 mr-3" />
                        <p>Você ainda não tem uma barbearia cadastrada. Preencha o formulário abaixo para começar.</p>
                    </div>
                    <div className="bg-brand-surface p-6 rounded-xl shadow-lg border border-gray-700">
                        <h2 className="text-xl font-semibold text-brand-text mb-4">Novo Cadastro</h2>
                        <BarbershopForm initialData={null} />
                    </div>
                </div>
            )}
        </div>
    );
}