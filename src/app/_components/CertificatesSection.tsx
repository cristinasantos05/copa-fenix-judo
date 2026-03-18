"use client";

import { Medal } from "lucide-react";

export default function CertificatesSection() {
  return (
    <section className="px-6 py-6">
      <div className="border border-dashed rounded-xl border-white/30 roudend-xl py-12 text-center text-white/60 bg-neutral-900/30">
        <div className="flex flex-col items-center justify-center text-center gap-3 text-white/60 w-full">
          <Medal size={40} className="text-white/50" />
          <p className="text-lg">Nenhum certificado conquistado ainda.</p>

          <p className="text-sm text-white/50">
            Certificados são gerados automaticamente durante as lutas.
          </p>
        </div>
      </div>
    </section>
  );
}
