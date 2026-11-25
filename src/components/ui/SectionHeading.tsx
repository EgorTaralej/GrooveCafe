interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: Props) {
  const alignment = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <div className={`mb-12 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-amber-400">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-semibold text-cream sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">{subtitle}</p>}
    </div>
  )
}
