import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

function getEnv() {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (!parsed.success) {
    if (typeof window !== 'undefined') {
      console.warn('Invalid environment variables', parsed.error.issues);
      return { NEXT_PUBLIC_API_URL: '' };
    }

    console.error('Invalid environment variables');
    console.error(parsed.error.issues);
    throw new Error('Invalid environment variables.');
  }

  return parsed.data;
}

export const env = getEnv();
