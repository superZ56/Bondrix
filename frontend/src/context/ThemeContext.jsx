import { createContext, useContext, useState, useEffect } from 'react'
import { themes, defaultTheme } from '../assets/Colors'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(defaultTheme)
  const colors = themes[themeName]

  // Applique les couleurs en CSS variables sur <html>
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-third', colors.third)
    if (colors.textColor) {
      root.style.setProperty('--color-text', colors.textColor)
    } else {
      root.style.setProperty('--color-text', '#1F2937')
    }
  }, [colors])

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}