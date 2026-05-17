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
        const parseResult = validateCreateUserDto(requestBody);
        const crreateUserInput: CreateUserInput = {
            name: parseResult.name,
            email: parseResult.email,
            password: parseResult.password,
        };
        const user = await userServiceProvider.createUser(crreateUserInput);
        return apiSuccessResponse({
            data: user,
            status: StatusCode.CREATED,
        });
    } catch (error) {
        return globalExceptionHandler(error);
    }
}
