type AvatarProps = Readonly<{ initials: string; color?: string; size?: 'sm' | 'md' | 'lg'; online?: boolean }>

export function Avatar({ initials, color = 'bg-brand', size = 'md', online }: AvatarProps) {
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base' }
  return (
    <div className="relative shrink-0">
      <div className={`${sizes[size]} ${color} grid place-items-center rounded-full font-semibold ${color === 'bg-brand' ? 'text-brand-foreground' : 'text-white'}`}>{initials}</div>
      {online ? <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface bg-emerald-500" aria-label="Online" /> : null}
    </div>
  )
}
