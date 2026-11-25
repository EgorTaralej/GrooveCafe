import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { formatEventDate, todayISO } from '@/lib/format'
import { eventsActions, useEvents } from '@/store/eventsStore'
import type { CafeEvent } from '@/types'
import EventEditor, { blankEvent } from './EventEditor'

const stepButton =
  'flex h-9 w-9 items-center justify-center rounded-full border border-smoke text-lg text-cream transition hover:border-amber-500 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-40'
const smallButton =
  'rounded-full border border-smoke px-4 py-1.5 text-sm text-cream/80 transition hover:border-amber-500 hover:text-amber-300'

export default function AdminEvents() {
  const events = useEvents()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const today = todayISO()

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-cream">Събития</h2>
        <Button
          onClick={() => {
            setCreating(true)
            setEditingId(null)
          }}
        >
          + Добави събитие
        </Button>
      </div>

      {creating && (
        <div className="mb-6">
          <EventEditor
            title="Ново събитие"
            initial={blankEvent()}
            submitLabel="Добави"
            onSave={(draft) => {
              eventsActions.add(draft)
              setCreating(false)
            }}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {sorted.length === 0 && !creating && <p className="text-mute">Няма събития. Добавете първото.</p>}

      <ul className="space-y-4">
        {sorted.map((ev) => (
          <li key={ev.id}>
            {editingId === ev.id ? (
              <EventEditor
                title={`Редакция: ${ev.title}`}
                initial={ev}
                submitLabel="Запази"
                onSave={(draft) => {
                  eventsActions.update(ev.id, draft)
                  setEditingId(null)
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <EventRow
                event={ev}
                past={ev.date < today}
                onEdit={() => {
                  setEditingId(ev.id)
                  setCreating(false)
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

function EventRow({ event, past, onEdit }: { event: CafeEvent; past: boolean; onEdit: () => void }) {
  const free = Math.max(event.capacity - event.reserved, 0)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-smoke bg-charcoal p-5 xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0">
        <p className="font-medium text-cream">
          {event.title}
          {past && <span className="ml-2 rounded-full bg-smoke px-2 py-0.5 text-xs text-mute">минало</span>}
        </p>
        <p className="mt-1 text-sm text-mute">
          {formatEventDate(event.date)} · {event.time}
          {event.artist && ` · ${event.artist}`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2" role="group" aria-label="Резервирани места">
          <span className="text-sm text-mute">Резервирани:</span>
          <button
            type="button"
            aria-label="Намали резервираните места"
            className={stepButton}
            disabled={event.reserved <= 0}
            onClick={() => eventsActions.setReserved(event.id, event.reserved - 1)}
          >
            −
          </button>
          <input
            type="number"
            min={0}
            max={event.capacity}
            aria-label={`Резервирани места за „${event.title}“`}
            value={event.reserved}
            onChange={(e) => eventsActions.setReserved(event.id, Number(e.target.value))}
            className="w-16 rounded-lg border border-smoke bg-ink px-2 py-1.5 text-center text-cream focus:border-amber-500 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Увеличи резервираните места"
            className={stepButton}
            disabled={event.reserved >= event.capacity}
            onClick={() => eventsActions.setReserved(event.id, event.reserved + 1)}
          >
            +
          </button>
          <span className="text-sm text-mute">от {event.capacity}</span>
        </div>

        <span className={`text-sm ${free === 0 ? 'text-red-400' : 'text-amber-300'}`}>
          {free === 0 ? 'Изчерпано' : `Свободни: ${free}`}
        </span>

        <div className="flex gap-2">
          <button type="button" className={smallButton} onClick={onEdit}>
            Редактирай
          </button>
          <button
            type="button"
            className={`${smallButton} hover:border-red-400 hover:text-red-400`}
            onClick={() => {
              if (window.confirm(`Да изтрия ли „${event.title}“?`)) eventsActions.remove(event.id)
            }}
          >
            Изтрий
          </button>
        </div>
      </div>
    </div>
  )
}
