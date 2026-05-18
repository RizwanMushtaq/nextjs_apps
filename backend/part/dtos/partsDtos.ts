// import { ValidationError } from '@/backend/exceptions/apiError';
// import { z } from 'zod';

// export const createPartSchema = z.object({
//     part_code: z.string().min(1),
//     name: z.string().min(1),
//     description: z.string().optional(),
// });

// export type CreatePartDto = z.infer<typeof createPartSchema>;

// export const updatePartSchema = createPartSchema.partial();
// export type UpdatePartDto = z.infer<typeof updatePartSchema>;

// export const validateCreatePartDto = (
//     createPartDto: CreatePartDto
// ): CreatePartDto => {
//     const result = createPartSchema.safeParse(createPartDto);
//     if (!result.success) {
//         throw new ValidationError(JSON.stringify(result.error.message));
//     }
//     return result.data;
// };

// export const validateUpdatePartDto = (
//     updatePartDto: UpdatePartDto
// ): UpdatePartDto => {
//     const result = updatePartSchema.safeParse(updatePartDto);
//     if (!result.success) {
//         throw new ValidationError(JSON.stringify(result.error.message));
//     }
//     return result.data;
// };
