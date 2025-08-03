import { z } from "zod";

const serverConfigSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
});

export const serverConfig = serverConfigSchema.parse({
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});
