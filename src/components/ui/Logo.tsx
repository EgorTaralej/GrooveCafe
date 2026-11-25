import { BRAND_WORDMARK, LOGO_ALT, LOGO_SRC } from '@/config/brand'
import VinylRecord from './VinylRecord'

interface Props {
  /** Height classes for the real logo image, e.g. "h-10 sm:h-12". */
  className?: string
}

/**
 * Site logo. The file/link is set in `src/config/brand.ts` (LOGO_SRC).
 * Until then a temporary SVG record + wordmark is shown.
 */
export default function Logo({ className = 'h-10' }: Props) {
  if (LOGO_SRC) {
    return <img src={LOGO_SRC} alt={LOGO_ALT} className={`w-auto object-contain ${className}`} />
  }

  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <VinylRecord spinning={false} className="h-9 w-9" />
      <span className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-cream">
        {BRAND_WORDMARK[0]} <span className="text-amber-400">{BRAND_WORDMARK[1]}</span>
      </span>
    </span>
  )
}
