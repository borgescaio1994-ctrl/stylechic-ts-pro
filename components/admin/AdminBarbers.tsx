// 📁 components/admin/AdminBarbers.tsx

"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";

interface Barber {
  id: string;
  user: {
    name: string;
    email: string;
    phone?: string;
    image?: string;
  };
  barbershop: {
    name: string;
  };
}

interface Barbershop {
  id: string;
  name: string;
}

export default function AdminBarbers() {
  const { data: session } = useSession();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    barbershopId: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBarbers();
    fetchBarbershops();
  }, []);

  const fetchBarbers = async () => {
    try {
      const response = await fetch('/api/barbers');
      if (response.ok) {
        const data = await response.json();
        setBarbers(data);
      }
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBarbershops = async () => {
    try {
      const response = await fetch('/api/barbershops');
      if (response.ok) {
        const data = await response.json();
        setBarbershops(data);
      }
    } catch (error) {
      console.error('Erro ao buscar barbearias:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este barbeiro?')) return;

    try {
      const response = await fetch(`/api/barbers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBarbers(barbers.filter(b => b.id !== id));
      } else {
        alert('Erro ao remover barbeiro');
      }
    } catch (error) {
      console.error('Erro ao remover barbeiro:', error);
      alert('Erro ao remover barbeiro');
    }
  };

  const handleEdit = (barber: Barber) => {
    setEditingBarber(barber);
    setFormData({
      name: barber.user.name,
      email: barber.user.email,
      phone: barber.user.phone || '',
      password: '',
      barbershopId: barber.barbershop.name // Note: This should be the ID, but we need to fetch it
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const method = editingBarber ? 'PUT' : 'POST';
      const url = editingBarber ? `/api/barbers/${editingBarber.id}` : '/api/barbers';

      const body = editingBarber
        ? { name: formData.name, email: formData.email, phone: formData.phone, ...(formData.password && { password: formData.password }) }
        : { name: formData.name, email: formData.email, phone: formData.phone, password: formData.password, barbershopId: formData.barbershopId };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingBarber) {
          setBarbers(barbers.map(b => b.id === editingBarber.id ? data : b));
        } else {
          setBarbers([...barbers, data]);
        }
        setShowModal(false);
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || 'Erro ao salvar barbeiro');
      }
    } catch (error) {
      console.error('Erro ao salvar barbeiro:', error);
      alert('Erro ao salvar barbeiro');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      barbershopId: ''
    });
    setEditingBarber(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-accent">Gerenciar Barbeiros</h2>
        <button
          onClick={openAddModal}
          className="bg-brand-accent text-brand-dark px-4 py-2 rounded-md hover:bg-brand-accent/80 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Barbeiro
        </button>
      </div>

      <div className="bg-brand-surface border border-brand-accent rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-brand-accent">
          <thead className="bg-brand-dark">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Barbearia
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-text uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-brand-surface divide-y divide-brand-accent">
            {barbers.map((barber) => (
              <tr key={barber.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {barber.user.image && (
                      <img
                        className="h-10 w-10 rounded-full mr-3"
                        src={barber.user.image}
                        alt=""
                      />
                    )}
                    <div className="text-sm font-medium text-brand-text">
                      {barber.user.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {barber.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {barber.barbershop.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(barber)}
                    className="text-brand-accent hover:text-brand-accent/80 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(barber.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {barbers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-brand-text">Nenhum barbeiro encontrado</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-brand-dark bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-brand-accent w-96 shadow-lg rounded-md bg-brand-surface">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-brand-accent">
                  {editingBarber ? 'Editar Barbeiro' : 'Adicionar Barbeiro'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-brand-text hover:text-brand-accent"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

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
                  <label className="block text-sm font-medium text-brand-text">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
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

                {!editingBarber && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-brand-text">Barbearia</label>
                      <select
                        value={formData.barbershopId}
                        onChange={(e) => setFormData({ ...formData, barbershopId: e.target.value })}
                        className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                        required
                      >
                        <option value="">Selecione uma barbearia</option>
                        {barbershops.map((shop) => (
                          <option key={shop.id} value={shop.id}>
                            {shop.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-text">Senha</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                        required={!editingBarber}
                      />
                    </div>
                  </>
                )}

                {editingBarber && (
                  <div>
                    <label className="block text-sm font-medium text-brand-text">Nova Senha (opcional)</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                      placeholder="Deixe em branco para manter a senha atual"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-brand-accent rounded-md text-brand-text hover:bg-brand-accent/20"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-brand-accent text-brand-dark rounded-md hover:bg-brand-accent/80 disabled:opacity-50"
                  >
                    {submitting ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}