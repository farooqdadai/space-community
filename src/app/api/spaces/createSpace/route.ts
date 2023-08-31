import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const body = await request.json();
        let createdSpace

        const { newSpace } = body;

        try {

            createdSpace = await prisma.space.create({
                data: newSpace,
                include: {
                    users: true,
                }
            });


        } catch (error) {
            console.log({ error });

        }


        return NextResponse.json(createdSpace)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}