import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition focus-visible:outline disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none'

const variants: Record<Variant, string> = {
  primary: 'bg-amber-500 text-ink hover:bg-amber-400 hover:shadow-glow',
  ghost: 'border border-amber-500/60 text-amber-300 hover:bg-amber-500/10',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

interface ButtonLinkProps {
  to: string
  variant?: Variant
  className?: string
  children: ReactNode
}

export function ButtonLink({ to, variant = 'primary', className = '', children }: ButtonLinkProps) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
