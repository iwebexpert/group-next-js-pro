"use client"

import React from "react"
import { DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react"

import Logo from "@/app/icon.png"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MainMenu() {
  const pathname = usePathname()

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
        <button className="btn-primary">Начать</button>
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
          href="/recipes"
          as={Link}
          active={pathname === "/recipes"}
        >
          Рецепты
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
