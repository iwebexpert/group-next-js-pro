"use client"

import RecipeCard from "@/components/recipes/RecipeCard"
import React, { useEffect, useState } from "react"
import type { Recipe } from "@prisma/client"

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
        if (!res.ok) {
          throw new Error("404")
        }

        const data = await res.json()
        setRecipes(data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  if (loading) {
    return <p className="text-center text-lg font-semibold">Загрузка</p>
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>
  }

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
            image={recipe.imageUrl}
          />
        ))}
      </ul>
    </div>
  )
}
