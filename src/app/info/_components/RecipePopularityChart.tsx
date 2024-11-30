"use client"

import React from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Регистрация модулей Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function RecipePopularityChart() {
  // Пример данных
  const data = {
    labels: ["Рецепт 1", "Рецепт 2", "Рецепт 3", "Рецепт 4", "Рецепт 5"],
    datasets: [
      {
        label: "Популярность рецептов (кол-во просмотров)",
        data: [120, 200, 150, 80, 170],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Популярность рецептов",
      },
    },
  }

  return (
    <Bar
      data={data}
      options={options}
    />
  )
}
