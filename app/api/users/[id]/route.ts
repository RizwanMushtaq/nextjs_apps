import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({
        message: `GET user ${params.id} - dummy response`,
    });
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({
        message: `PUT update user ${params.id} - dummy response`,
    });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    return NextResponse.json({
        message: `DELETE user ${params.id} - dummy response`,
    });
}
