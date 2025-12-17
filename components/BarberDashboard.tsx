// 📁 components/BarberDashboard.tsx

'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SignOutButton } from '@/components/SignOutButton';

interface Barber {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  barbershop: {
    id: string;
    name: string;
  };
  appointments: Array<{
    id: string;
    date: Date;
    status: string;
    service: {
      id: string;
      name: string;
      price: number;
      duration: number;
    };
    user: {
      id: string;
      name: string;
    };
  }>;
  gallery: Array<{
    id: string;
    imageUrl: string;
    description?: string;
  }>;
}

interface BarberDashboardProps {
  barber: Barber;
}

export default function BarberDashboard({ barber }: BarberDashboardProps) {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState(barber.appointments);
  const [gallery, setGallery] = useState(barber.gallery);
  const [profileData, setProfileData] = useState({
    name: barber.user.name || '',
    phone: barber.user.phone || '',
  });

  // Filtrar agendamentos do dia atual
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayAppointments = barber.appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= today && aptDate < tomorrow;
  });

  // Filtrar agendamentos da semana
  const weekStart = new Date(today);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const weekAppointments = barber.appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= today && aptDate < weekEnd;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Concluído';
      case 'CANCELLED': return 'Cancelado';
      case 'CONFIRMED': return 'Confirmado';
      default: return 'Pendente';
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Atualizar estado local
        setAppointments(prev =>
          prev.map(apt =>
            apt.id === appointmentId ? { ...apt, status } : apt
          )
        );
        alert('Status atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar status');
    }
  };

  const removeGalleryImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/barbers/${barber.id}/gallery/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGallery(prev => prev.filter(img => img.id !== imageId));
        alert('Imagem removida com sucesso!');
      } else {
        alert('Erro ao remover imagem');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao remover imagem');
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch(`/api/barbers/${barber.id}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert('Perfil atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar perfil');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Global */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            StyleChic Pro - Painel do Barbeiro
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 hidden sm:block">
              Olá, <span className="font-semibold">{barber.user.name}</span>
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header Interno */}
        <div className="mb-8">
          <p className="text-gray-600">
            Gerencie seus agendamentos e perfil.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 Agendamentos
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🖼️ Galeria
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👤 Perfil
            </button>
          </div>
        </div>

        {/* Agendamentos Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agendamentos do Dia */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  🕐 Agendamentos de Hoje
                </h2>
                {todayAppointments.length === 0 ? (
                  <p className="text-gray-500">Nenhum agendamento para hoje.</p>
                ) : (
                  <div className="space-y-3">
                    {todayAppointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{apt.user.name}</p>
                          <p className="text-sm text-gray-600">{apt.service.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(apt.date).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                            {getStatusText(apt.status)}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => updateAppointmentStatus(apt.id, 'COMPLETED')}
                            >
                              Concluir
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => updateAppointmentStatus(apt.id, 'CANCELLED')}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Agendamentos da Semana */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  📅 Agendamentos da Semana
                </h2>
                {weekAppointments.length === 0 ? (
                  <p className="text-gray-500">Nenhum agendamento para esta semana.</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {weekAppointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{apt.user.name}</p>
                          <p className="text-sm text-gray-600">{apt.service.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(apt.date).toLocaleDateString('pt-BR')} às{' '}
                            {new Date(apt.date).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                          {getStatusText(apt.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Galeria Tab */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                🖼️ Galeria de Trabalhos
              </h2>
              <Button>Adicionar Foto</Button>
            </div>
            {barber.gallery.length === 0 ? (
              <p className="text-gray-500">Nenhuma foto na galeria ainda.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {barber.gallery.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.imageUrl}
                      alt={image.description || "Trabalho"}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="opacity-0 group-hover:opacity-100 text-xs"
                        onClick={() => removeGalleryImage(image.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Perfil Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              👤 Editar Perfil
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={barber.user.email}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <Button onClick={updateProfile}>Salvar Alterações</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}