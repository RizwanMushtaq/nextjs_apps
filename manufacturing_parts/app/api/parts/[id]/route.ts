import { NextResponse } from 'next/server';

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
    const { id } = await params;

    return NextResponse.json({ message: `Part ${id} found` });
}

export async function PUT(request: Request, { params }: RouteContext) {
    const { id } = await params;

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: 'Invalid JSON body' },
            { status: 400 }
        );
    }

    return NextResponse.json({ message: `Part ${id} updated`, body });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
    const { id } = await params;

    return NextResponse.json({ message: `Part ${id} deleted`, status: 204 });
}
