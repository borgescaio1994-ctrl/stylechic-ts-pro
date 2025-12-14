// 📁 app/api/auth/[...nextauth]/route.ts (Verificação Final)

import NextAuth from "next-auth";
// Caminho absoluto baseado na raiz do projeto, geralmente mais seguro:
import authOptions from "@/lib/auth"; 
// Se o caminho absoluto não funcionar, use este (subindo 4 níveis):
// import authOptions from "../../../../lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 