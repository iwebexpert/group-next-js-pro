import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const ingredientId = parseInt(params.id, 10)

  const ingredient = prisma.ingredient.findFirst({
    where: { id: ingredientId },
  })

  if (!ingredient) {
    return NextResponse.json({ error: "Ингредиенты не найдены" }, { status: 404 })
  }

  return NextResponse.json(ingredient)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const ingredientId = parseInt(params.id, 10)
  try {
    const ingredient = prisma.ingredient.findFirst({
      where: { id: ingredientId },
    })
    if (!ingredient) {
      return NextResponse.json({ error: "Ингредиент не найден" }, { status: 404, statusText: "Not Found" })
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500, statusText: "Server Error" })
    } else {
      return NextResponse.json({ error: "Ошибка запроса" }, { status: 500, statusText: "Server Error" })
    }
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const ingredientId = parseInt(params.id, 10)
  const { name, amount } = await request.json()
  try {
    const updatedIngredient = await prisma.ingredient.update({
      where: { id: ingredientId },
      data: { name, amount },
    })
    if (!updatedIngredient) {
      return NextResponse.json({ error: "Ингредиент не найден" }, { status: 404, statusText: "NotFound" })
    }
    return NextResponse.json(updatedIngredient)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500, statusText: "Server Error" })
    } else {
      return NextResponse.json({ error: "ServerError" }, { status: 500, statusText: "Server Error" })
    }
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const ingredientId = parseInt(params.id, 10)
  try {
    const deletedIngredient = await prisma.ingredient.delete({
      where: { id: ingredientId },
    })

    return NextResponse.json(deletedIngredient, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Не удалось удалить ингредиент" }, { status: 500 })
  }
}
