import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

const parsedEnv = clientEnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables');
  console.error(parsedEnv.error.issues);

  throw new Error('Invalid environment variables.');
}

export const env = parsedEnv.data;
