interface Ingredient {
  id: number
  name: string
  amount: string
}

interface IngredientsListProps {
  ingredients: Ingredient[]
}

export default function IngredientsList({ ingredients }: IngredientsListProps) {
  return (
    <>
      {ingredients.map((i) => (
        <div
          key={i.id}
          className="ingredient"
        >
          {i.name}: {i.amount}
        </div>
      ))}
    </>
  )
}
export type { IngredientsListProps, Ingredient }
