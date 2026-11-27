import { ArrowLeft, Check, Monitor, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../../store/useTheme'
import type { ThemeMode } from '../../../store/themeContext'
import { accentOptions } from '../themeOptions'

const modes: ReadonlyArray<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
	{ value: 'light', label: 'Light', icon: Sun },
	{ value: 'dark', label: 'Dark', icon: Moon },
	{ value: 'system', label: 'System', icon: Monitor },
]

export function SettingsPage() {
	const { mode, accent, setMode, setAccent } = useTheme()

	return (
		<main className="min-h-screen bg-canvas p-4 text-ink sm:p-8">
			<section className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-5 sm:p-6">
				<Link
					to="/chat"
					className="mb-5 inline-flex items-center gap-2 text-sm text-muted hover:text-brand"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to chat
				</Link>
				<h1 className="text-xl font-semibold">Appearance</h1>

				<section
					className="mt-6"
					aria-labelledby="appearance-mode-heading"
				>
					<h2
						id="appearance-mode-heading"
						className="text-sm font-semibold"
					>
						Theme
					</h2>
					<div className="mt-3 grid grid-cols-3 gap-2">
						{modes.map(({ value, label, icon: Icon }) => (
							<button
								key={value}
								type="button"
								onClick={() => setMode(value)}
								aria-pressed={mode === value}
								className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors ${
									mode === value
										? 'border-brand bg-brand/10 text-brand'
										: 'border-border bg-elevated text-muted hover:text-ink'
								}`}
							>
								<Icon className="h-5 w-5" />
								{label}
							</button>
						))}
					</div>
				</section>

				<section
					className="mt-7"
					aria-labelledby="accent-color-heading"
				>
					<div className="flex items-center justify-between">
						<h2
							id="accent-color-heading"
							className="text-sm font-semibold"
						>
							Accent color
						</h2>
						<label className="relative flex h-9 items-center gap-2 rounded-full border border-border px-2 text-xs text-muted">
							<span>Custom</span>
							<input
								type="color"
								value={accent}
								onChange={(event) =>
									setAccent(event.target.value)
								}
								className="h-6 w-6 cursor-pointer rounded-full border-0 bg-transparent p-0"
								aria-label="Choose a custom accent color"
							/>
						</label>
					</div>
					<div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-8">
						{accentOptions.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => setAccent(option.value)}
								aria-label={`Use ${option.name}`}
								aria-pressed={
									accent.toLowerCase() === option.value
								}
								className="group flex flex-col items-center gap-2 text-xs text-muted"
							>
								<span
									className="grid h-10 w-10 place-items-center rounded-full border border-black/10 shadow-sm"
									style={{ backgroundColor: option.value }}
								>
									{accent.toLowerCase() === option.value ? (
										<Check className="h-4 w-4 text-white" />
									) : null}
								</span>
								<span className="hidden sm:block">{option.name}</span>
							</button>
						))}
					</div>
				</section>
			</section>
		</main>
	)
}
