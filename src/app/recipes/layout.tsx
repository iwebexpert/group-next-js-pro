export default function RecipesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="container mx-auto p-4">
      <div className="text-4xl font-bold mb-6">Книга для публикации рецептов</div>
      <div>{children}</div>
    </div>
  )
}
