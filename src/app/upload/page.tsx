import type { Metadata } from "next"
import UploadImageForm from "./_components/UploadImageForm"

export const metadata: Metadata = {
  title: "Загрузка изображения",
}

export default async function UploadPage() {
  return <UploadImageForm />
}
