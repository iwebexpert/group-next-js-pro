import React from "react"
import ClientEnv from "./_components/ClientEnv"

export default function InfoPage() {
  return (
    <div>
      <div>SSR: {process.env.TOKEN}</div>
      <ClientEnv />
    </div>
  )
}
