import { NextResponse } from "next/server"

const recipes = [
  { id: 1, title: "Спагетти Карбонара", description: "Классическая итальянская паста.", image: "/images/carbonara.jpg" },
  { id: 2, title: "Пицца Маргарита", description: "Свежая пицца с помидорами, базиликом и моцареллой.", image: "/images/pizza.jpg" },
  { id: 3, title: "Салат Цезарь", description: "Салат с салатом романо, гренками и соусом Цезарь.", image: "/images/salad.jpg" },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)

  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    return NextResponse.json({ error: "Рецепт не найден" }, { status: 404 })
  }

  return NextResponse.json(recipe)
}
