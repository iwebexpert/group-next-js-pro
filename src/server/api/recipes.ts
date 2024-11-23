export interface NewRecipe {
  title: string
  description: string
  imageUrl: string
}

export async function fetchRecipes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
  if (!res.ok) {
    throw new Error("404")
  }

  return await res.json()
}

export async function addNewRecipe(newRecipe: NewRecipe) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
    method: "POST",
    body: JSON.stringify(newRecipe),
  })

  if (!res.ok) {
    throw new Error("404")
  }

  return await res.json()
}
