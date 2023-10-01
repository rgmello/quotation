import { createContext, useEffect, useContext, useState, ReactNode } from 'react'

interface ThemeContextType {
    isThemeDark: boolean
    toggleTheme: () => void
}

interface ThemeProviderProps {
    children: ReactNode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [isThemeDark, setIsThemeDark] = useState(false)

    const toggleTheme = () => setIsThemeDark(!isThemeDark)

    useEffect(() => {
        document.body.className = isThemeDark ? 'dark' : ''
    }, [isThemeDark])

    return (
        <ThemeContext.Provider value={{ isThemeDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined)
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
    return context
}
