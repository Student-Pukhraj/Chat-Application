import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = Readonly<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' }>

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-brand text-brand-foreground hover:bg-brand-strong',
    ghost: 'text-ink hover:bg-elevated',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  return <button type={type} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`} {...props} />
}
