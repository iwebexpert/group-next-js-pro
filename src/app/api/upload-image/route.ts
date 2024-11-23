import { NextResponse } from "next/server"
import { nanoid } from "nanoid"
import path from "path"
import fs from "fs/promises"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Имя файла
    const fileName = `${nanoid()}.jpg`
    const filePath = path.join(process.cwd(), "public/images", fileName)

    await fs.writeFile(filePath, buffer)
    return NextResponse.json({ path: `/images/${fileName}` })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Ошибка на сервере" }, { status: 500 })
  }
}
