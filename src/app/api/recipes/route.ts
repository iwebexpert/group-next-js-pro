import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const recipes = await prisma.recipe.findMany({
    include: { ingredients: true },
  })

  return NextResponse.json(recipes)
}

export async function POST(req: Request) {
  const { title, description, imageUrl, ingredients } = await req.json()

  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        imageUrl,
        ingredients: {
          create: ingredients,
        },
      },
    })

    return NextResponse.json(newRecipe, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Не удалось создать рецепт" }, { status: 500 })
  }
}
