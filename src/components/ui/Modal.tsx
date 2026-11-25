import { useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/** Accessible modal: ESC to close, click on backdrop, scroll lock, focus on open. */
export default function Modal({ open, onClose, title, children }: Props) {
  const prevOverflow = useRef('')

  // Always points to the latest onClose, so the ESC listener below never goes stale.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // ESC is listened for on `document` (not via onKeyDown on the dialog): after the form is replaced by
  // the "thank you" message the focused button disappears and focus falls back to <body>, so a
  // handler on the dialog would no longer receive the key.
  const onEscape = useRef((e: KeyboardEvent) => {
    if (e.key === 'Escape') onCloseRef.current()
  })

  // Called when the dialog mounts (open) and unmounts (close): focus it, lock/unlock body scroll
  // and add/remove the ESC listener.
  const dialogRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      prevOverflow.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onEscape.current)
      el.focus()
    } else {
      document.body.style.overflow = prevOverflow.current
      document.removeEventListener('keydown', onEscape.current)
    }
  }, [])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="animate-fade-up max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-smoke bg-charcoal p-6 shadow-2xl outline-none sm:rounded-3xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold text-cream">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Затвори"
            className="rounded-full p-2 text-mute transition hover:bg-smoke hover:text-cream"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}
