import { apiSuccessResponse } from '@/backend/api_responses/apiResponses';
import { StatusCode } from '@/backend/exceptions/apiError';
import { globalExceptionHandler } from '@/backend/exceptions/globalExceptionHandler';
import { CreatePartInput } from '@/backend/part/domain/partsDomain';
import { validateCreatePartDto } from '@/backend/part/dtos/partsDtos';
import { partsServiceProvider } from '@/backend/part/partsServiceProvider';

export async function GET() {
    try {
        const parts = await partsServiceProvider.getAllParts();
        return apiSuccessResponse({ data: parts });
    } catch (error: unknown) {
        return globalExceptionHandler(error);
    }
}

export async function POST(req: Request) {
    try {
        const requestBody = await req.json();
        const validatedBody = validateCreatePartDto(requestBody);
        const createPartInput: CreatePartInput = {
            part_code: validatedBody.part_code,
            name: validatedBody.name,
            description: validatedBody.description,
        };
        const createdPart =
            await partsServiceProvider.createPart(createPartInput);
        return apiSuccessResponse({
            data: createdPart,
            status: StatusCode.CREATED,
        });
    } catch (error: unknown) {
        return globalExceptionHandler(error);
    }
}
