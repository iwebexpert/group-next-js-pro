import { TextInput } from "flowbite-react"
import React, { useState } from "react"

interface SearchInputProps {
  onSearch: (query: string) => void
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <TextInput
      type="text"
      placeholder="Поиск..."
      value={searchQuery}
      onChange={handleChange}
      className="w-full p-2 border rounded-lg mb-6"
    />
  )
}
