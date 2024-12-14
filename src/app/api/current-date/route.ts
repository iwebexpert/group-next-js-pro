import { NextResponse } from "next/server"

export const dynamic = "force-dynamic" // auto по умолчанию
// export const dynamic = "force-static"
// export const dynamic = "error"

// export async function GET(req: Request) {
//   const userAgent = req.headers.get("user-agent")
//   return NextResponse.json({ date: new Date().toISOString(), userAgent })
// }

// export const dynamic = "force-static"
// export const revalidate = 3 // Обновляем cache каждые 3 секунды

export async function GET() {
  return NextResponse.json({ date: new Date().toISOString() })
}
