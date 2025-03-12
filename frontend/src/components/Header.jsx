"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { searchDishes } from "../lib/api"

function Header() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const data = await searchDishes(query)
        setResults(data)
      } catch (error) {
        console.error("Error searching dishes:", error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchResults, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSelect = (id) => {
    setOpen(false)
    navigate(`/dish/${id}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Indian Cuisine Explorer
        </Link>

        <div className="hidden md:flex relative w-full max-w-sm items-center">
          <Button
            variant="outline"
            className="w-full justify-between text-sm text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Search dishes, ingredients, regions...</span>
            </div>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search dishes, ingredients, regions..."
          value={query}
          onValueChange={setQuery}
          ref={searchInputRef}
        />
        <CommandList>
          <CommandEmpty>{loading ? "Searching..." : "No results found."}</CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Dishes">
              {results.map((dish) => (
                <CommandItem key={dish.id} onSelect={() => handleSelect(dish.id)}>
                  <div className="flex flex-col">
                    <span>{dish.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {dish.state || dish.region
                        ? `${dish.state || ""} ${dish.region ? `(${dish.region})` : ""}`
                        : "Unknown origin"}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  )
}

export default Header

