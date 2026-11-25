'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let initialTheme: Theme = 'dark'

    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY)

      if (savedTheme === 'light' || savedTheme === 'dark') {
        initialTheme = savedTheme
      } else {
        initialTheme = window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark'
      }
    } catch {
      initialTheme = 'dark'
    }

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    document.documentElement.style.colorScheme = initialTheme
    setReady(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'

      document.documentElement.classList.toggle('dark', next === 'dark')
      document.documentElement.style.colorScheme = next

      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Tema tetap bisa diganti jika localStorage tidak tersedia
      }

      return next
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme, ready])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}