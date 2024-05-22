import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title, content } = body;

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
        title, content, userId
      }
    });

    return NextResponse.json(news)

  } catch (error) {
    console.log("ERROR FROM POST NEWS ROUTE", error);
    return new NextResponse("Internal Error", {status: 500})
  }
}