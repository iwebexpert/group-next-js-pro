"use client"

import { Label, FileInput, Button, Alert } from "flowbite-react"
import React, { useState } from "react"
import { toast } from "react-toastify"

export default function UploadImageForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedFile) {
      toast.error("Выберите файл")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-image`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("404")
      }

      const data = await res.json()

      setImageUrl(data.path)
      toast.success(`Изображение загружено! Путь: ${data.path}`)
    } catch (error: unknown) {
      toast.error((error as Error).message || "Общая ошибка")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div
        id="fileUpload"
        className="max-w-md"
      >
        <div className="mb-2 block">
          <Label
            htmlFor="file"
            value="Загрузить изображение"
          />
        </div>
        <FileInput
          id="file"
          onChange={handleFileChange}
        />
      </div>

      {imageUrl && (
        <div>
          <Alert color="success">{imageUrl}</Alert>
        </div>
      )}

      <Button type="submit">Загрузить</Button>
    </form>
  )
}
