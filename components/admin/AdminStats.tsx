// 📁 components/admin/AdminStats.tsx

"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Scissors, Calendar, Building, DollarSign } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalBarbers: number;
  totalAppointments: number;
  totalServices: number;
  totalBarbershops: number;
  appointmentsByStatus: Array<{ status: string; _count: { status: number } }>;
  totalRevenue: number;
  recentAppointments: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-brand-text">Erro ao carregar estatísticas</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total de Usuários",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Total de Barbeiros",
      value: stats.totalBarbers,
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Total de Agendamentos",
      value: stats.totalAppointments,
      icon: Calendar,
      color: "bg-purple-500"
    },
    {
      title: "Total de Serviços",
      value: stats.totalServices,
      icon: Scissors,
      color: "bg-orange-500"
    },
    {
      title: "Total de Barbearias",
      value: stats.totalBarbershops,
      icon: Building,
      color: "bg-red-500"
    },
    {
      title: "Receita Total",
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-yellow-500"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-accent mb-6">Estatísticas Gerais</h2>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-brand-surface border border-brand-accent rounded-lg p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-brand-text">{card.title}</p>
                  <p className="text-2xl font-bold text-brand-accent">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agendamentos por Status */}
      <div className="bg-brand-surface border border-brand-accent rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-brand-accent mb-4">Agendamentos por Status</h3>
        <div className="space-y-3">
          {stats.appointmentsByStatus.map((item) => (
            <div key={item.status} className="flex justify-between items-center">
              <span className="text-sm font-medium text-brand-text capitalize">
                {item.status.toLowerCase()}
              </span>
              <span className="text-sm font-bold text-brand-accent">
                {item._count.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Agendamentos Recentes */}
      <div className="bg-brand-surface border border-brand-accent rounded-lg p-6">
        <h3 className="text-lg font-semibold text-brand-accent mb-4">Agendamentos dos Últimos 30 Dias</h3>
        <p className="text-3xl font-bold text-brand-accent">{stats.recentAppointments}</p>
      </div>
    </div>
  );
}