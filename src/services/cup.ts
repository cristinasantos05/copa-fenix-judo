import { Cup } from "@/types/cup";

export async function getCups(): Promise<Cup[]> {
  const response = await fetch("/api/cups/list");

  if (!response.ok) {
    throw new Error("Erro ao buscar copas");
  }
  const data = await response.json();
  return data.cups;
}
