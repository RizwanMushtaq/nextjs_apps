import { apiSuccessResponse } from '@/backend/api_responses/apiResponses';
import { globalExceptionHandler } from '@/backend/exceptions/globalExceptionHandler';
import { validateUpdateUserDto } from '@/backend/user/dtos/userDtos';
import { userServiceProvider } from '@/backend/user/userServicePrivider';
import { validateIdParam } from '@/shared/utils/zodUtils';
import { NextRequest } from 'next/server';
import { RouteContext } from '@/shared/utils/routeUtils';
import { StatusCode } from '@/backend/exceptions/apiError';

export async function GET(req: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const validatedId = validateIdParam(id);
        const user = await userServiceProvider.getUserById(validatedId);
        return apiSuccessResponse({ data: user });
    } catch (error) {
        return globalExceptionHandler(error);
    }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const validatedId = validateIdParam(id);
        const requestBody = await req.json();
        const validatedBody = validateUpdateUserDto(requestBody);
        const updateUserInput = {
            name: validatedBody.name,
            email: validatedBody.email,
            password: validatedBody.password,
        };
        const updatedUser = await userServiceProvider.updateUser(
            validatedId,
            updateUserInput
        );
        return apiSuccessResponse({ data: updatedUser });
    } catch (error) {
        return globalExceptionHandler(error);
    }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const validatedId = validateIdParam(id);
        await userServiceProvider.deleteUser(validatedId);
        return apiSuccessResponse({
            data: null,
            status: StatusCode.NO_CONTENT,
        });
    } catch (error) {
        return globalExceptionHandler(error);
    }
}
