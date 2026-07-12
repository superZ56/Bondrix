import { BrowserRouter ,  Routes , Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Notes from "./pages/Note/Notes"
import { ThemeProvider } from "./context/ThemeContext"
import { NotesProvider } from "./context/NotesContext"

function App() {

  return (
    
    <ThemeProvider>
       <BrowserRouter>
       <NotesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Notes" element={<Notes />}></Route>
        </Route>
      </Routes>
      </NotesProvider>
      </BrowserRouter>
    </ThemeProvider>
     
    
  )
}

export default App
