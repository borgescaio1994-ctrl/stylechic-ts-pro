// 📁 app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth"; // Certifique-se de que este caminho está correto

export const { GET, POST } = handlers;