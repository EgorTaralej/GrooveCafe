import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { CafeEvent } from '@/types'
import ReservationModal from './ReservationModal'

interface ReservationContextValue {
  /** Open the reservation modal. Pass an event to reserve for it, or nothing for a plain table booking. */
  openReservation: (event?: CafeEvent) => void
}

const ReservationContext = createContext<ReservationContextValue | null>(null)

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState<CafeEvent | undefined>()

  const openReservation = useCallback((ev?: CafeEvent) => {
    setEvent(ev)
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ openReservation }), [openReservation])

  return (
    <ReservationContext.Provider value={value}>
      {children}
      <ReservationModal open={open} onClose={close} event={event} />
    </ReservationContext.Provider>
  )
}

export function useReservation(): ReservationContextValue {
  const ctx = useContext(ReservationContext)
  if (!ctx) throw new Error('useReservation must be used inside <ReservationProvider>')
  return ctx
}
