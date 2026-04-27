import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Direction } from "radix-ui"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Direction.Provider dir="rtl">
        <App />
      </Direction.Provider>
    </ThemeProvider>
  </StrictMode>
)
