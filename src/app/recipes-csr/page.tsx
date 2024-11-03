import type { Metadata } from "next"
import Recipes from "./_components/Recipes"

export const metadata: Metadata = {
  title: "Рецепты",
}

export default function RecipesPage() {
  return <Recipes />
}
