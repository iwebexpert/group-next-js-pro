import { NextResponse } from "next/server"

export async function GET() {
  const recipes = [
    { id: 1, title: "Спагетти Карбонара", description: "Классическая итальянская паста.", image: "/images/carbonara.jpg" },
    { id: 2, title: "Пицца Маргарита", description: "Свежая пицца с помидорами, базиликом и моцареллой.", image: "/images/pizza.jpg" },
    { id: 3, title: "Салат Цезарь", description: "Салат с салатом романо, гренками и соусом Цезарь.", image: "/images/salad.jpg" },
  ]

  // Добавляем задержку в 3 секунды
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  return NextResponse.json(recipes)
}
