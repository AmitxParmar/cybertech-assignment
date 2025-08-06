import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.email(),
  password: z.string().min(6).max(100),
  bio: z.string().max(280).optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  bio: z.string().max(280).optional(),
});

export const createPostSchema = z.object({
  content: z.string().min(1).max(1000),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
