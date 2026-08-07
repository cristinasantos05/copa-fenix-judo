"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Flame, Plus, Trophy, ArrowRight, Trash2 } from "lucide-react";
import { getCups, createCup } from "@/services/cup";
import { Cup } from "@/types/cup";

export default function CopasPage() {
  return <CopasContent />;
}

function isFinished(cup: Cup) {
  return new Date(cup.endDate) < new Date();
}

function CopasContent() {
  const router = useRouter();
  const { user } = useUser();
  const [cups, setCups] = useState<Cup[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadCups() {
      try {
        const cups = await getCups();
        if (isMounted) {
          setCups(cups);
        }
      } catch (error) {
        console.error("Erro ao buscar copas:", error);
      }
    }

    loadCups();

    return () => {
      isMounted = false;
    };
  }, []);

  function setSelectedCupId(cupId: number) {
    document.cookie = `selectedCupId=${cupId}; path=/; max-age=${60 * 60 * 24 * 365}; sameSite=lax`;
  }

  async function handleCreate() {
    if (!name.trim() || !user?.id) {
      console.error("Usuário não autenticado ou nome vazio");
      return;
    }
    setIsCreating(true);
    try {
      const createdCup = await createCup({
        name,
        startDate: date,
        endDate: date,
        userId: user.id,
      });
      setSelectedCupId(createdCup.id);
      router.push("/");
    } catch (error) {
      console.error("Erro ao criar copa:", error);
    } finally {
      setIsCreating(false);
    }
  }

  function handleOpen(cupId: number) {
    setSelectedCupId(cupId);
    router.push("/");
  }

  function handleDelete(cupId: number) {
    console.log("Deletar copa (ainda não implementado):", cupId);
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-4 py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 mb-5">
        <Flame size={32} className="text-black" />
      </div>

      <h1 className="text-3xl font-bold text-white tracking-wide mb-2">
        COPA FÊNIX
      </h1>
      <p className="text-sm text-neutral-400 mb-10">
        Selecione uma copa existente ou crie uma nova para começar
      </p>

      <div className="w-full max-w-2xl border border-orange-500/40 rounded-2xl p-6 mb-10">
        <div className="flex items-center gap-2 text-orange-400 font-semibold mb-4">
          <Plus size={18} />
          CRIAR NOVA COPA
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Copa Fênix 2026"
            className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors scheme-dark"
          />
          <button
            onClick={handleCreate}
            disabled={isCreating || !name.trim()}
            className="shrink-0 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Criar
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <p className="text-xs text-neutral-500 tracking-wide mb-3">
          COPAS SALVAS ({cups.length})
        </p>

        <div className="flex flex-col gap-3">
          {cups.map((cup: Cup) => (
            <div
              key={cup.id}
              className="flex items-center justify-between bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <Trophy size={20} className="text-neutral-500" />
                <div>
                  <p className="text-white font-medium">{cup.name}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(cup.endDate).toLocaleDateString("pt-BR")}
                    {` · ${cup.teams.length} equipe${
                      cup.teams.length !== 1 ? "s" : ""
                    }`}
                    {isFinished(cup) && " · Finalizada"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleOpen(cup.id)}
                  className="flex items-center gap-1 text-sm text-white font-medium hover:text-orange-400 transition-colors"
                >
                  Abrir
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => handleDelete(cup.id)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
