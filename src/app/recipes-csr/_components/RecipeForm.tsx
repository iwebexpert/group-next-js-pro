"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Label, TextInput, Textarea } from "flowbite-react"

// Схема валидации Zod
const recipeSchema = z.object({
  title: z.string().min(3, "Название должно быть не короче 3 символов"),
  description: z.string().min(10, "Описание должно быть не короче 10 символов"),
  imageUrl: z.string().min(3, "Введите корректный URL изображения"),
})

type RecipeFormData = z.infer<typeof recipeSchema>

interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void
}

export default function RecipeForm({ onSubmit }: RecipeFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "/images/salad.jpg",
    },
  })

  const onSubmitHandle = (data: RecipeFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandle)}
      className="flex max-w-md flex-col gap-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
    >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="title"
            value="Название"
          />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Введите название рецепта"
          {...register("title")}
          color={errors.title ? "failure" : undefined}
          helperText={errors.title && <span className="text-red-500">{errors.title.message}</span>}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="description"
            value="Описание"
          />
        </div>
        <Textarea
          id="description"
          placeholder="Введите описание рецепта"
          {...register("description")}
          color={errors.description ? "failure" : undefined}
          helperText={errors.description && <span className="text-red-500">{errors.description.message}</span>}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="imageUrl"
            value="Ссылка на изображение"
          />
        </div>
        <TextInput
          id="imageUrl"
          type="text"
          placeholder="https://example.com/image.jpg"
          {...register("imageUrl")}
          color={errors.imageUrl ? "failure" : undefined}
          helperText={errors.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}
        />
      </div>

      <Button type="submit">Добавить рецепт</Button>
    </form>
  )
}
