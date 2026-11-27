import { useEffect, useState } from 'react'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SettingsPage() {
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  return <main className="min-h-screen bg-canvas p-4 sm:p-8"><section className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-6"><Link to="/chat" className="mb-5 inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft className="h-4 w-4" />Back to chat</Link><h1 className="text-xl font-semibold">Settings</h1><div className="mt-6 flex items-center justify-between rounded-lg border border-border p-4"><div><p className="font-medium">Dark theme</p><p className="text-sm text-muted">Use a darker application appearance</p></div><button type="button" onClick={() => setDark((value) => !value)} aria-label="Toggle dark theme" className="grid h-10 w-10 place-items-center rounded-full bg-elevated">{dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</button></div></section></main>
}
