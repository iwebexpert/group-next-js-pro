import { prisma } from "@/libs/prisma"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN

  const recipes = await prisma.recipe.findMany({
    select: { id: true },
  })

  return [
    {
      url: `${domain}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${domain}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...recipes.map((recipe) => ({
      url: `${domain}/recipes/${recipe.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ]
}
