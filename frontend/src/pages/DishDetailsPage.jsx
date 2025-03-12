"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import DishDetails from "../components/DishDetails"
import { Button } from "../components/ui/button"
import { ChevronLeft } from "lucide-react"
import { getDishById } from "../lib/api"

function DishDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const data = await getDishById(id)
        if (!data) {
          navigate("/not-found")
          return
        }
        setDish(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDish()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-red-500">Error: {error}</p>
        <Button asChild className="mt-4">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to all dishes
          </Link>
        </Button>
      </div>

      {dish && <DishDetails dish={dish} />}
    </main>
  )
}

export default DishDetailsPage

