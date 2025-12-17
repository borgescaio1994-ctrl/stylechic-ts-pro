// 📁 components/admin/AdminDashboard.tsx

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { BarChart3, Users, Scissors, Calendar, Building, Settings, Cog } from "lucide-react";
import AdminBarbers from "./AdminBarbers";
import AdminServices from "./AdminServices";
import AdminAppointments from "./AdminAppointments";
import AdminBarbershop from "./AdminBarbershop";
import AdminStats from "./AdminStats";
import { SignOutButton } from '@/components/SignOutButton';

type Tab = 'stats' | 'barbers' | 'services' | 'appointments' | 'barbershop' | 'settings';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>('stats');

  const tabs = [
    { id: 'stats' as Tab, label: 'Estatísticas', icon: BarChart3 },
    { id: 'barbers' as Tab, label: 'Barbeiros', icon: Users },
    { id: 'services' as Tab, label: 'Serviços', icon: Scissors },
    { id: 'appointments' as Tab, label: 'Agendamentos', icon: Calendar },
    { id: 'barbershop' as Tab, label: 'Barbearia', icon: Building },
    { id: 'settings' as Tab, label: 'Configurações', icon: Cog },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return <AdminStats />;
      case 'barbers':
        return <AdminBarbers />;
      case 'services':
        return <AdminServices />;
      case 'appointments':
        return <AdminAppointments />;
      case 'barbershop':
        return <AdminBarbershop />;
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-brand-accent mb-6">Configurações do Sistema</h2>
            <div className="bg-brand-surface border border-brand-accent rounded-lg p-6">
              <p className="text-brand-text">Configurações gerais do sistema em desenvolvimento.</p>
            </div>
          </div>
        );
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text">
      <div className="bg-brand-surface shadow-sm border-b border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-brand-accent">
                Painel de Administração
              </h1>
              <p className="text-brand-text mt-1">
                Bem-vindo, {session?.user?.name}
              </p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-brand-surface rounded-lg shadow-sm border border-brand-accent p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-brand-accent/20 text-brand-accent'
                          : 'text-brand-text hover:bg-brand-surface hover:text-brand-accent'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-brand-surface rounded-lg shadow-sm border border-brand-accent p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}