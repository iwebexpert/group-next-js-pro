"use client"

import React from "react"
import { DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react"

import Logo from "@/app/icon.png"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function MainMenu() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const onSignOutHandle = () => {
    signOut()
  }

  return (
    <Navbar
      fluid
      rounded
    >
      <NavbarBrand
        href="/"
        as={Link}
      >
        <Image
          src={Logo}
          className="mr-3 w-9 h-9"
          alt="Логотип"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white">Книга рецептов</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {session && (
          <div>
            <span className="text-black dark:text-white">{session.user?.email}</span>
            <button
              className="ml-2 btn-primary"
              onClick={onSignOutHandle}
            >
              Выход
            </button>
          </div>
        )}

        {!session && (
          <div>
            <Link href="/auth/login">
              <button className="btn-primary">Войти</button>
            </Link>
          </div>
        )}

        <DarkThemeToggle className="ml-3" />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink
          href="/"
          as={Link}
          active={pathname === "/"}
        >
          Главная
        </NavbarLink>
        <NavbarLink
          href="/about"
          as={Link}
          active={pathname === "/about"}
        >
          О нас
        </NavbarLink>
        <NavbarLink
          href="/recipes-csr"
          as={Link}
          active={pathname === "/recipes-csr"}
        >
          Рецепты
        </NavbarLink>
        <NavbarLink
          href="/upload"
          as={Link}
          active={pathname === "/upload"}
        >
          Загрузить
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
