import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    API: z.string().url(),
    KEY: z.string()
});

const env = envSchema.parse(process.env);

export const config = {
    API: env.API,
    GOOGLE_KEY: env.KEY
}