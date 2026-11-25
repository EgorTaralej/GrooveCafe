import { todayISO } from '@/lib/format'
import { useEvents } from '@/store/eventsStore'
import EventCard from './EventCard'

interface Props {
  limit?: number
}

export default function EventList({ limit }: Props) {
  const all = useEvents()
  const today = todayISO()
  const upcoming = all
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, limit)

  if (upcoming.length === 0) {
    return <p className="text-mute">В момента няма обявени събития. Следете ни в социалните мрежи!</p>
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {upcoming.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
    </div>
  )
}
