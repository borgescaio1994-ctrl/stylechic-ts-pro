// 📁 components/auth/CustomLoginForm.tsx

"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function CustomLoginForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    birthdate: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isRegistering) {
      // TENTA CADASTRO MANUAL
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('✅ Cadastro realizado com sucesso! Tentando Login...');
          
          // TENTA FAZER LOGIN MANUALMENTE APÓS O CADASTRO
          const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
          });

          if (result?.error) {
            setMessage('Erro no login automático. Por favor, entre manualmente.');
          } else {
            window.location.href = '/'; 
          }

        } else {
          setMessage(`Erro no Cadastro: ${data.message || 'Dados inválidos.'}`);
        }
      } catch (error) {
        setMessage('Erro de conexão ou servidor ao registrar.');
      }
    } else {
        // TENTA FAZER LOGIN MANUAL (VIA Credentials Provider)
        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (result?.error) {
            setMessage('Erro no Login. Verifique suas credenciais.');
        } else {
            window.location.href = result?.url || '/';
        }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        {/* Toggle para Cadastro */}
        <div className="text-center mb-6">
            <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-150"
            >
                {isRegistering ? 'Já tenho conta? Entrar' : 'Novo por aqui? Cadastrar-se'}
            </button>
        </div>

        {/* Campos de Cadastro Adicionais */}
        {isRegistering && (
            <>
                <div>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Nome Completo"
                        required 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Nome de Usuário (único)"
                        required 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500">Data de Nascimento:</label>
                    <input 
                        type="date" 
                        name="birthdate" 
                        required 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Telefone (e.g., 5511987654321)"
                        required 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </>
        )}

        {/* Campos de Login/Cadastro Comuns */}
        <div>
            <input 
                type="email" 
                name="email" 
                placeholder="E-mail"
                required 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div>
            <input 
                type="password" 
                name="password" 
                placeholder="Senha"
                required 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        {/* Botão Principal */}
        <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 font-semibold disabled:opacity-50"
        >
            {loading ? 'Processando...' : (isRegistering ? 'Finalizar Cadastro' : 'Entrar na Conta')}
        </button>

        {/* Mensagem de Status */}
        {message && (
            <p className={`text-center text-sm mt-4 ${message.includes('Erro') ? 'text-red-500' : 'text-green-600'}`}>
                {message}
            </p>
        )}
    </form>
  );
}