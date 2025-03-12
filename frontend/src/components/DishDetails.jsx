import { Clock, Utensils, MapPin, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

function DishDetails({ dish }) {
  const ingredients = dish.ingredients.split(",").map((i) => i.trim())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dish.name}</h1>
        {(dish.state || dish.region) && (
          <div className="flex items-center mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {dish.state || ""} {dish.region ? `(${dish.region})` : ""}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {dish.diet && <Badge variant={dish.diet === "vegetarian" ? "success" : "destructive"}>{dish.diet}</Badge>}
        {dish.course && (
          <Badge variant="outline">
            <Utensils className="h-3 w-3 mr-1" />
            {dish.course}
          </Badge>
        )}
        {dish.flavor_profile && (
          <Badge variant="outline">
            <Tag className="h-3 w-3 mr-1" />
            {dish.flavor_profile}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Preparation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium">Prep Time:</span>{" "}
                  {dish.prep_time !== "-1" ? `${dish.prep_time} minutes` : "Not specified"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium">Cook Time:</span>{" "}
                  {dish.cook_time !== "-1" ? `${dish.cook_time} minutes` : "Not specified"}
                </div>
              </div>

              {dish.cook_time !== "-1" && dish.prep_time !== "-1" && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Total Time:</span>{" "}
                    {Number.parseInt(dish.cook_time) + Number.parseInt(dish.prep_time)} minutes
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Similar Dishes</h2>
        <p className="text-muted-foreground">
          This feature will show dishes with similar ingredients or from the same region.
        </p>
      </div>
    </div>
  )
}

export default DishDetails

