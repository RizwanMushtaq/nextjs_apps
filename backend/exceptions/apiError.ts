import { NextResponse } from 'next/server';

export enum ErrorCode {
    NOT_FOUND = 'NOT_FOUND',
    BAD_REQUEST = 'BAD_REQUEST',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    CONFLICT = 'CONFLICT',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export enum StatusCode {
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    VALIDATION_ERROR = 422,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    UNKNOWN_ERROR = 520,
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
}

type ApiErrorResponse = {
    success: false;
    error: {
        name: string;
        message: string;
        statusCode: number;
        timestamp: string;
    };
};

export abstract class ApiError extends Error {
    public abstract readonly statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
    }

    public toResponse(): NextResponse<ApiErrorResponse> {
        return NextResponse.json(
            {
                success: false,
                error: {
                    name: this.name,
                    message: this.message,
                    statusCode: this.statusCode,
                    timestamp: new Date().toISOString(),
                },
            },
            {
                status: this.statusCode,
            }
        );
    }
}

export class NotFoundError extends ApiError {
    public readonly statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = ErrorCode.NOT_FOUND;
        this.statusCode = StatusCode.NOT_FOUND;
    }
}

export class BadRequestError extends ApiError {
    public readonly statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = ErrorCode.BAD_REQUEST;
        this.statusCode = StatusCode.BAD_REQUEST;
    }
}

export class ValidationError extends ApiError {
    public readonly statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = ErrorCode.VALIDATION_ERROR;
        this.statusCode = StatusCode.VALIDATION_ERROR;
    }
}

export class UnknownError extends ApiError {
    public readonly statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = ErrorCode.UNKNOWN_ERROR;
        this.statusCode = StatusCode.UNKNOWN_ERROR;
    }
}
