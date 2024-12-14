import RecipeCard from "@/components/recipes/RecipeCard"
import { prisma } from "@/libs/prisma"
import type { Recipe } from "@prisma/client"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые",
  keywords: "Рецепты, популярные блюда, любимые рецепты",
  robots: {
    index: true,
    follow: true,
  },
}

export const revalidate = 10

export default async function RecipesPage() {
  // const recipes = await fetchRecipes()
  const recipes = await prisma.recipe.findMany({
    include: { ingredients: true },
  })

  if (!recipes) notFound()
  // console.log(recipes)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Рецепты</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: Recipe) => (
          // <li
          //   key={recipe.id}
          //   className="border p-4 rounded-lg"
          // >
          //   <h3 className="text-xl font-semibold">{recipe.title}</h3>
          //   <p className="text-sm text-gray-700">{recipe.description}</p>
          //   <Image
          //     src={recipe.image}
          //     alt={recipe.title}
          //     width={300}
          //     height={200}
          //     className="mt-4 rounded-lg"
          //   />
          // </li>
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.imageUrl}
          />
        ))}
      </ul>
    </div>
  )
}
