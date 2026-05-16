import { NextResponse } from 'next/server';
export async function GET() {
    return NextResponse.json({ message: 'Hello from the parts API!' });
}

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: 'Invalid JSON body' },
            { status: 400 }
        );
    }

    const { name, description } = body;

    if (typeof name !== 'string' || typeof description !== 'string') {
        return NextResponse.json(
            {
                error: 'name (string) and description (string) are required',
            },
            { status: 400 }
        );
    }

    return NextResponse.json(
        { message: 'Part created successfully' },
        { status: 201 }
    );
}
