import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

function NotFoundPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Dish Not Found</h2>
      <p className="text-muted-foreground mt-2 mb-6">We couldn't find the dish you were looking for.</p>
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage

