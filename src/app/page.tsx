import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые",
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Добро пожаловать на платформу рецептов</h1>
      <p className="mt-4 text-lg">Делитесь любимыми рецептами и открывайте для себя новые!</p>
      <nav className="mt-6">
        <Link
          href="/recipes"
          className="text-blue-500 hover:underline"
        >
          Посмотреть рецепты
        </Link>
      </nav>
    </div>
  )
}
