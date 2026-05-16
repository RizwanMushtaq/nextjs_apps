import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    DATABASE_URL: z.string().startsWith('file:'),
});

export const nodeEnv = envSchema.shape.NODE_ENV.enum;

const parsedEnv = envSchema.safeParse(process.env);
if (parsedEnv.error) {
    console.error('Invalid environment variables', parsedEnv.error);
    throw new Error('Invalid environment variables');
}

export const appEnv = parsedEnv.data;
