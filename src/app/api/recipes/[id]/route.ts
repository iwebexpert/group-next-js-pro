import { NextResponse } from "next/server"
import { recipes } from "@/data/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)

  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    return NextResponse.json({ error: "Рецепт не найден" }, { status: 404 })
  }

  return NextResponse.json(recipe)
}
