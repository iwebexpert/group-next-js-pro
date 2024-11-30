"use client"

import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"

const RecipePopularityChart = dynamic(() => import("./RecipePopularityChart"), { ssr: false })

export default function ShowChart() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 5000)
  }, [])

  return <>{show && <RecipePopularityChart />}</>
}
