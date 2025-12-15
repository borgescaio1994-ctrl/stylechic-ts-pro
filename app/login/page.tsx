import CustomLoginForm from "@/components/auth/CustomLoginForm";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton"; // Importar o novo botão

export default async function LoginPage() {
  // getProviders() e googleProvider removidos
  
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Acessar Sua Conta</h2>

        {/* Opção 1: Login com Google (Usando o Componente Cliente) */}
        <GoogleSignInButton />
        
        {/* Separador "OU" */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">OU</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Opção 2: Formulário de Cadastro/Login Manual */}
        <CustomLoginForm />

      </div>
    </div>
  );
}