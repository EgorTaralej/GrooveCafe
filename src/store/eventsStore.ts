import { useSyncExternalStore } from 'react'
import { events as defaultEvents } from '@/data/events'
import { uid } from '@/lib/id'
import type { CafeEvent } from '@/types'
import { createStore } from './createStore'

/** Bump the version in the key when the shape of CafeEvent changes. */
export const eventsStore = createStore<CafeEvent[]>('groove-cafe.events.v1', defaultEvents)

export function useEvents(): CafeEvent[] {
  return useSyncExternalStore(eventsStore.subscribe, eventsStore.get)
}

export const eventsActions = {
  add(event: Omit<CafeEvent, 'id'>) {
    eventsStore.set((prev) => [...prev, { ...event, id: uid('ev') }])
  },
  update(id: string, patch: Partial<Omit<CafeEvent, 'id'>>) {
    eventsStore.set((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  },
  remove(id: string) {
    eventsStore.set((prev) => prev.filter((e) => e.id !== id))
  },
  /** Set the number of reserved seats (clamped between 0 and the event capacity). */
  setReserved(id: string, value: number) {
    eventsStore.set((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, reserved: Math.min(Math.max(Math.round(value) || 0, 0), e.capacity) } : e,
      ),
    )
  },
  reset() {
    eventsStore.reset()
  },
}
