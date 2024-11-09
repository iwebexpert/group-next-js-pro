import HeroSection from "@/components/shared/HeroSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые",
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-4xl font-bold">Добро пожаловать на платформу рецептов</h1>
      <p className="mt-4 text-lg">Делитесь любимыми рецептами и открывайте для себя новые!</p> */}
      <HeroSection
        headline="Откройте для себя мир кулинарных шедевров"
        subheadLine="Добро пожаловать в книгу рецептов, где каждый рецепт – это маленький праздник! Найдите вдохновение для создания удивительных блюд, которые порадуют вас и ваших близких."
        primaryBtnText="Узнать больше"
        primaryBtnLink="/about"
        secondaryBtnText="Смотреть видео"
        secondaryBtnLink="/watch-demo"
        alertText="Попробуйте наши самые популярные рецепты!"
        alertLink="/recipes"
        alertBadge="Новинка"
        popularText="Популярно"
        images={[
          { href: "/recipes/1", src: "/images/carbonara.jpg", alt: "Carbonara", width: 80, height: 40 },
          { href: "/recipes", src: "/images/omelette.jpg", alt: "Omelette", width: 100, height: 50 },
          { href: "/recipes/2", src: "/images/pizza.jpg", alt: "Pizza", width: 100, height: 50 },
          { href: "/recipes/1", src: "/images/carbonara.jpg", alt: "Carbonara", width: 80, height: 40 },
          { href: "/recipes/3", src: "/images/salad.jpg", alt: "Salad", width: 90, height: 45 },
        ]}
      />
      {/* <nav className="mt-6">
        <Link
          href="/recipes"
          className="text-blue-500 hover:underline"
        >
          Посмотреть рецепты
        </Link>
      </nav> */}
    </div>
  )
}
