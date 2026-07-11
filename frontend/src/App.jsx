import { BrowserRouter ,  Routes , Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import { ThemeProvider } from "./context/ThemeContext"

function App() {

  return (
    
    <ThemeProvider>
       <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
     
    
  )
}

export default App
