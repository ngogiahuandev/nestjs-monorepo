import { z } from 'zod';
import * as dotenv from 'dotenv';
import * as process from 'process';

// Load .env
dotenv.config();

// Define schema
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  ACCESS_TOKEN_SECRET: z.string().default(''),
  ACCESS_TOKEN_EXPIRE_IN: z.string().default('15m'),
  REFRESH_TOKEN_SECRET: z.string().default(''),
  REFRESH_TOKEN_EXPIRE_IN: z.string().default('7d'),
});

// Parse & validate
const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error('Invalid environment variables:', result.error.format());
  process.exit(1);
} else {
  console.log('Environment variables are valid');
}

export const env = result.data;
export type Env = typeof env;
