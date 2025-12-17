// 📁 app/agendamento/page.tsx

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { AgendamentoForm } from "@/components/AgendamentoForm";

export default async function AgendamentoPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/agendamento");
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center text-brand-accent mb-12">
          Agendar Serviço
        </h1>
        <AgendamentoForm userId={session.user.id} />
      </div>
      <Footer />
    </div>
  );
}