import { Cup } from "@/types/cup";

type CreateCupRequest = {
  name: string;
  startDate: string;
  endDate: string;
  userId: string;
};

function getApiUrl(path: string) {
  if (typeof window !== "undefined") {
    return path;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000");

  return new URL(path, baseUrl).toString();
}

export async function createCup(body: CreateCupRequest): Promise<Cup> {
  const response = await fetch(getApiUrl("/api/cups/create"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status} - ${error.message}`);
  }
  const data = await response.json();

  return data.cup;
}

export async function getCups(): Promise<Cup[]> {
  const response = await fetch(getApiUrl("/api/cups/list"));

  if (!response.ok) {
    throw new Error("Erro ao buscar copas");
  }
  const data = await response.json();
  return data.cups;
}
