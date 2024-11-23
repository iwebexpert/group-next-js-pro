"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "flowbite-react"
import moment from "moment"
import React, { useState } from "react"
import { toast } from "react-toastify"

async function fetchCurrentDate() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/current-date`)
  if (!res.ok) {
    throw new Error("404")
  }

  const data = await res.json()
  return data.date
}

export default function InfoCurrentDate() {
  const queryClient = useQueryClient()
  const [counter, setCounter] = useState(0)

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["current-date"],
    queryFn: () => fetchCurrentDate(),
    select: (data) => moment(data).format("DD.MM.YYYY HH:mm:ss"),
    retry: 3,
    retryDelay: 1000,
    // enabled: counter > 2,
    refetchOnWindowFocus: false,
  })

  // const formattedDate = data ? moment(data).format("DD.MM.YYYY HH:mm:ss") : ""

  // if (isPending) {
  //   return <div>Загрузка...</div>
  // }

  if (isError) {
    console.log(error)
    return (
      <div>
        <h3 className="font-bold">Ошибка</h3>
        <Button
          onClick={() => {
            refetch()
          }}
        >
          Обновить данные вручную
        </Button>
      </div>
    )
  }

  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["current-date"] })
    toast.success("Кэш обновлен!", { autoClose: 3000 })
  }

  return (
    <div>
      <h1>Текущая дата и время</h1>
      <p>{isPending ? "Загрузка..." : data}</p>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            refetch()
          }}
        >
          Обновить данные вручную
        </Button>
        <Button
          color="failure"
          onClick={handleInvalidate}
        >
          Сбросить кеш
        </Button>
      </div>
      <h2>Counter: {counter}</h2>
      <Button
        onClick={() => {
          setCounter(counter + 1)
        }}
      >
        counter + 1
      </Button>
    </div>
  )
}
