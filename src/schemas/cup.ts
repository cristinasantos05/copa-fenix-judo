import { z } from "zod";

export const createCupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export const deleteCupSchema = z.object({
  id: z.number().int().positive(),
});

export const updateCupSchema = z.object({
  id: z.number().int().positive(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});
