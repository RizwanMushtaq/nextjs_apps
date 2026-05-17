import { NextResponse } from 'next/server';
import { StatusCode } from '../exceptions/apiError';

type apiSuccessResponseProps<T> = {
    data: T;
    status?: StatusCode;
};

export const apiSuccessResponse: <T>(
    props: apiSuccessResponseProps<T>
) => NextResponse = <T>(props: apiSuccessResponseProps<T>) => {
    const { data, status = StatusCode.SUCCESS } = props;
    const body = {
        success: true,
        data,
        timestamp: new Date().toISOString(),
    };
    return NextResponse.json(body, {
        status,
    });
};
