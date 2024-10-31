const ingredients = [
  {
    id: 1,
    ingredients: [
      { id: 1, name: "Спагетти", amount: "200 г" },
      { id: 2, name: "Яйца", amount: "2 шт" },
      { id: 3, name: "Пармезан", amount: "50 г" },
      { id: 4, name: "Бекон", amount: "100 г" },
    ],
  },
  {
    id: 2,
    ingredients: [
      { id: 1, name: "Тесто", amount: "1 шт" },
      { id: 2, name: "Томаты", amount: "2 шт" },
      { id: 3, name: "Моцарелла", amount: "100 г" },
      { id: 4, name: "Базилик", amount: "по вкусу" },
    ],
  },
  {
    id: 3,
    ingredients: [
      { id: 1, name: "Гренки", amount: "10 шт" },
      { id: 2, name: "Курица", amount: "1 шт" },
      { id: 3, name: "Майонез", amount: "100 г" },
      { id: 4, name: "Зелень", amount: "по вкусу" },
    ],
  },
]

const recipes = [
  {
    id: 1,
    title: "Спагетти Карбонара",
    description: "Классическая итальянская паста.",
    image: "/images/carbonara.jpg",
    ingredients: [
      { id: 1, name: "Спагетти", amount: "200 г" },
      { id: 2, name: "Яйца", amount: "2 шт" },
      { id: 3, name: "Пармезан", amount: "50 г" },
      { id: 4, name: "Бекон", amount: "100 г" },
    ],
  },
  {
    id: 2,
    title: "Пицца Маргарита",
    description: "Свежая пицца с помидорами, базиликом и моцареллой.",
    image: "/images/pizza.jpg",
    ingredients: [
      { id: 1, name: "Тесто", amount: "1 шт" },
      { id: 2, name: "Томаты", amount: "2 шт" },
      { id: 3, name: "Моцарелла", amount: "100 г" },
      { id: 4, name: "Базилик", amount: "по вкусу" },
    ],
  },
  {
    id: 3,
    title: "Салат Цезарь",
    description: "Салат с салатом романо, гренками и соусом Цезарь.",
    image: "/images/salad.jpg",
  },
]

export { ingredients, recipes }
