import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { spaceId, userId } = body;

        const updatedSpace = await prisma.space.update({
            where: { id: spaceId },
            data: {
                userIds: { push: userId }, 
            },
            include: { users: true }
        });

        return NextResponse.json(updatedSpace);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
