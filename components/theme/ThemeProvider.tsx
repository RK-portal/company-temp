'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeType = 'default' | 'custom'

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: React.ReactNode
  theme?: ThemeType
}

export function ThemeProvider({ children, theme = 'default' }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(theme)

  useEffect(() => {
    // 将来的なテーマ切り替え時のための準備
    // 現在は default テーマのみサポート
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  const handleSetTheme = (newTheme: ThemeType) => {
    setCurrentTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
