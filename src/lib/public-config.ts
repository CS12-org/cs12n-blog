import { z } from "zod";

const publicConfigSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const publicConfig = publicConfigSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
