import { apiSuccessResponse } from '@/backend/api_responses/apiResponses';
import { StatusCode, ValidationError } from '@/backend/exceptions/apiError';
import { globalExceptionHandler } from '@/backend/exceptions/globalExceptionHandler';
import { partsServiceProvider } from '@/backend/part/partsServiceProvider';

export async function GET() {
    try {
        const parts = await partsServiceProvider.getAllParts();
        return apiSuccessResponse(parts);
    } catch (error: unknown) {
        return globalExceptionHandler(error);
    }
}

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
        const { name, description } = body;
        if (typeof name !== 'string' || typeof description !== 'string') {
            throw new ValidationError('Invalid input data');
        }

        const newPart = await partsServiceProvider.createPart({
            name,
            description,
        });
        return apiSuccessResponse(newPart, StatusCode.CREATED);
    } catch (error: unknown) {
        return globalExceptionHandler(error);
    }
}
