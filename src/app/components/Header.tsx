"use client";
import {
  Flame,
  Menu,
  X,
  Settings,
  LayoutGrid,
  Award,
  Plus,
  Trash2,
  Trophy,
} from "lucide-react";
import Button from "./Button";
import CopaSelect from "./CopaSelect";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<
    "equipes" | "chaves" | "certificados"
  >("equipes");
  const [selectedCopa, setSelectedCopa] = useState<string>("copa-fenix-2025");

  return (
    <>
      <header className="bg-card/70 text-foreground px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden cursor-pointer"
              onClick={() => {
                setActiveMenu("equipes");
                setOpen(true);
              }}
            >
              <Menu size={22} />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500">
                <Flame size={25} className="text-black" />
              </div>
              <div className="leading-tight">
                <p className="text-xl font-semibold">Copa Fênix 2026</p>
                <span className="text-xs text-muted-foreground">
                  01/05/2026
                </span>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                noBg
                onClick={() => setActiveMenu("equipes")}
                className={`rounded-xl px-3 py-2 transition ${
                  activeMenu === "equipes" ? "bg-white/10" : ""
                }`}
              >
                <Settings />
                Equipes
              </Button>
              <Button
                noBg
                onClick={() => setActiveMenu("chaves")}
                className={`rounded-xl px-3 py-2 transition ${
                  activeMenu === "chaves" ? "bg-white/10" : ""
                }`}
              >
                <LayoutGrid />
                Chaves
              </Button>
              <Button
                noBg
                onClick={() => setActiveMenu("certificados")}
                className={`rounded-xl px-3 py-2 transition ${
                  activeMenu === "certificados" ? "bg-white/10" : ""
                }`}
              >
                <Award />
                Certificados
              </Button>
            </div>

            <div className="flex h-6 items-center gap-2 border-l border-border pl-4 ml-2">
              <div className="relative min-h-10 min-w-45">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-orange-400">
                  <Trophy size={16} />
                </div>

                <CopaSelect
                  options={[
                    { value: "copa-fenix-2026", label: "Copa Fênix 2026" },
                    { value: "copa-fenix-2025", label: "Copa Fênix 2025" },
                    { value: "copa-fenix-2024", label: "Copa Fênix 2024" },
                  ]}
                  value={selectedCopa}
                  onChange={setSelectedCopa}
                  icon={<Trophy size={16} className="text-orange-400" />}
                />
              </div>

              <Button className="border rounded-xl border-white/20">
                <Plus />
              </Button>
              <Button className="min-h-10 px-4 rounded-xl flex items-center justify-center">
                <Trash2 size={17} className="text-red-500" />
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-full w-[80%] max-w-xs
          bg-neutral-900
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500">
              <Flame size={25} className="text-black" />
            </div>

            <div>
              <p className="text-lg font-semibold text-foreground">
                Copa Fênix 2026
              </p>
              <span className="text-xs text-muted-foreground">01/05/2026</span>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-foreground cursor-pointer p-2 hover:bg-foreground/10 rounded-xl transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 pb-32 text-sm text-muted-foreground">
          <div className="flex flex-col">
            <Button
              onClick={() => setActiveMenu("equipes")}
              noBg
              className={`
                flex items-center gap-3 rounded-xl transition
                ${
                  activeMenu === "equipes"
                    ? "bg-orange-500/20 hover:bg-orange-500/25"
                    : "hover:bg-white/5"
                }
              `}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className={`
                  p-2 rounded-lg transition
                  ${
                    activeMenu === "equipes"
                      ? "bg-orange-400 text-black"
                      : "bg-muted/40 text-foreground"
                  }
                `}
                >
                  <Settings />
                </div>

                <div className="flex flex-col items-start">
                  <p
                    className={`
                    text-lg font-medium
                    ${
                      activeMenu === "equipes"
                        ? "text-orange-500"
                        : "text-foreground"
                    }
                  `}
                  >
                    Equipes
                  </p>
                  <span className="text-sm text-muted-foreground">
                    Gerenciar equipes e atletas
                  </span>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => setActiveMenu("chaves")}
              noBg
              className={`
                flex items-center gap-3 rounded-xl transition
                ${
                  activeMenu === "chaves"
                    ? "bg-orange-500/20 hover:bg-orange-500/25"
                    : "hover:bg-white/5"
                }
              `}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className={`
                    p-2 rounded-lg transition
                    ${
                      activeMenu === "chaves"
                        ? "bg-orange-400 text-black"
                        : "bg-muted/40 text-foreground"
                    }
                  `}
                >
                  <LayoutGrid />
                </div>

                <div className="flex flex-col items-start">
                  <p
                    className={`
                      text-lg font-medium
                      ${
                        activeMenu === "chaves"
                          ? "text-orange-500"
                          : "text-foreground"
                      }
                    `}
                  >
                    Chaves
                  </p>
                  <span className="text-sm text-muted-foreground">
                    Ver chaveamento e lutas
                  </span>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => setActiveMenu("certificados")}
              noBg
              className={`
                flex items-center gap-3 rounded-xl transition
                ${
                  activeMenu === "certificados"
                    ? "bg-orange-500/20 hover:bg-orange-500/25"
                    : "hover:bg-white/5"
                }
              `}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className={`
                    p-2 rounded-lg transition
                    ${
                      activeMenu === "certificados"
                        ? "bg-orange-400 text-black"
                        : "bg-muted/40 text-foreground"
                    }
                  `}
                >
                  <Award />
                </div>

                <div className="flex flex-col items-start">
                  <p
                    className={`
                      text-lg font-medium
                      ${
                        activeMenu === "certificados"
                          ? "text-orange-500"
                          : "text-foreground"
                      }
                    `}
                  >
                    Certificados
                  </p>
                  <span className="text-sm text-muted-foreground">
                    Conquistas dos atletas
                  </span>
                </div>
              </div>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 w-full border-t border-white/10 bg-neutral-900">
          <div className="px-4 pt-3 pb-2 text-xs text-white/70">
            Trocar campeonato
          </div>

          <div className="flex items-center gap-2 px-4 pb-4">
            <div className="relative flex-1 min-w-0">
              <CopaSelect
                options={[
                  { value: "copa-fenix-2026", label: "Copa Fênix 2026" },
                  { value: "copa-fenix-2025", label: "Copa Fênix 2025" },
                  { value: "copa-fenix-2024", label: "Copa Fênix 2024" },
                ]}
                value={selectedCopa}
                onChange={setSelectedCopa}
                icon={<Trophy size={14} className="text-amber-400" />}
              />
            </div>

            <Button
              className="
                shrink-0
                border border-white/10
                rounded-xl
                text-foreground
                hover:bg-white/10
                transition
              "
            >
              <Plus />
            </Button>

            <Button className="shrink-0 rounded-xl">
              <Trash2 size={16} className="text-red-500" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
