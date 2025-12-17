// 📁 components/admin/AdminServices.tsx

"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingService ? 'PUT' : 'POST';
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          duration: formData.duration
        }),
      });

      if (response.ok) {
        fetchServices();
        setShowForm(false);
        setEditingService(null);
        setFormData({ name: '', description: '', price: '', duration: '' });
      } else {
        alert('Erro ao salvar serviço');
      }
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      alert('Erro ao salvar serviço');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price.toString(),
      duration: service.duration.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este serviço?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(services.filter(s => s.id !== id));
      } else {
        alert('Erro ao remover serviço');
      }
    } catch (error) {
      console.error('Erro ao remover serviço:', error);
      alert('Erro ao remover serviço');
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-accent">Gerenciar Serviços</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-brand-accent text-brand-dark px-4 py-2 rounded-md hover:bg-brand-accent/80 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Serviço
        </button>
      </div>

      {showForm && (
        <div className="bg-brand-surface border border-brand-accent rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-brand-accent mb-4">
            {editingService ? 'Editar Serviço' : 'Novo Serviço'}
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
              <label className="block text-sm font-medium text-brand-text">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-text">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-text">Duração (min)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="mt-1 block w-full border border-brand-accent rounded-md px-3 py-2 bg-brand-dark text-brand-text"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                  setFormData({ name: '', description: '', price: '', duration: '' });
                }}
                className="px-4 py-2 border border-brand-accent rounded-md text-brand-text hover:bg-brand-accent/20"
              >
                Cancelar
              </button>
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

      <div className="bg-brand-surface border border-brand-accent rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-brand-accent">
          <thead className="bg-brand-dark">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Duração
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-text uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-brand-surface divide-y divide-brand-accent">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-text">
                  {service.name}
                </td>
                <td className="px-6 py-4 text-sm text-brand-text">
                  {service.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  R$ {service.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {service.duration} min
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-brand-accent hover:text-brand-accent/80 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-brand-text">Nenhum serviço encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}