import { ValidationError } from '@/backend/exceptions/apiError';
import z from 'zod';

export const createUserSchema = z.object(
    {
        name: z.string().min(1),
        email: z.email(),
        password: z.string().min(6),
    },
    { message: 'Invalid input data.' }
);
export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial();
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export const validateCreateUserDto = (data: unknown): CreateUserDto => {
    const result = createUserSchema.safeParse(data);
    if (!result.success) {
        throw new ValidationError(JSON.stringify(result.error.message));
    }
    return result.data;
};

export const validateUpdateUserDto = (data: unknown): UpdateUserDto => {
    const result = updateUserSchema.safeParse(data);
    if (!result.success) {
        throw new ValidationError(JSON.stringify(result.error.message));
    }
    return result.data;
};
