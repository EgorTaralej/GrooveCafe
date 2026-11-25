import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { formatEventDate } from '@/lib/format'
import { site } from '@/data/site'
import type { CafeEvent } from '@/types'
import ReservationForm from './ReservationForm'

interface Props {
  open: boolean
  onClose: () => void
  event?: CafeEvent
}

export default function ReservationModal({ open, onClose, event }: Props) {
  const title = event ? `Резервация: ${event.title}` : 'Резервирай маса'

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <ReservationBody event={event} onClose={onClose} />
    </Modal>
  )
}

/**
 * Modal unmounts its children when closed, so `submitted` resets to false
 * every time the modal is reopened (no effect needed).
 */
function ReservationBody({ event, onClose }: { event?: CafeEvent; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="py-6 text-center">
        <p className="font-display text-xl text-amber-300">Благодарим!</p>
        <p className="mt-3 text-mute">
          Получихме заявката ви. Ще се свържем с вас за потвърждение. Ако е спешно, обадете се на{' '}
          <a className="text-amber-300 underline" href={`tel:${site.reservationPhone.replace(/\s/g, '')}`}>
            {site.reservationPhone}
          </a>
          .
        </p>
        <Button className="mt-8" onClick={onClose}>
          Затвори
        </Button>
      </div>
    )
  }

  return (
    <>
      {event && (
        <p className="-mt-3 mb-6 text-sm text-mute">
          {formatEventDate(event.date)} · {event.time} · {event.artist}
        </p>
      )}
      <ReservationForm event={event} onSuccess={() => setSubmitted(true)} />
    </>
  )
}
