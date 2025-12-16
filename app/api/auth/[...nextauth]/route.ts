// 📁 app/api/auth/[...nextauth]/route.ts (CORREÇÃO FINAL DO 405)

// Importa os handlers GET e POST que são exportados de lib/auth.ts
import { GET, POST } from "@/lib/auth"; 

// Exporta as funções para que o Next.js as reconheça como endpoints
export { GET, POST };