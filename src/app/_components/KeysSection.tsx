"use client";

import { useState } from "react";
import Button from "./Button";

export default function KeysSection() {
  const [gender, setGender] = useState<"masc" | "fem">("masc");

  return (
    <section className="px-6 py-6">
      <h2 className="text-lg font-semibold text-white mb-4">CHAVEAMENTO</h2>

      <div className="flex items-center gap-3 mb-6">
        <Button
          noBg
          onClick={() => setGender("masc")}
          className={`px-4 py-2 font-semibold rounded-xl transition ${
            gender === "masc"
              ? "bg-orange-500 text-black"
              : "border border-white/20 text-white hover:bg-white/10"
          }`}
        >
          Masculino
        </Button>

        <Button
          noBg
          onClick={() => setGender("fem")}
          className={`px-4 py-2 font-semibold rounded-xl transition ${
            gender === "fem"
              ? "bg-orange-500 text-black"
              : "border border-white/20 text-white hover:bg-white/10"
          }`}
        >
          Feminino
        </Button>
      </div>

      <div className="border border-dashed border-white/20 rounded-xl py-16 text-center text-white/60 bg-neutral-900/30">
        {gender === "masc"
          ? "Chaveamento masculino não gerado ainda."
          : "Chaveamento feminino não gerado ainda."}
      </div>
    </section>
  );
}
