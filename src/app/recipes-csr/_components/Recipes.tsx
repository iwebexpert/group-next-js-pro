"use client"

import RecipeCard from "@/components/recipes/RecipeCard"
import React from "react"
import type { Recipe } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { fetchRecipes, NewRecipe } from "@/server/api/recipes"
import RecipeForm from "./RecipeForm"
import { useAddRecipeMutation } from "@/hooks/useAddRecipeMutation"

export default function Recipes() {
  // const queryClient = useQueryClient()

  const {
    data: recipes,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetchRecipes(),
  })

  // const mutation = useMutation({
  //   mutationFn: addNewRecipe,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["recipes"] })
  //     toast.success("Рецепт добавлен!", { autoClose: 3000 })
  //   },
  //   onError: (err: Error) => {
  //     toast.error(err.message || "Ошибка при добавлении рецепта", { autoClose: 3000 })
  //   },
  // })

  const mutation = useAddRecipeMutation()

  if (isPending) {
    return <p className="text-center text-lg font-semibold">Загрузка</p>
  }

  if (isError) {
    return <p className="text-center text-lg text-red-500">{error.message}</p>
  }

  const handleAddRecipe = async (data: NewRecipe) => {
    mutation.mutate(data)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Рецепты</h1>
      <RecipeForm onSubmit={handleAddRecipe} />
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
