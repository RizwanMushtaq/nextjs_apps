// import { apiSuccessResponse } from '@/backend/api_responses/apiResponses';
// import { StatusCode } from '@/backend/exceptions/apiError';
// import { globalExceptionHandler } from '@/backend/exceptions/globalExceptionHandler';
// import { UpdatePartInput } from '@/backend/part/domain/partsDomain';
// import { validateUpdatePartDto } from '@/backend/part/dtos/partsDtos';
// import { partsServiceProvider } from '@/backend/part/partsServiceProvider';
// import { RouteContext } from '@/shared/utils/routeUtils';
// import { removeUndefined } from '@/shared/utils/utils';
// import { validateIdParam } from '@/shared/utils/zodUtils';

// export async function GET(_request: Request, { params }: RouteContext) {
//     try {
//         const { id } = await params;
//         const validatedId = validateIdParam(id);
//         const part = await partsServiceProvider.getPartById(validatedId);
//         return apiSuccessResponse({ data: part });
//     } catch (error: unknown) {
//         return globalExceptionHandler(error);
//     }
// }

// export async function PUT(request: Request, { params }: RouteContext) {
//     try {
//         const { id } = await params;
//         const validatedId = validateIdParam(id);
//         const body = await request.json();
//         const validatedBody = validateUpdatePartDto(body);
//         const createPartInput: UpdatePartInput = removeUndefined({
//             part_code: validatedBody.part_code,
//             name: validatedBody.name,
//             description: validatedBody.description,
//         });
//         const part = await partsServiceProvider.updatePart(
//             validatedId,
//             createPartInput
//         );
//         return apiSuccessResponse({ data: part });
//     } catch (error: unknown) {
//         return globalExceptionHandler(error);
//     }
// }

// export async function DELETE(_request: Request, { params }: RouteContext) {
//     try {
//         const { id } = await params;
//         const validatedId = validateIdParam(id);
//         await partsServiceProvider.deletePart(validatedId);
//         return apiSuccessResponse({
//             data: null,
//             status: StatusCode.NO_CONTENT,
//         });
//     } catch (error: unknown) {
//         return globalExceptionHandler(error);
//     }
// }
