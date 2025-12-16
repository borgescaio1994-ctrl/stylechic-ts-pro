// 📁 components/admin/BarbershopForm.tsx
"use client"; 

import React from 'react';
import { Button } from "@/components/ui/button";

interface BarbershopFormProps {
    initialData: any; // Mantemos any por simplicidade temporária
}

export function BarbershopForm({ initialData }: BarbershopFormProps) {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Formulário de Barbearia submetido! Lógica de API virá aqui.');
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* O conteúdo do formulário deve ser renderizado aqui */}
            <input type="text" placeholder="Nome da Barbearia" className="w-full p-3 rounded bg-gray-800 text-brand-text border border-gray-700" defaultValue={initialData?.name || ''} name="name" />
            <input type="text" placeholder="Endereço" className="w-full p-3 rounded bg-gray-800 text-brand-text border border-gray-700" defaultValue={initialData?.address || ''} name="address" />
            <Button type="submit" className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90">
                {initialData ? 'Salvar Edição' : 'Cadastrar Barbearia'}
            </Button>
        </form>
    );
}