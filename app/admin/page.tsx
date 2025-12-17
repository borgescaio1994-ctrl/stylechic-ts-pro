// 📁 app/admin/page.tsx

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // 1. Redireciona para o login se não houver sessão
  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  // 2. Redireciona para a home se não for admin
  if (session.user.role !== 'ADMIN') {
    // Redireciona para a página inicial se não for admin
    redirect("/");
  }

  return <AdminDashboard />;
}