import {
    NotFoundError,
    ValidationError,
    BadRequestError,
    UnknownError,
} from './apiError';

export const globalExceptionHandler = (error: unknown) => {
    const errorInstance =
        error instanceof Error ? error : new Error(String(error));

    if (
        errorInstance instanceof NotFoundError ||
        errorInstance instanceof BadRequestError ||
        errorInstance instanceof ValidationError
    ) {
        return errorInstance.toResponse();
    }

    return new UnknownError(
        `An unexpected error occurred: ${errorInstance.message}`
    ).toResponse();
};
