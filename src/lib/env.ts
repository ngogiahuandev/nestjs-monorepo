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
  POSTGRES_USER: z.string().default('postgres'),
  POSTGRES_PASSWORD: z.string().default('postgres'),
  POSTGRES_DB: z.string().default('postgres'),
  MINIO_TOKEN: z.string().default('MINIO_INJECT_TOKEN'),
  MINIO_PORT: z.coerce.number().default(9000),
  MINIO_CONSOLE_PORT: z.coerce.number().default(8000),
  MINIO_USER: z.string().default('admin'),
  MINIO_PASSWORD: z.string().default('veryhardpassword'),
  MINIO_BUCKET: z.string().default('main'),
  MINIO_ENDPOINT: z.string().default('localhost'),
  MINIO_ACCESS_KEY: z.string().default(''),
  MINIO_SECRET_KEY: z.string().default(''),
  MINIO_PUBLIC_URL: z.string().default(''),
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
