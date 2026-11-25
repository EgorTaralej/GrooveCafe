import type { OpeningHours } from '@/types'

const bgDate = new Intl.DateTimeFormat('bg-BG', {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
})

/** "2026-11-21" -> "събота, 21 ноември" */
export function formatEventDate(iso: string): string {
  return bgDate.format(new Date(`${iso}T12:00:00`))
}

export function dayOf(iso: string): string {
  return String(new Date(`${iso}T12:00:00`).getDate())
}

export function monthShort(iso: string): string {
  return new Intl.DateTimeFormat('bg-BG', { month: 'short' })
    .format(new Date(`${iso}T12:00:00`))
    .replace('.', '')
}

/** Today as YYYY-MM-DD in local time (used for <input type="date" min>) */
export function todayISO(): string {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/**
 * Groups consecutive days with the same hours:
 * Понеделник…Петък 08:00 – 23:00 -> "Понеделник – Петък".
 */
export function groupOpeningHours(list: OpeningHours[]): OpeningHours[] {
  const groups: { from: string; to: string; hours: string }[] = []
  for (const { day, hours } of list) {
    const last = groups[groups.length - 1]
    if (last && last.hours === hours) last.to = day
    else groups.push({ from: day, to: day, hours })
  }
  return groups.map((g) => ({ day: g.from === g.to ? g.from : `${g.from} – ${g.to}`, hours: g.hours }))
}

/** ISO дата (YYYY-MM-DD) след `days` дни от днес. Ползва се от примерните събития, за да са винаги предстоящи. */
export function addDaysISO(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}
