// 📁 app/api/auth/[...nextauth]/route.ts

// Usando o alias '@/auth', que agora o tsconfig.json garante que aponte para a raiz.
import { handlers } from "@/auth"; 

// Exporta as funções GET e POST necessárias para o NextAuth no App Router.
export const { GET, POST } = handlers;