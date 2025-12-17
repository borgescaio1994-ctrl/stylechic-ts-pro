// 📁 app/page.tsx (LANDING PAGE COMPLETA)

import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { Servicos } from "@/components/landing/Servicos";
import { Barbeiros } from "@/components/landing/Barbeiros";
import { Galeria } from "@/components/landing/Galeria";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

// Server Component
export default function Home() {
    return (
        <div className="min-h-screen bg-brand-dark text-brand-text">
            <Header />
            <Hero />
            <Servicos />
            <Barbeiros />
            <Galeria />
            <CTA />
            <Footer />
        </div>
    );
}