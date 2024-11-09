import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "О нас",
}

export default function AboutPage() {
  const classDynamic = `text-blue-${"400"}`

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">О нас</h1>
      <p className={`text-lg ${classDynamic} dark:text-gray-400`}>
        Добро пожаловать на наш сайт рецептов! Здесь вы найдете лучшие рецепты из разных уголков мира. Мы стремимся поделиться с вами не только
        вкусными рецептами, но и полезной информацией о приготовлении пищи.
      </p>
    </div>
  )
}
