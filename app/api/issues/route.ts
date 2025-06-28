import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { createIssueSchema } from '@/app/validationSchema';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title, 
            description: body.description,
        }
    });

    return NextResponse.json(newIssue, { status: 201 });
};

export async function GET() {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues, { status: 200 });
};