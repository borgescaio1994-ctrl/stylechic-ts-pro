// 📁 app/login/page.tsx

import { getProviders } from "next-auth/react";
import CustomLoginForm from "@/components/auth/CustomLoginForm";

export default async function LoginPage() {
  // Obtém os provedores de autenticação configurados (Google, Credentials)
  const providers = await getProviders();
  const googleProvider = providers?.google;

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Acessar Sua Conta</h2>

        {/* Opção 1: Login com Google (Apenas se o provedor estiver disponível) */}
        {googleProvider && (
          <a
            // A URL de signin é fornecida pelo NextAuth
            href={googleProvider.signinUrl}
            className="w-full flex justify-center items-center py-3 px-4 mb-6 border border-gray-300 rounded-lg shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
          >
            {/* Você deve ter um ícone do Google na pasta /public (e.g., /google.svg) */}
            <img src="/google.svg" alt="Google" className="w-5 h-5 mr-3" />
            Continuar com Google
          </a>
        )}
        
        {/* Separador "OU" */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">OU</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Opção 2: Formulário de Cadastro/Login Manual (Client Component) */}
        {/* Este componente contém a lógica de estado e a mudança entre Login e Cadastro */}
        <CustomLoginForm />

      </div>
    </div>
  );
}