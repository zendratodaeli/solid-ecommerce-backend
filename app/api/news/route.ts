import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { id, title, content, imageUrl } = body;

    if(!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    };
    
    if(!title) {
      return new NextResponse("Title is required", {status: 400})
    };

    if(!content) {
      return new NextResponse("Content is required", {status: 400})
    };

    const news = await prisma.news.create({
      data: {
        title, content, imageUrl, userId
      }
    });

    return NextResponse.json(news)

  } catch (error) {
    console.log("ERROR FROM POST NEWS ROUTE", error);
    return new NextResponse("Internal Error", {status: 500})
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { id, title, content, imageUrl } = body;

    if(!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    };
    
    if(!title) {
      return new NextResponse("Title is required", {status: 400})
    };

    if(!content) {
      return new NextResponse("Content is required", {status: 400})
    };


    const news = await prisma.news.findUnique({
      where: {
        id
      }
    });

    if(!news) {
      return Response.json({error: "Not Found"}, { status: 404})
    }

    if(!userId || userId !== news.userId) {
      return Response.json({error: "Unauthorized"}, { status: 401})
    }

    const updateNews = await prisma.news.updateMany({
      where: { 
        id
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

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { id } = body;

    if(!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    };

    const deleteNew = await prisma.news.deleteMany({
      where: {
        id
      }
    });

    return NextResponse.json({message: "News deleted"}, { status: 200})

  } catch (error) {
    console.log("[NEWS_DELETE_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500})
  }
}