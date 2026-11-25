import { site } from '@/data/site'
import { PhoneIcon } from './icons'

interface Props {
  className?: string
  /** On small screens show only the phone icon (used in the header). */
  compact?: boolean
}

/** „Обади се“ – opens the phone dialer. The number comes from `data/site.ts`. */
export default function CallButton({ className = '', compact = false }: Props) {
  const href = `tel:${site.phone.replace(/\s/g, '')}`

  return (
    <a
      href={href}
      aria-label={`Обади се: ${site.phone}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-sm font-medium tracking-wide text-ink transition hover:bg-amber-400 hover:shadow-glow focus-visible:outline sm:px-5 ${className}`}
    >
      <PhoneIcon className="h-4 w-4" />
      <span className={compact ? 'hidden sm:inline' : ''}>Обади се</span>
    </a>
  )
}
