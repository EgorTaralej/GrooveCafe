interface Props {
  className?: string
  spinning?: boolean
}

export default function VinylRecord({ className = '', spinning = true }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Грамофонна плоча"
      className={`${spinning ? 'animate-spin-slow' : ''} ${className}`}
    >
      <defs>
        <radialGradient id="vr-body" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1b1b1d" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <linearGradient id="vr-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#vr-body)" stroke="#2b2b2e" strokeWidth="1" />
      {[90, 82, 74, 66, 58, 50].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#fff" strokeOpacity="0.05" />
      ))}
      <circle cx="100" cy="100" r="98" fill="url(#vr-sheen)" />
      <circle cx="100" cy="100" r="34" fill="#d99a2b" />
      <circle cx="100" cy="100" r="34" fill="none" stroke="#b87a1a" strokeWidth="2" />
      <circle cx="100" cy="100" r="4" fill="#0b0b0c" />
    </svg>
  )
}
