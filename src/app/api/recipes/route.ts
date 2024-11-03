import { NextResponse } from "next/server"
import { recipes } from "@/data/data"

export async function GET() {
  // Добавляем задержку в 3 секунды
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  return NextResponse.json(recipes)
}
