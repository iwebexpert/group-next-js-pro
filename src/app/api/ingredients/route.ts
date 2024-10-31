import { NextResponse } from "next/server"
import { ingredients } from "@/data/data"

export async function GET() {
  return NextResponse.json(ingredients)
}
