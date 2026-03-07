"use client";
import { Plus } from "lucide-react";
import Button from "./Button";
import { useState } from "react";

export default function TeamsSection() {
  const [filter, setFilter] = useState("todos");

  return (
    <section className="px-6 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">EQUIPES (0)</h2>
          <p className="text-sm text-white/60">M: 0 | F: 0</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setFilter("todos")}
              className={`px-3 font-bold ${
                filter === "todos"
                  ? "bg-white/10 text-white"
                  : "text-white hover:text-white"
              }`}
            >
              Todos
            </Button>

            <Button
              onClick={() => setFilter("masc")}
              className={`px-3 font-bold ${
                filter === "masc"
                  ? "bg-white/10 text-white"
                  : "text-white hover:text-white"
              }`}
            >
              Masc
            </Button>

            <Button
              onClick={() => setFilter("fem")}
              className={`px-3 font-bold ${
                filter === "fem"
                  ? "bg-white/10 text-white"
                  : "text-white hover:text-white"
              }`}
            >
              Fem
            </Button>
          </div>

          <Button
            noBg
            className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-lg font-bold"
          >
            <Plus size={16} />
            Nova
          </Button>
        </div>
      </div>
      <div className="border border-dashed rounded-xl border-white/30 roudend-xl py-12 text-center text-white/60 bg-neutral-900/30">
        Nenhuma equipe cadastrada. Adicione a primeira equipe!
      </div>
    </section>
  );
}
