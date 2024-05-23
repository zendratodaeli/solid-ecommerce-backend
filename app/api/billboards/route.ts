import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if(!userId) {
      return new NextResponse("Unauthenticated", {status: 401})
    };

    if(!label) {
      return new NextResponse("Label is required", {status: 400})
    };

    if(!imageUrl) {
      return new NextResponse("Image is required", {status: 400})
    };
    
    const billboard = await prisma.billboard.create({
      data: {
        label, imageUrl, userId
      }
    });

    return NextResponse.json(billboard);

  } catch (error) {
    console.log("[billboard_post]", error)
    return new NextResponse("Internal error", {status: 500})
  }
}


export async function GET(req: Request) {
  try {
    const billboards = await prisma.billboard.findMany();

    return NextResponse.json(billboards);

  } catch (error) {
    console.log("[billboard_get]", error)
    return new NextResponse("Internal error", {status: 500})
  }
}