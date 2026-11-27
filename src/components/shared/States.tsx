import { AlertCircle, LoaderCircle } from 'lucide-react'

export function LoadingState({ label = 'Loading' }: Readonly<{ label?: string }>) {
  return <div className="flex h-full min-h-32 items-center justify-center gap-2 text-sm text-muted"><LoaderCircle className="h-4 w-4 animate-spin" />{label}</div>
}

export function ErrorState({ message }: Readonly<{ message: string }>) {
  return <div className="m-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><span>{message}</span></div>
}

export function EmptyState({ title, description }: Readonly<{ title: string; description: string }>) {
  return <div className="flex h-full min-h-40 flex-col items-center justify-center px-6 text-center"><div className="mb-3 h-12 w-12 rounded-full bg-elevated" /><h3 className="font-semibold text-ink">{title}</h3><p className="mt-1 max-w-xs text-sm text-muted">{description}</p></div>
}
