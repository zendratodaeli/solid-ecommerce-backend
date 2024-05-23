import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function GET(req: Request, { params }: {params: {billboardId: string}}
) {
  try {

    if(!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400});
    };

    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId
      },
    });

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[billboard_get]", error)
    return new NextResponse("Internal Error", { status: 500})
  }
}

export async function PATCH(req: Request, { params }: {params: { billboardId: string }}
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;
    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401});
    };

    if(!label) {
      return new NextResponse("Label is required", { status: 400});
    };

    if(!imageUrl) {
      return new NextResponse("Image is required", { status: 400});
    };

    if(!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400});
    };

    const billboard = await prisma.billboard.updateMany({
      where: {
        id: params.billboardId
      },
      data: {
        label, imageUrl
      }
    });
    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[billboard_patch]", error)
    return new NextResponse("Internal Error", { status: 500})
  }
}

export async function DELETE(req: Request, { params }: {params: { billboardId: string }}
) {
  try {
    const { userId } = auth();

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401});
    };

    if(!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400});
    };

    const billboard = await prisma.billboard.deleteMany({
      where: {
        id: params.billboardId
      },
    });

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[billboard_delete]", error)
    return new NextResponse("Internal Error", { status: 500})
  }
}