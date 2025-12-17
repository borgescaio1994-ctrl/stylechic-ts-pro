// 📁 components/admin/AdminBarbershop.tsx

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Barbershop {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  description?: string;
  owner: {
    name: string;
    email: string;
  };
}

export default function AdminBarbershop() {
  const { data: session } = useSession();
  const [barbershop, setBarbershop] = useState<Barbershop | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: ''
  });

  useEffect(() => {
    fetchBarbershop();
  }, []);

  const fetchBarbershop = async () => {
    try {
      const response = await fetch('/api/barbershops');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setBarbershop(data[0]);
          setFormData({
            name: data[0].name,
            address: data[0].address,
            phone: data[0].phone || '',
            email: data[0].email || '',
            description: data[0].description || ''
          });
        }
      }
    } catch (error) {
      console.error('Erro ao buscar barbearia:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = barbershop ? 'PUT' : 'POST';
      const url = barbershop ? `/api/barbershops/${barbershop.id}` : '/api/barbershops';

      const body = barbershop
        ? { name: formData.name, address: formData.address, phone: formData.phone, email: formData.email, description: formData.description }
        : { name: formData.name, address: formData.address, phone: formData.phone, email: formData.email, description: formData.description, ownerId: session?.user?.id };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setBarbershop(data);
        setEditing(false);
      } else {
        alert('Erro ao salvar barbearia');
      }
    } catch (error) {
      console.error('Erro ao salvar barbearia:', error);
      alert('Erro ao salvar barbearia');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-accent mb-6">Gerenciar Barbearia</h2>

      {barbershop && !editing ? (
        <div className="bg-brand-surface border border-brand-accent rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-brand-accent">{barbershop.name}</h3>
            <button
              onClick={() => setEditing(true)}
              className="bg-brand-accent text-brand-dark px-4 py-2 rounded-md hover:bg-brand-accent/80"
            >
              Editar
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-brand-text">Nome</label>
              <p className="text-brand-text">{barbershop.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text">Endereço</label>
              <p className="text-brand-text">{barbershop.address}</p>
            </div>
            {barbershop.phone && (
              <div>
                <label className="block text-sm font-medium text-brand-text">Telefone</label>
                <p className="text-brand-text">{barbershop.phone}</p>
              </div>
            )}
            {barbershop.email && (
              <div>
                <label className="block text-sm font-medium text-brand-text">Email</label>
                <p className="text-brand-text">{barbershop.email}</p>
              </div>
            )}
            {barbershop.description && (
              <div>
                <label className="block text-sm font-medium text-brand-text">Descrição</label>
                <p className="text-brand-text">{barbershop.description}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-brand-text">Proprietário</label>
              <p className="text-brand-text">{barbershop.owner.name} ({barbershop.owner.email})</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-brand-surface border border-brand-accent rounded-lg p-6">
          <h3 className="text-lg font-semibold text-brand-accent mb-4">
            {barbershop ? 'Editar Barbearia' : 'Criar Barbearia'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text">Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text">Endereço</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3">
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: barbershop?.name || '',
                      address: barbershop?.address || '',
                      phone: barbershop?.phone || '',
                      email: barbershop?.email || '',
                      description: barbershop?.description || ''
                    });
                  }}
                  className="px-4 py-2 border border-brand-accent rounded-md text-brand-text hover:bg-brand-accent/20"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-brand-accent text-brand-dark rounded-md hover:bg-brand-accent/80"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}