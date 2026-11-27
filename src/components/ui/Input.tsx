import type { InputHTMLAttributes } from 'react'

type InputProps = Readonly<InputHTMLAttributes<HTMLInputElement>>

export function Input({ className = '', ...props }: InputProps) {
  return <input className={`h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20 ${className}`} {...props} />
}
