import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, inputClass } from '@/components/ui/Field'
import { todayISO } from '@/lib/format'
import type { CafeEvent } from '@/types'

export type EventDraft = Omit<CafeEvent, 'id'>

/** Empty event with sensible defaults for the "Add event" form. */
export function blankEvent(): EventDraft {
  return {
    title: '',
    date: todayISO(),
    time: '20:00',
    artist: '',
    description: '',
    genre: '',
    priceLabel: 'Резервация на маса',
    pricePerPerson: 0,
    image: '',
    capacity: 30,
    reserved: 0,
    timeSlots: ['19:00', '19:30', '20:00'],
  }
}

/** Form state keeps everything as text so fields can be cleared while typing. */
interface FormState {
  title: string
  date: string
  time: string
  artist: string
  description: string
  genre: string
  priceLabel: string
  pricePerPerson: string
  image: string
  capacity: string
  reserved: string
  timeSlots: string
}

type Errors = Partial<Record<keyof FormState, string>>

const toForm = (e: EventDraft): FormState => ({
  ...e,
  pricePerPerson: String(e.pricePerPerson),
  capacity: String(e.capacity),
  reserved: String(e.reserved),
  timeSlots: e.timeSlots.join(', '),
})

interface Props {
  title: string
  initial: EventDraft
  submitLabel: string
  onSave: (draft: EventDraft) => void
  onCancel: () => void
}

/** Create / edit form for one event. */
export default function EventEditor({ title, initial, submitLabel, onSave, onCancel }: Props) {
  const [form, setForm] = useState<FormState>(() => toForm(initial))
  const [errors, setErrors] = useState<Errors>({})

  const set = (key: keyof FormState, value: string) => setForm((f) => ({ ...f, [key]: value }))

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()

    const capacity = Number(form.capacity)
    const reserved = Number(form.reserved)
    const pricePerPerson = Number(form.pricePerPerson) || 0
    const slots = form.timeSlots
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const found: Errors = {}
    if (!form.title.trim()) found.title = 'Въведете заглавие.'
    if (!form.date) found.date = 'Изберете дата.'
    if (!/^\d{1,2}:\d{2}$/.test(form.time.trim())) found.time = 'Формат ЧЧ:ММ, напр. 20:00.'
    if (!Number.isInteger(capacity) || capacity < 1) found.capacity = 'Поне 1 място.'
    if (!Number.isInteger(reserved) || reserved < 0 || reserved > capacity)
      found.reserved = 'От 0 до общия брой места.'
    if (slots.some((s) => !/^\d{1,2}:\d{2}$/.test(s))) found.timeSlots = 'Часове във формат ЧЧ:ММ, разделени със запетая.'
    setErrors(found)
    if (Object.keys(found).length > 0) return

    onSave({
      title: form.title.trim(),
      date: form.date,
      time: form.time.trim(),
      artist: form.artist.trim(),
      description: form.description.trim(),
      genre: form.genre.trim(),
      priceLabel: form.priceLabel.trim(),
      pricePerPerson,
      image: form.image.trim(),
      capacity,
      reserved,
      timeSlots: slots.length > 0 ? slots : [form.time.trim()],
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-amber-500/40 bg-charcoal p-5 sm:p-6"
    >
      <h3 className="text-lg font-semibold text-cream">{title}</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Заглавие" htmlFor="ev-title" error={errors.title} required>
            <input id="ev-title" className={inputClass} value={form.title} onChange={(e) => set('title', e.target.value)} />
          </Field>
        </div>

        <Field label="Дата" htmlFor="ev-date" error={errors.date} required>
          <input
            id="ev-date"
            type="date"
            className={`${inputClass} [color-scheme:dark]`}
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
          />
        </Field>
        <Field label="Начален час" htmlFor="ev-time" error={errors.time} required>
          <input id="ev-time" className={inputClass} value={form.time} onChange={(e) => set('time', e.target.value)} />
        </Field>

        <Field label="Изпълнител / организатор" htmlFor="ev-artist">
          <input id="ev-artist" className={inputClass} value={form.artist} onChange={(e) => set('artist', e.target.value)} />
        </Field>
        <Field label="Жанр / вид" htmlFor="ev-genre">
          <input id="ev-genre" className={inputClass} value={form.genre} onChange={(e) => set('genre', e.target.value)} />
        </Field>

        <Field label="Цена (текст на картата)" htmlFor="ev-price-label" hint="напр. 3.50 € на човек“ или „Вход свободен“">
          <input
            id="ev-price-label"
            className={inputClass}
            value={form.priceLabel}
            onChange={(e) => set('priceLabel', e.target.value)}
          />
        </Field>
        <Field label="Цена на човек (число)" htmlFor="ev-price" hint="За бъдещото онлайн плащане. 0 = безплатно / по запитване.">
          <input
            id="ev-price"
            type="number"
            min={0}
            step="0.01"
            className={inputClass}
            value={form.pricePerPerson}
            onChange={(e) => set('pricePerPerson', e.target.value)}
          />
        </Field>

        <Field label="Общо места" htmlFor="ev-capacity" error={errors.capacity} required>
          <input
            id="ev-capacity"
            type="number"
            min={1}
            className={inputClass}
            value={form.capacity}
            onChange={(e) => set('capacity', e.target.value)}
          />
        </Field>
        <Field label="Резервирани места" htmlFor="ev-reserved" error={errors.reserved} required>
          <input
            id="ev-reserved"
            type="number"
            min={0}
            className={inputClass}
            value={form.reserved}
            onChange={(e) => set('reserved', e.target.value)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Часове за резервация"
            htmlFor="ev-slots"
            error={errors.timeSlots}
            hint="Разделени със запетая, напр. 19:00, 19:30, 20:00"
          >
            <input id="ev-slots" className={inputClass} value={form.timeSlots} onChange={(e) => set('timeSlots', e.target.value)} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Снимка / плакат (линк)" htmlFor="ev-image" hint="Линк към изображение. Ако е празно, на картата се показва място за снимка.">
            <input
              id="ev-image"
              type="url"
              placeholder="https://…"
              className={inputClass}
              value={form.image}
              onChange={(e) => set('image', e.target.value)}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Описание" htmlFor="ev-description">
            <textarea
              id="ev-description"
              rows={3}
              className={inputClass}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Отказ
        </Button>
      </div>
    </form>
  )
}
