import { ValidationError } from '@/backend/exceptions/apiError';
import z from 'zod';

const idParamSchema = z.string().min(1, { message: 'ID is required' });

export type IdParam = z.infer<typeof idParamSchema>;

export const validateIdParam = (params: IdParam) => {
    const result = idParamSchema.safeParse(params);
    if (!result.success) {
        throw new ValidationError(JSON.stringify(result.error.message));
    }
    return result.data;
};
