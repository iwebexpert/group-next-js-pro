import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    })
  }

  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  return NextResponse.json(recipes)
}
