import { z } from "zod"

export const passwordSchema = z.object({
  email: z.string().min(5, "Поле обязательно для заполнения").email("Введите E-mail"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
})

export type PasswordSchemaType = z.infer<typeof passwordSchema>

export const emailSchema = passwordSchema.omit({ password: true })
export type EmailSchemaType = z.infer<typeof emailSchema>
