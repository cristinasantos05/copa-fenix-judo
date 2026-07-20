import { z } from "zod";

export const createJudoClubSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  cupIds: z.array(z.number().int().positive()).optional(),
});

export const deleteJudoClubSchema = z.object({
  id: z.number().int().positive(),
});

export const updateJudoClubSchema = z.object({
  id: z.number().int().positive(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters")
    .optional(),
});
