"use client"

import { Label, TextInput, Button, Alert } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { passwordSchema, PasswordSchemaType } from "../_models/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginForm() {
  const [authError, setAuthError] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: "test@example.local",
      password: "",
    },
  })

  const { data: session } = useSession()
  // console.log(session)

  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
    }
  }, [session, router, callbackUrl])

  const onSubmit = async (data: PasswordSchemaType) => {
    console.log("Данные после валидации", data)
    setAuthError(null)

    const { email, password } = data
    const result = await signIn("credentials", { email, password, redirect: false, callbackUrl })

    if (result?.ok) {
      router.push(callbackUrl)
    } else {
      setAuthError("Неправильная пара email/пароль")
    }
  }

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>{authError && <Alert color="failure">{authError}</Alert>}</div>
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
          placeholder="name@flowbite.com"
          required
          {...register("email")}
          color={errors.email ? "failure" : undefined}
          helperText={errors.email && <span className="text-red-500">{errors.email.message}</span>}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Пароль"
          />
        </div>
        <TextInput
          id="password"
          type="password"
          required
          {...register("password")}
          color={errors.password ? "failure" : undefined}
          helperText={errors.password && <span className="text-red-500">{errors.password.message}</span>}
        />
      </div>

      <Button type="submit">Войти</Button>
    </form>
  )
}
