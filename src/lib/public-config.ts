import { z } from "zod";

const publicConfigSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url().min(1),
});

const publicConfig = publicConfigSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

export default publicConfig;
