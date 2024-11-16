"use client"

import { Label, TextInput, Button } from "flowbite-react"
import React, { FormEvent, useState } from "react"
import { passwordSchema, PasswordSchemaType } from "../_models/schema"
import { z } from "zod"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "test@example.local",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PasswordSchemaType, string>>>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))

    // Очистка ошибок
    setErrors((prev) => ({
      ...prev,
      [id]: undefined,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    try {
      const validatedData = passwordSchema.parse(formData)
      console.log(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof PasswordSchemaType, string>> = {}
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof PasswordSchemaType
          fieldErrors[fieldName] = err.message
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit}
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
          placeholder="name@flowbite.com"
          required
          value={formData.email}
          onChange={handleChange}
          color={errors.email ? "failure" : undefined}
          helperText={errors.email && <span className="text-red-500">{errors.email}</span>}
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
          value={formData.password}
          onChange={handleChange}
          color={errors.password ? "failure" : undefined}
          helperText={errors.password && <span className="text-red-500">{errors.password}</span>}
        />
      </div>

      <Button type="submit">Войти</Button>
    </form>
  )
}
