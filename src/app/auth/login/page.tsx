import type { Metadata } from "next"
// import LoginForm from "../_components/LoginForm"
import LoginEmailForm from "../_components/LoginEmailForm"
import { Suspense } from "react"

// import dynamic from "next/dynamic"
// const LoginEmailForm = dynamic(() => import("../_components/LoginEmailForm"), {
//   loading: () => <>Загрузка...</>,
// })

export const metadata: Metadata = {
  title: "Авторизация",
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">Авторизация</h1>
      <Suspense fallback={<>Загрузка...</>}>
        {/* <LoginForm /> */}
        <LoginEmailForm />
      </Suspense>
    </div>
  )
}
