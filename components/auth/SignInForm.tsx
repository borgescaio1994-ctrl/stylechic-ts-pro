// 📁 components/auth/SignInForm.tsx

"use client";

import React from 'react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
// Assegurando que a importação dos ícones do lucide-react esteja correta
import { LogIn, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';

// Mapeamento de provedores para ícones e cores
const providerMap = {
    google: {
        icon: LogIn,
        text: 'Continuar com Google'
    },
    email: { 
        icon: Mail, 
        text: 'Acesso por Email'
    },
};

interface SignInFormProps {
    providers: Record<BuiltInProviderType | string, ClientSafeProvider> | null;
}

/**
 * Formulário de login cliente que lida com a interação do usuário.
 */
export function SignInForm({ providers }: SignInFormProps) {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const getErrorMessage = (errorCode: string | null) => {
        switch (errorCode) {
            case 'OAuthAccountNotLinked':
                return 'Este email já está cadastrado com outro provedor. Tente novamente.';
            case 'EmailSignin':
                return 'Ocorreu um erro ao enviar o email. Verifique o servidor.';
            case 'CredentialsSignin':
                return 'Login e/ou senha inválidos.';
            case 'Configuration':
                return 'Erro de configuração do servidor.';
            default:
                return errorCode ? `Erro de Autenticação: ${errorCode}` : null;
        }
    };
    
    if (!providers) {
        return <p className="text-center text-red-500">Nenhum provedor de autenticação configurado.</p>;
    }

    const oauthProviders = Object.values(providers).filter(p => p.type !== 'email');
    const emailProvider = Object.values(providers).find(p => p.type === 'email');


    return (
        <div className="w-full max-w-md space-y-6">
            
            {/* Exibição de Erro */}
            {error && (
                <div 
                    className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                    role="alert"
                >
                    {getErrorMessage(error)}
                </div>
            )}

            <div className="space-y-4">
                {/* Botões para Provedores OAuth (Google, etc.) */}
                {oauthProviders.map((provider) => {
                    const providerConfig = providerMap[provider.id.toLowerCase() as keyof typeof providerMap];
                    const { icon: Icon, text } = providerConfig ||
                    { icon: LogIn, text: `Entrar com ${provider.name}` };
                    
                    return (
                        <Button
                            key={provider.id}
                            variant="outline"
                            size="lg"
                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                            onClick={() => signIn(provider.id)}
                        >
                            {/* Renderiza o ícone apenas se ele existir */}
                            {Icon && <Icon className="w-5 h-5 mr-2" />} 
                            {text}
                        </Button>
                    );
                })}

                {/* Seção do Login por Email (Apenas se o provedor estiver ativo) */}
                {emailProvider && (
                    <>
                        <div className="flex items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-sm">OU</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Implementação futura do formulário de email */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                             <Mail className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                             <p className="text-gray-600 text-sm">O formulário de **Login com Email** será adicionado na próxima etapa. Use o Google por enquanto.</p>
                             <Button
                                variant="outline"
                                className="w-full mt-3 bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                                size="lg"
                                onClick={() => alert("Próxima Etapa: Implementar formulário de Email/Credenciais")}
                            >
                                {providerMap.email.text}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}