import { z } from "zod";

export const createLineUpSchema = z.object({
  bracketId: z.number().int().positive(),
});

export const updateLineUpSchema = z.object({
  id: z.number().int().positive(),
  bracketId: z.number().int().positive(),
});

export const deleteLineUpSchema = z.object({
  id: z.number().int().positive(),
});
