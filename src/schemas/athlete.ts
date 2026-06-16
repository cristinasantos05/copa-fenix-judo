import { z } from "zod";

export const athleteSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  age: z.number().int().positive(),
  weight: z.number().positive(),
  teamId: z.number().int().positive(),
});

export const updateAthleteSchema = athleteSchema.extend({
  id: z.number().int().positive(),
});
