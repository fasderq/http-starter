import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  GLOBAL_PREFIX: z.string().trim().min(1).default('api'),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const validateEnv = (env: Record<string, unknown>): EnvSchema =>
  envSchema.parse(env);
