import { ImageIcon } from '@/components/ui/icons'

export default function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-[4/3] w-full items-center justify-center rounded-3xl border border-dashed border-amber-500/30 bg-gradient-to-br from-graphite via-ink to-amber-600/20 text-amber-400/50"
    >
      <ImageIcon className="h-14 w-14" />
    </div>
  )
}
