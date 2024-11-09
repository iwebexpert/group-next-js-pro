"use client"

import { useState } from "react"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

interface RecipeCardProps {
  id: number
  title: string
  description: string
  image: string
}

export default function RecipeCard({ id, title, description, image }: RecipeCardProps) {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <li className="border p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/recipes/${id}`}>
        <Image
          src={image}
          width={300}
          height={200}
          alt={title}
          className="mb-4 rounded-lg"
        />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">{description}</p>
      </Link>
      <button
        onClick={toggleLike}
        className="flex items-center space-x-2 mt-4"
      >
        {liked ? <SolidHeartIcon className="w-6 h-6 text-red-500" /> : <OutlineHeartIcon className="w-6 h-6 text-gray-500" />}
        <span className="text-gray-900 dark:text-gray-200">{liked ? "Вы поставили лайк!" : "Поставить лайк"}</span>
      </button>
    </li>
  )
}
