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

export const NumberDtoSchema = z.string().transform((value, ctx) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 1) {
        ctx.addIssue({
            code: 'custom',
            message: 'Page number must be a positive integer',
        });
        return z.NEVER;
    }
    return parsed;
});
