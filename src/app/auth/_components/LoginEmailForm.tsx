"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react"
import { useSession, signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { EmailSchemaType, emailSchema } from "../_models/schema"

export default function LoginEmailForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/"

  const [agreed, setAgreed] = useState(false)
  const [globalMessage, setGlobalMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "test@example.local",
    },
  })

  useEffect(() => {
    if (session?.user) {
      router.push("/")
    }
  }, [session, router])

  const onSubmit = async (data: EmailSchemaType) => {
    try {
      // Auth
      console.log(data)

      const res = await signIn("email", { email: data.email, redirect: false, callbackUrl })
      if (res && res.error) {
        setGlobalMessage("Не удалось отправить ссылку для подтверждения входа на почту")
      } else {
        setGlobalMessage(
          `Ссылка для подтверждения авторизации на сайте отправлена на почту: ${data.email}. Если сообщение не появилось в вашем почтовом ящике, проверьте папку Спам.`
        )
      }
    } catch {
      setGlobalMessage("Произошла ошибка. Попробуйте снова.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Email"
          />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="test@example.local"
          color={errors.email ? "failure" : undefined}
          helperText={errors.email && <span className="text-red-500">{errors.email.message}</span>}
          {...register("email")}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="agreed"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <Label htmlFor="agreed">Я согласен с правилами сервиса</Label>
      </div>
      <Button
        type="submit"
        disabled={!agreed || isSubmitting}
      >
        {isSubmitting ? "Загрузка..." : "Войти"}
      </Button>

      <div>{globalMessage && <Alert color="info">{globalMessage}</Alert>}</div>
    </form>
  )
}
