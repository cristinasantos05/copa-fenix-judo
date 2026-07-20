import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email("Invalid email address").trim(),
  name: z.string().trim().min(1, "Name cannot be empty").optional(),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(255, "Password must be less than 255 characters"),
});

export const updateUserSchema = z.object({
  id: z.number().int().positive(),
  email: z.email("Invalid email address").trim().optional(),
  name: z.string().trim().min(1, "Name cannot be empty").optional(),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(255, "Password must be less than 255 characters")
    .optional(),
});

export const deleteUserSchema = z.object({
  id: z.number().int().positive(),
});
