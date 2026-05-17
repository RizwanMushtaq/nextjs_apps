import { NextRequest } from 'next/server';
import { userServiceProvider } from '@/backend/user/userServicePrivider';
import { apiSuccessResponse } from '@/backend/api_responses/apiResponses';
import { globalExceptionHandler } from '@/backend/exceptions/globalExceptionHandler';
import { createUserSchema } from '@/backend/user/dtos/userDtos';
import { StatusCode, ValidationError } from '@/backend/exceptions/apiError';

export async function GET() {
    try {
        const users = await userServiceProvider.getAllUsers();
        return apiSuccessResponse({ data: users });
    } catch (error) {
        return globalExceptionHandler(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const requestBody = await req.json();
        const parseResult = createUserSchema.safeParse(requestBody);
        if (!parseResult.success) {
            throw new ValidationError(
                'Invalid input data for creating user: ' +
                    JSON.stringify(parseResult.error.message)
            );
        }
        const user = await userServiceProvider.createUser(parseResult.data);
        return apiSuccessResponse({
            data: user,
            status: StatusCode.CREATED,
        });
    } catch (error) {
        return globalExceptionHandler(error);
    }
}
