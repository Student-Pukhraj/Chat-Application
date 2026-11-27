import { useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { ThemeContext, type ThemePreference } from './themeContext'

const STORAGE_KEY = 'google-chat-theme'
const DEFAULT_ACCENT = '#1a73e8'

function readPreference(): ThemePreference {
  try {
    const saved = globalThis.localStorage?.getItem(STORAGE_KEY)
    if (!saved) return { mode: 'light', accent: DEFAULT_ACCENT }
    const parsed = JSON.parse(saved) as Partial<ThemePreference>
    const mode = parsed.mode === 'dark' || parsed.mode === 'system' ? parsed.mode : 'light'
    const accent = typeof parsed.accent === 'string' && /^#[0-9a-f]{6}$/i.test(parsed.accent) ? parsed.accent : DEFAULT_ACCENT
    return { mode, accent }
  } catch {
    return { mode: 'light', accent: DEFAULT_ACCENT }
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function rgbString(hex: string): string {
  return hexToRgb(hex).join(' ')
}

function darken(hex: string, amount: number): string {
  const [red, green, blue] = hexToRgb(hex)
  const adjust = (channel: number) => Math.round(channel * (1 - amount)).toString(16).padStart(2, '0')
  return `#${adjust(red)}${adjust(green)}${adjust(blue)}`
}

function foregroundFor(hex: string): string {
  const [red, green, blue] = hexToRgb(hex)
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000
  return luminance > 150 ? '32 33 36' : '255 255 255'
}

type ThemeProviderProps = Readonly<PropsWithChildren>

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>(readPreference)
  const [systemDark, setSystemDark] = useState(() => globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)

  useEffect(() => {
    const media = globalThis.matchMedia?.('(prefers-color-scheme: dark)')
    if (!media) return
    const update = () => setSystemDark(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const dark = preference.mode === 'dark' || (preference.mode === 'system' && systemDark)
    const root = globalThis.document?.documentElement
    if (!root) return
    root.classList.toggle('dark', dark)
    root.style.setProperty('--brand', rgbString(preference.accent))
    root.style.setProperty('--brand-strong', rgbString(darken(preference.accent, dark ? 0.12 : 0.18)))
    root.style.setProperty('--brand-foreground', foregroundFor(preference.accent))
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(preference))
  }, [preference, systemDark])

  const value = useMemo(() => ({
    ...preference,
    setMode: (mode: 'light' | 'dark' | 'system') => setPreference((current) => ({ ...current, mode })),
    setAccent: (accent: string) => setPreference((current) => ({ ...current, accent })),
  }), [preference])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
