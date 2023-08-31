import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function GET(
    req: Request
) {
    try {
        const data = await prisma.space.findMany({
            orderBy: {
                createdAt: "desc" // Order by the createdAt field in descending (reverse) order
            },
            include: {
                users: true // Include the related users data
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};