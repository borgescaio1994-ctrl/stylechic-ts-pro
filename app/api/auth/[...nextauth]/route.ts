// 📁 app/api/auth/[...nextauth]/route.ts

// SOLUÇÃO FINAL DE CAMINHO RELATIVO: 
// Subimos 3 níveis para acessar o arquivo 'auth.ts' que está na RAIZ do projeto.
// O caminho é: [...nextauth] <- auth <- api <- app <- (RAIZ / auth.ts)
import { handlers } from "../../../auth"; 

// Exportamos o handlers, que o NextAuth criou e que contém as funções GET e POST
// necessárias para o Next.js App Router capturar as requisições de autenticação.
export const { GET, POST } = handlers;