import { apiSuccessResponse } from '@/backend/api_responses/apiResponses';
import { globalExceptionHandler } from '@/backend/exceptions/globalExceptionHandler';
import { partsServiceProvider } from '@/backend/part/partsServiceProvider';
import { NumberDtoSchema } from '@/shared/utils/zodUtils';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const receivedPageNumber = url.searchParams.get('pageNumber');
        const receivedPageSize = url.searchParams.get('pageSize');
        const validatedPageNumber = NumberDtoSchema.parse(receivedPageNumber);
        const validatedPageSize = NumberDtoSchema.parse(receivedPageSize);

        const parts = await partsServiceProvider.getAllParts(
            validatedPageNumber,
            validatedPageSize
        );
        return apiSuccessResponse({ data: parts });
    } catch (error: unknown) {
        return globalExceptionHandler(error);
    }
}

// export async function POST(req: Request) {
//     try {
//         const requestBody = await req.json();
//         const validatedBody = validateCreatePartDto(requestBody);
//         const createPartInput: CreatePartInput = {
//             part_code: validatedBody.part_code,
//             name: validatedBody.name,
//             description: validatedBody.description,
//         };
//         const createdPart =
//             await partsServiceProvider.createPart(createPartInput);
//         return apiSuccessResponse({
//             data: createdPart,
//             status: StatusCode.CREATED,
//         });
//     } catch (error: unknown) {
//         return globalExceptionHandler(error);
//     }
// }
