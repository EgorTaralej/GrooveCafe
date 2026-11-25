import type { ReactNode } from 'react'

export const inputClass =
  'w-full rounded-xl border border-smoke bg-ink px-4 py-3 text-cream placeholder:text-mute/60 transition focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  /** Small helper text under the label (also good for explaining what to write). */
  hint?: string
  required?: boolean
  /** Content on the right side of the label row (e.g. a character counter). */
  aside?: ReactNode
  children: ReactNode
}

export function Field({ label, htmlFor, error, hint, required, aside, children }: FieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm text-cream/80">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
        {aside && <span className="text-xs text-mute">{aside}</span>}
      </div>
      {hint && (
        <p id={`${htmlFor}-hint`} className="mb-2 text-xs leading-relaxed text-mute">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
