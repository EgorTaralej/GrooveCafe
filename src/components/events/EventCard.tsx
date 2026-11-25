import { Button } from '@/components/ui/Button'
import { ChevronRightIcon, ImageIcon } from '@/components/ui/icons'
import { formatEventDate } from '@/lib/format'
import { useReservation } from '@/features/reservation/ReservationContext'
import type { CafeEvent } from '@/types'

const imageBox = 'h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-40 sm:w-40'

/**
 * Poster / photo of the event. The link is set per event (`image` in data/events.ts or the
 * "Снимка / плакат" field in the admin panel). Until there is one, a photo placeholder is shown.
 */
function EventImage({ event }: { event: CafeEvent }) {
  if (event.image) {
    return <img src={event.image} alt={event.title} loading="lazy" className={`${imageBox} object-cover object-top`} />
  }
  return (
    <div
      aria-hidden="true"
      className={`${imageBox} flex items-center justify-center border border-dashed border-amber-500/30 bg-gradient-to-br from-graphite via-ink to-amber-600/20 text-amber-400/50`}
    >
      <ImageIcon className="h-9 w-9 sm:h-12 sm:w-12" />
    </div>
  )
}

export default function EventCard({ event }: { event: CafeEvent }) {
  const { openReservation } = useReservation()
  const free = Math.max(event.capacity - event.reserved, 0)
  const soldOut = free === 0

  return (
    <article className="flex gap-4 rounded-3xl border border-smoke bg-charcoal p-4 transition hover:border-amber-500/50 hover:shadow-glow sm:gap-5 sm:p-5">
      <EventImage event={event} />

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-medium leading-snug text-cream sm:text-xl">{event.title}</h3>
        <p className="mt-1 text-amber-400">{event.priceLabel}</p>
        <p className="mt-2 text-sm leading-relaxed text-cream/80">
          <span className="text-mute">|</span> {formatEventDate(event.date)} <span className="text-mute">|</span>{' '}
          {event.time} <span className="text-mute">|</span> {event.artist}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-mute">{event.description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <span className={`text-xs ${soldOut ? 'text-red-400' : 'text-mute'}`}>
            {soldOut ? 'Няма свободни места' : `Свободни места: ${free}`}
          </span>
          <Button className="ml-auto px-5 py-2" disabled={soldOut} onClick={() => openReservation(event)}>
            <ChevronRightIcon />
            Резервирай
          </Button>
        </div>
      </div>
    </article>
  )
}
