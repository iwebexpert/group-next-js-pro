"use client"

import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"

const TostifyClient = dynamic(() => import("@/components/shared/TostifyClient"), { ssr: false })

export default function Tostify() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return <>{show && <TostifyClient />}</>
}
