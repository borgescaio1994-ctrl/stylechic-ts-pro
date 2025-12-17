// 📁 components/AgendamentoForm.tsx

'use client';

import { useState, useEffect } from 'react';

type Barber = {
  id: string;
  user: {
    name: string;
    image?: string;
  };
};

type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
};

type AvailableTime = string; // e.g. "09:00"

interface AgendamentoFormProps {
  userId: string;
}

export function AgendamentoForm({ userId }: AgendamentoFormProps) {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Fetch barbers
  useEffect(() => {
    fetch('/api/barbers')
      .then(res => res.json())
      .then(setBarbers);
  }, []);

  // Fetch services when barber changes
  useEffect(() => {
    if (selectedBarber) {
      fetch(`/api/barbers/${selectedBarber}/services`)
        .then(res => res.json())
        .then(setServices);
      setSelectedService('');
      setSelectedDate('');
      setSelectedTime('');
    }
  }, [selectedBarber]);

  // Fetch available times when date changes
  useEffect(() => {
    if (selectedDate && selectedBarber) {
      fetch(`/api/appointments/available?barberId=${selectedBarber}&date=${selectedDate}`)
        .then(res => res.json())
        .then(setAvailableTimes);
      setSelectedTime('');
    }
  }, [selectedDate, selectedBarber]);

  const handleConfirm = async () => {
    if (!selectedBarber || !selectedService || !selectedDate || !selectedTime) return;
    setLoading(true);
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        barberId: selectedBarber,
        serviceId: selectedService,
        date: new Date(`${selectedDate}T${selectedTime}`).toISOString(),
        userId,
      }),
    });
    if (response.ok) {
      alert('Agendamento confirmado!');
      // Reset form
      setSelectedBarber('');
      setSelectedService('');
      setSelectedDate('');
      setSelectedTime('');
    } else {
      alert('Erro ao agendar');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Barber Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Selecione o Barbeiro</label>
        <select
          value={selectedBarber}
          onChange={(e) => setSelectedBarber(e.target.value)}
          className="w-full px-3 py-2 bg-brand-surface text-brand-text border border-brand-accent rounded"
        >
          <option value="">Escolha um barbeiro</option>
          {barbers.map(barber => (
            <option key={barber.id} value={barber.id}>{barber.user.name}</option>
          ))}
        </select>
      </div>

      {/* Service Selector */}
      {selectedBarber && (
        <div>
          <label className="block text-sm font-medium mb-2">Selecione o Serviço</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-3 py-2 bg-brand-surface text-brand-text border border-brand-accent rounded"
          >
            <option value="">Escolha um serviço</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name} - R$ {service.price}</option>
            ))}
          </select>
        </div>
      )}

      {/* Date Picker */}
      {selectedService && (
        <div>
          <label className="block text-sm font-medium mb-2">Selecione a Data</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 bg-brand-surface text-brand-text border border-brand-accent rounded"
          />
        </div>
      )}

      {/* Time Slots */}
      {selectedDate && availableTimes.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">Selecione o Horário</label>
          <div className="grid grid-cols-4 gap-2">
            {availableTimes.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 rounded ${selectedTime === time ? 'bg-brand-accent text-brand-dark' : 'bg-brand-surface text-brand-text hover:bg-brand-accent/20'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation */}
      {selectedTime && (
        <div className="bg-brand-surface p-4 rounded">
          <h3 className="font-bold mb-2">Resumo do Agendamento</h3>
          <p>Barbeiro: {barbers.find(b => b.id === selectedBarber)?.user.name}</p>
          <p>Serviço: {services.find(s => s.id === selectedService)?.name}</p>
          <p>Data: {selectedDate}</p>
          <p>Horário: {selectedTime}</p>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="mt-4 w-full bg-brand-accent text-brand-dark py-2 rounded hover:bg-brand-accent/80 disabled:opacity-50"
          >
            {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
          </button>
        </div>
      )}
    </div>
  );
}