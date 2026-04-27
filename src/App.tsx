import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "@/components/navbar"
import HomePage from "@/pages/home"
import AboutPage from "@/pages/about"
import ThemePage from "@/pages/theme"

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-svh">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/theme" element={<ThemePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
