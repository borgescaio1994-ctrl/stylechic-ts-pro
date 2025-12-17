// 📁 app/api/auth/[...nextauth]/route.ts

// Importa diretamente as funções de handler (GET e POST) 
// exportadas no arquivo de configuração do NextAuth (@/lib/auth)
import { GET, POST } from "@/lib/auth"; 

// Re-exporta as funções para que o Next.js App Router as use
export { GET, POST };