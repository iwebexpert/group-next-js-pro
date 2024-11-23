import { addNewRecipe } from "@/server/api/recipes"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

export function useAddRecipeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addNewRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] })
      toast.success("Рецепт добавлен!", { autoClose: 3000 })
    },
    onError: (err: Error) => {
      toast.error(err.message || "Ошибка при добавлении рецепта", { autoClose: 3000 })
    },
  })
}
