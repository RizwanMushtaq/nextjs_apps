import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';
import {
    NotFoundError,
    ValidationError,
    BadRequestError,
    UnknownError,
    DatabaseError,
} from './apiError';
import logger from '@/shared/utils/logger';

export const globalExceptionHandler = (errorInstance: unknown) => {
    if (
        errorInstance instanceof NotFoundError ||
        errorInstance instanceof BadRequestError ||
        errorInstance instanceof ValidationError
    ) {
        logger.error(`API error: ${errorInstance.message}`);
        return errorInstance.toResponse();
    }

    if (errorInstance instanceof PrismaClientKnownRequestError) {
        if (errorInstance.code === 'P2025') {
            logger.error(`Prisma error P2025: ${errorInstance.message}`);
            return new NotFoundError(
                `Database error: Resource not found.`
            ).toResponse();
        }
        if (errorInstance.code === 'P2002') {
            logger.error(`Prisma error P2002: ${errorInstance.message}`);
            return new BadRequestError(
                `Database error: Unique constraint failed.`
            ).toResponse();
        }
        logger.error(
            `Prisma error ${errorInstance.code}: ${errorInstance.message}`
        );
        return new DatabaseError(
            `Database error: Please contact support.`
        ).toResponse();
    }

    logger.error(
        `Unexpected error: ${errorInstance instanceof Error ? errorInstance.message : String(errorInstance)}`
    );

    return new UnknownError(
        `An unexpected error occurred. Please try again later.`
    ).toResponse();
};
