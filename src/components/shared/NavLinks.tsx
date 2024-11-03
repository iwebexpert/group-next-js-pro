"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-4">
      <Link
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
        href="/"
      >
        Главная
      </Link>

      <Link
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/about" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
        href="/about"
      >
        О нас
      </Link>

      <Link
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/recipes" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
        }`}
        href="/recipes"
      >
        Рецепты
      </Link>

      <Link
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/recipes-csr" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
        }`}
        href="/recipes-csr"
      >
        Рецепты CSR
      </Link>

      {/* <Link
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/admin" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
        href="/admin"
      >
        Админ
      </Link> */}
    </nav>
  )
}
