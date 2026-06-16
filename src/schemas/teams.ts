import { z } from "zod";

export const createTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  gender: z.enum(["Male", "Female", "Mixed"]),
});

export const updateTeamSchema = z.object({
  id: z.number().int().positive(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  gender: z.enum(["Male", "Female", "Mixed"]),
});

export const deleteTeamSchema = z.object({
  id: z.number().int().positive(),
});
