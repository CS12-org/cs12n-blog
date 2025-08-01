import { z } from "zod";

const configSchema = z.object({
  SECRET: z.string().min(1),
  NEXT_PUBLIC_API_URL: z.url().min(1),
});

const config = configSchema.parse({
  SECRET: process.env.SECRET,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

export default config;
