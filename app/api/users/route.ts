import { NextRequest } from 'next/server';
import { userServiceProvider } from '@/backend/user/userServicePrivider';
import { apiSuccessResponse } from '@/backend/api_responses/apiResponses';
import { globalExceptionHandler } from '@/backend/exceptions/globalExceptionHandler';
import { validateCreateUserDto } from '@/backend/user/dtos/userDtos';
import { StatusCode } from '@/backend/exceptions/apiError';
import { CreateUserInput } from '@/backend/user/domain/userDomain';

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
        const validatedBody = validateCreateUserDto(requestBody);
        const crreateUserInput: CreateUserInput = {
            name: validatedBody.name,
            email: validatedBody.email,
            password: validatedBody.password,
        };
        const createdUser =
            await userServiceProvider.createUser(crreateUserInput);
        return apiSuccessResponse({
            data: createdUser,
            status: StatusCode.CREATED,
        });
    } catch (error) {
        return globalExceptionHandler(error);
    }
}
