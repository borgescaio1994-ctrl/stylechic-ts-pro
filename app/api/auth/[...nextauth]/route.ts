// 📁 app/api/auth/[...nextauth]/route.ts

// Este arquivo funciona como o endpoint da API para todas as requisições de autenticação.
// Ele apenas re-exporta os handlers GET e POST configurados em '@/lib/auth'.

export { GET, POST } from "@/lib/auth";