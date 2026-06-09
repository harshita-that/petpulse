import { z } from "zod";

export type Pet = {
  id: string;
  user_id: string;
  name: string;
  breed: string | null;
  age: number | null;
  weight: number | null;
  sex: "male" | "female" | "unknown" | null;
  color: string | null;
  conditions: string[];
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export const createPetSchema = z.object({
  name: z.string().min(1).max(100),
  breed: z.string().optional(),
  age: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  sex: z.enum(["male", "female", "unknown"]).optional(),
  color: z.string().optional(),
  conditions: z.array(z.string()).optional(),
  avatar_url: z.string().url().optional(),
});

export type CreatePetInput = z.infer<typeof createPetSchema>;

export const updatePetSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100).optional(),
  breed: z.string().optional(),
  age: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  sex: z.enum(["male", "female", "unknown"]).optional(),
  color: z.string().optional(),
  conditions: z.array(z.string()).optional(),
  avatar_url: z.string().url().optional(),
});

export type UpdatePetInput = z.infer<typeof updatePetSchema>;
