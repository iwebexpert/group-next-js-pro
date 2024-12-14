import RecipeCard from "@/components/recipes/RecipeCard"
import Link from "next/link"
// import type { Recipe } from "@prisma/client"
// import { fetchRecipeById } from "@/server/api/recipes"
import { prisma } from "@/libs/prisma"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// export const dynamicParams = false // по умолчанию true
export const revalidate = 20 // ISR - Incremental Static Regeneration

export async function generateStaticParams() {
  // return [{ id: "1" }, { id: "2" }, { id: "3" }]
  const items = await prisma.recipe.findMany({ select: { id: true } })
  // console.log(items)

  return items.map((recipe) => ({ id: recipe.id.toString() }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = (await params).id

  const recipe = await prisma.recipe.findFirst({
    where: { id: +id },
  })

  return {
    title: recipe?.title ?? "404: страница не найдена",
  }
}

export default async function RecipesPage({ params }: { params: { id: string } }) {
  // const recipe: Recipe = await fetchRecipeById(params.id)
  const recipe = await prisma.recipe.findFirst({
    where: { id: +params.id },
    include: { ingredients: true },
  })

  if (!recipe) notFound()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">{recipe.title}</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecipeCard
          id={recipe.id}
          title={recipe.title}
          description={recipe.description}
          image={recipe.imageUrl}
        />
      </ul>
      <div className="mt-8">
        <Link
          href="/recipes"
          className="text-blue-500 hover:underline"
        >
          Посмотреть все рецепты
        </Link>
      </div>
    </div>
  )
}
