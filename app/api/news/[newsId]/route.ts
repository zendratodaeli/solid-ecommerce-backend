import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: {params: {newsId: string}}) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title, content, imageUrl } = body;

    if(!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    };
    
    if(!title) {
      return new NextResponse("Title is required", {status: 400})
    };

    if(!content) {
      return new NextResponse("Content is required", {status: 400})
    };

    if(!params.newsId) {
      return new NextResponse("News Id is required", {status: 400})
    }

    const updateNews = await prisma.news.updateMany({
      where: { 
        id: params.newsId 
      },
      data: {
        title, content, imageUrl
      }
    });

    return NextResponse.json(updateNews);

  } catch (error) {
    console.log("[NEWS_PATCH_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500})
  }
};

export async function DELETE(req: Request, { params }: { params: { newsId: string}}) {
  try {
    const { userId } = auth();

    if(!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    };

    if(!params.newsId) {
      return new NextResponse("News Id is required", {status: 400})
    } 

    const deleteNew = await prisma.news.deleteMany({
      where: {
        id: params.newsId
      }
    });

    return NextResponse.json({message: "News deleted"}, { status: 200})

  } catch (error) {
    console.log("[NEWS_DELETE_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500})
  }
}