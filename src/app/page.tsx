"use client";
import { Swords, Trophy, Users, Medal } from "lucide-react";
import Header from "./components/Header";
import ModelCard from "./components/ModelCard";
import TeamsSection from "./components/TeamsSection";
import { useState } from "react";
import CertificatesSection from "./components/CertificatesSection";
import KeysSection from "./components/KeysSection";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<
    "equipes" | "chaves" | "certificados"
  >("equipes");

  return (
    <>
      <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <section className="px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ModelCard
            icon={<Users className="text-orange-400" />}
            value="0M / 0F"
            label="Equipes"
            highlight
          />

          <ModelCard
            icon={<Swords className="text-white/70" />}
            value="0"
            label="Atletas"
          />

          <ModelCard
            icon={<Trophy className="text-white/70" />}
            value="0"
            label="Confrontos"
          />

          <ModelCard
            icon={<Medal className="text-orange-400" />}
            value="0"
            label="Certificados"
            highlight
          />
        </div>
      </section>
      {activeMenu === "equipes" && <TeamsSection />}
      {activeMenu === "certificados" && <CertificatesSection />}
      {activeMenu === "chaves" && <KeysSection />}
    </>
  );
}
