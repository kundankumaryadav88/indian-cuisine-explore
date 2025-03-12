import DishList from "../components/DishList"
import DishSuggester from "../components/DishSuggester"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

function HomePage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Indian Cuisine Explorer</h1>

      <Tabs defaultValue="dishes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="dishes">Browse Dishes</TabsTrigger>
          <TabsTrigger value="suggester">Dish Suggester</TabsTrigger>
        </TabsList>

        <TabsContent value="dishes" className="mt-4">
          <DishList />
        </TabsContent>

        <TabsContent value="suggester" className="mt-4">
          <DishSuggester />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default HomePage

