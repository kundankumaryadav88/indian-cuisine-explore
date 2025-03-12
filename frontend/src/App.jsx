import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import DishDetailsPage from "./pages/DishDetailsPage"
import NotFoundPage from "./pages/NotFoundPage"
import { ThemeProvider } from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dish/:id" element={<DishDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

