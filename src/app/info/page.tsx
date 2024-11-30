import React from "react"
// import ClientEnv from "./_components/ClientEnv"
import InfoCurrentDate from "./_components/InfoCurrentDate"
import ShowChart from "./_components/ShowChart"

export default function InfoPage() {
  return (
    <div>
      {/* <div>SSR: {process.env.TOKEN}</div>
      <ClientEnv /> */}
      <InfoCurrentDate />
      <hr />
      <ShowChart />
    </div>
  )
}
