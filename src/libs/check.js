import { z, ZodError } from "zod"

export const schema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  TOKEN: z.string().optional(),
  EXAMPLE: z.enum(["ON", "OFF"]).optional(),
})

async function main() {
  schema.parse(process.env)
  console.log("✓ Все переменные найдены")
}

main().catch((e) => {
  if (e instanceof ZodError) {
    console.error(e.message)
  }
  process.error(1)
})
