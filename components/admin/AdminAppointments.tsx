// 📁 components/admin/AdminAppointments.tsx

"use client";

import { useEffect, useState } from "react";

interface Appointment {
  id: string;
  date: string;
  status: string;
  barber: {
    user: {
      name: string;
    };
  };
  service: {
    name: string;
    price: number;
  };
  user: {
    name: string;
  };
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
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
      <h2 className="text-2xl font-bold text-brand-accent mb-6">Visualizar Agendamentos</h2>

      <div className="bg-brand-surface border border-brand-accent rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-brand-accent">
          <thead className="bg-brand-dark">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Data/Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Barbeiro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Serviço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-text uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-brand-surface divide-y divide-brand-accent">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {formatDate(appointment.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {appointment.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {appointment.barber.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {appointment.service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  R$ {appointment.service.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'PENDING' && 'Pendente'}
                    {appointment.status === 'CONFIRMED' && 'Confirmado'}
                    {appointment.status === 'COMPLETED' && 'Concluído'}
                    {appointment.status === 'CANCELLED' && 'Cancelado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-brand-text">Nenhum agendamento encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}