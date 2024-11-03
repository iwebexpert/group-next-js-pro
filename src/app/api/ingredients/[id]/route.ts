import { NextResponse } from "next/server"
import { ingredients } from "@/data/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const ingredientId = parseInt(params.id, 10)

  const ingredient = ingredients.find((i) => i.id === ingredientId)

  if (!ingredient) {
    return NextResponse.json({ error: "Ингредиенты не найдены" }, { status: 404 })
  }

  return NextResponse.json(ingredient.ingredients)
}
