"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Check, Plus, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Badge } from "./ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ScrollArea } from "./ui/scroll-area"
import { getAllIngredients, getSuggestedDishes } from "../lib/api"
import { Button } from "./ui/Button"

function DishSuggester() {
  const [open, setOpen] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [suggestedDishes, setSuggestedDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [suggesting, setSuggesting] = useState(false)

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients()
        setIngredients(data)
      } catch (error) {
        console.error("Error fetching ingredients:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  const handleSelect = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev
      }
      return [...prev, ingredient]
    })
    setOpen(false)
  }

  const handleRemove = (ingredient) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ingredient))
  }

  const handleClear = () => {
    setSelectedIngredients([])
    setSuggestedDishes([])
  }

  const handleSuggest = async () => {
    if (selectedIngredients.length === 0) return
    setSuggesting(true)
    try {
      const data = await getSuggestedDishes(selectedIngredients)
      setSuggestedDishes(data)
    } catch (error) {
      console.error("Error getting suggested dishes:", error)
    } finally {
      setSuggesting(false)
    }
  }

  if (loading) {
    return <div>Loading ingredients...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dish Suggester</CardTitle>
        <CardDescription>
          Select the ingredients you have available, and we'll suggest dishes you can make.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedIngredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="px-3 py-1">
                {ingredient}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => handleRemove(ingredient)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {ingredient}</span>
                </Button>
              </Badge>
            ))}
            {selectedIngredients.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No ingredients selected. Add some to get dish suggestions.
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Plus className="h-4 w-4" />
                  Add Ingredient
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search ingredients..." />
                  <CommandList>
                    <CommandEmpty>No ingredients found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-120">
                        {ingredients.map((ingredient) => (
                          <CommandItem
                            key={ingredient}
                            onSelect={() => handleSelect(ingredient)}
                            className="flex items-center gap-2 bg-blue-900 text-white"
                          >
                            {ingredient}
                            {selectedIngredients.includes(ingredient) && (
                              <Check className="ml-auto h-4 w-4 opacity-70" />
                            )}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Button variant="default" onClick={handleSuggest} disabled={selectedIngredients.length === 0 || suggesting}>
              {suggesting ? "Finding dishes..." : "Find Dishes"}
            </Button>

            {selectedIngredients.length > 0 && (
              <Button variant="outline" onClick={handleClear}>
                Clear All
              </Button>
            )}
          </div>
        </div>

        {suggestedDishes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Dishes you can make ({suggestedDishes.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedDishes.map((dish) => (
                <Card key={dish.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">
                      <Link to={`/dish/${dish.id}`} className="hover:underline">
                        {dish.name}
                      </Link>
                    </CardTitle>
                    {dish.course && <CardDescription>{dish.course}</CardDescription>}
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">{dish.ingredients}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    {dish.diet && (
                      <Badge variant={dish.diet === "vegetarian" ? "success" : "destructive"}>{dish.diet}</Badge>
                    )}
                    {(dish.state || dish.region) && (
                      <span className="text-xs text-muted-foreground">
                        {dish.state || ""} {dish.region ? `(${dish.region})` : ""}
                      </span>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DishSuggester

