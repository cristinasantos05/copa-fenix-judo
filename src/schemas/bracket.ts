import { z } from "zod";

export const createBracketSchema = z.object({
  cupId: z.number().int().positive(),
  teamIds: z
    .array(z.number().int().positive())
    .min(1, "At least one team is required"),
});

export const updateBracketSchema = z.object({
  id: z.number().int().positive(),
  cupId: z.number().int().positive(),
});
