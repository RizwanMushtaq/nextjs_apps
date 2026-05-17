import { apiSuccessResponse } from '@/backend/api_responses/apiResponses';
import { StatusCode, ValidationError } from '@/backend/exceptions/apiError';
import { globalExceptionHandler } from '@/backend/exceptions/globalExceptionHandler';
import { partsServiceProvider } from '@/backend/parts/partsServiceProvider';
import { RouteContext } from '@/shared/utils/routeUtils';

export async function GET(_request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;
        const numericId = Number(id);
        if (Number.isNaN(numericId)) {
            throw new ValidationError('Invalid part ID').toResponse();
        }
        const part = await partsServiceProvider.getPartById(numericId);
        return apiSuccessResponse({ data: part });
    } catch (error: unknown) {
        return globalExceptionHandler(error);
    }
}

export async function PUT(request: Request, { params }: RouteContext) {
    const { id } = await params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
        throw new ValidationError('Invalid part ID').toResponse();
    }

    let body;
    try {
        body = await request.json();
        const part = await partsServiceProvider.updatePart(numericId, body);
        return apiSuccessResponse({ data: part });
    } catch (error: unknown) {
        return globalExceptionHandler(error);
    }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
    const { id } = await params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
        throw new ValidationError('Invalid part ID').toResponse();
    }

    try {
        await partsServiceProvider.deletePart(numericId);
        return apiSuccessResponse({
            data: null,
            status: StatusCode.NO_CONTENT,
        });
    } catch (error: unknown) {
        return globalExceptionHandler(error);
    }
}
