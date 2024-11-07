import RecipeCard from "@/components/recipes/RecipeCard"
import type { Recipe } from "@prisma/client"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые",
}

async function fetchRecipes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("404")
  }

  return await res.json()
}

export default async function RecipesPage() {
  const recipes = await fetchRecipes()
  // console.log(recipes)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Рецепты</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            showIngredientsBtn={true}
            image={recipe.imageUrl}
          />
        ))}
      </ul>
    </div>
  )
}
