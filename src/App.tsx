import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Layout from "./Layout"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "./App.css"
import { UserContextProvider } from "./contexts/user-context"

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: `'Outfit', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<LandingPage />} />
              </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
