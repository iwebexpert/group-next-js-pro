import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)

  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id: recipeId },
      include: { ingredients: true },
    })

    if (!recipe) {
      throw new Error("Рецепт не найден")
    }

    return NextResponse.json(recipe)
  } catch {
    // console.error(error)
    return NextResponse.json({ error: "Рецепт не найден" }, { status: 404 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)
  const { title, description, imageUrl } = await req.json()

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: { title, description, imageUrl },
    })

    return NextResponse.json(updatedRecipe, { status: 200 })
  } catch {
    // console.error(error)
    return NextResponse.json({ error: "Не удалось обновить рецепт" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)
  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: recipeId },
    })

    // Удаление ингридиентов
    // await prisma.ingredient.deleteMany({
    //   where: { recipeId },
    // })

    // Удаление рецепта
    // const deletedRecipe = await prisma.recipe.delete({
    //   where: { id: recipeId },
    // })

    return NextResponse.json(deletedRecipe, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Не удалось удалить рецепт" }, { status: 500 })
  }
}
