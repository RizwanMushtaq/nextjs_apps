import { z } from 'zod';

export const createPartSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
});

export type CreatePartDto = z.infer<typeof createPartSchema>;
