import { NextResponse } from 'next/server';
import { StatusCode } from '../exceptions/apiError';

export const apiSuccessResponse = <T>(
    data: T,
    status: StatusCode = StatusCode.SUCCESS
) => {
    const body = {
        success: true,
        data,
        timestamp: new Date().toISOString(),
    };
    return NextResponse.json(body, {
        status,
    });
};
