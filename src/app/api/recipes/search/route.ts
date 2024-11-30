import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") ?? ""

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: { ingredients: true },
    })
    return NextResponse.json(recipes)
  } catch {
    return NextResponse.json({ error: "500" }, { status: 500 })
  }
}
