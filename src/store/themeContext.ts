import { createContext } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemePreference = Readonly<{ mode: ThemeMode; accent: string }>

export type ThemeContextValue = ThemePreference & Readonly<{ setMode: (mode: ThemeMode) => void; setAccent: (accent: string) => void }>

export const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  accent: '#1a73e8',
  setMode: () => undefined,
  setAccent: () => undefined,
})
