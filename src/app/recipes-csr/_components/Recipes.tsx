"use client"

import RecipeCard from "@/components/recipes/RecipeCard"
import React, { useState } from "react"
import type { Recipe } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { fetchSearchRecipes, NewRecipe } from "@/server/api/recipes"
import RecipeForm from "./RecipeForm"
import { useAddRecipeMutation } from "@/hooks/useAddRecipeMutation"
import SearchInput from "@/components/shared/SearchInput"
import { useDebounce } from "@/hooks/useDebounce"

export default function Recipes() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 800)

  // const queryClient = useQueryClient()
  // console.log("Query:", query)

  const {
    data: recipes,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["recipes", debouncedQuery],
    queryFn: () => fetchSearchRecipes(debouncedQuery),
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

  // if (isPending) {
  //   return <p className="text-center text-lg font-semibold">Загрузка</p>
  // }

  // if (isError) {
  //   return <p className="text-center text-lg text-red-500">{error.message}</p>
  // }

  const handleAddRecipe = async (data: NewRecipe) => {
    mutation.mutate(data)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Рецепты</h1>
      <div className="hidden">
        <RecipeForm onSubmit={handleAddRecipe} />
      </div>

      <SearchInput onSearch={setQuery} />

      {isPending && <p className="text-center text-lg font-semibold">Загрузка</p>}

      {isError && <p className="text-center text-lg text-red-500">{error.message}</p>}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes?.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.imageUrl}
          />
        ))}
      </ul>
      {!isPending && recipes?.length === 0 && <p className="text-center text-gray-500 mt-6">Ничего не найдено</p>}
    </div>
  )
}
