import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, inputClass } from '@/components/ui/Field'
import { todayISO } from '@/lib/format'
import type { CafeEvent, ReservationFormValues } from '@/types'

/** Time slots offered for a plain table booking (no event). */
const TABLE_SLOTS = ['12:00', '14:00', '16:00', '18:00', '19:00', '20:00', '21:00']
const MAX_GUESTS = 20

type Errors = Partial<Record<keyof ReservationFormValues, string>>

interface Props {
  event?: CafeEvent
  onSuccess: () => void
}

export default function ReservationForm({ event, onSuccess }: Props) {
  const slots = event ? event.timeSlots : TABLE_SLOTS
  // For an event the guests are limited by the seats the admin left free.
  const freeSeats = event ? Math.max(event.capacity - event.reserved, 0) : undefined
  const maxGuests = freeSeats === undefined ? MAX_GUESTS : Math.min(MAX_GUESTS, freeSeats)

  const [values, setValues] = useState<ReservationFormValues>({
    name: '',
    phone: '',
    date: event ? event.date : '',
    time: slots[0] ?? '',
    guests: Math.max(1, Math.min(2, maxGuests)),
    notes: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const set = <K extends keyof ReservationFormValues>(key: K, value: ReservationFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  function validate(): Errors {
    const e: Errors = {}
    if (values.name.trim().length < 2) e.name = 'Моля, въведете име.'
    if (!/^[+\d\s()-]{7,}$/.test(values.phone.trim())) e.phone = 'Моля, въведете валиден телефон.'
    if (!values.date) e.date = 'Изберете дата.'
    if (!values.time) e.time = 'Изберете час.'
    if (!Number.isFinite(values.guests) || values.guests < 1 || values.guests > maxGuests) {
      e.guests = event
        ? `Свободни места: ${maxGuests}.`
        : `Брой гости: от 1 до ${MAX_GUESTS}.`
    }
    return e
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSubmitting(true)
    try {
      // -----------------------------------------------------------------
      // TODO(payment): ПЛАЩАНЕ – ще се добави в следващия етап.
      //
      // Тук ще се интегрира онлайн плащането (Stripe Checkout / PayPal):
      //   1. Изпращаме заявката към бекенда (POST /api/reservations) и
      //      получаваме `reservationId`.
      //   2. Ако `event.pricePerPerson > 0`, изчисляваме сума:
      //        total = event.pricePerPerson * values.guests
      //      и създаваме Checkout сесия / PayPal order на сървъра.
      //   3. Пренасочваме клиента към Stripe/PayPal и при успех
      //      (webhook) маркираме резервацията като платена и увеличаваме
      //      `event.reserved` (в демото админът го променя ръчно от /admin).
      //
      // Засега само симулираме изпращане – няма реални данни, които да
      // напускат браузъра.
      // -----------------------------------------------------------------
      await new Promise((resolve) => setTimeout(resolve, 700))
      console.info('[demo] reservation request', { event: event?.id ?? 'table', ...values })
      onSuccess()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Име" error={errors.name} htmlFor="res-name" required>
        <input
          id="res-name"
          className={inputClass}
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          autoComplete="name"
          placeholder="Иван Иванов"
        />
      </Field>

      <Field label="Телефон" error={errors.phone} htmlFor="res-phone" required>
        <input
          id="res-phone"
          type="tel"
          className={inputClass}
          value={values.phone}
          onChange={(e) => set('phone', e.target.value)}
          autoComplete="tel"
          placeholder="0888 123 456"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Дата" error={errors.date} htmlFor="res-date" required>
          <input
            id="res-date"
            type="date"
            className={`${inputClass} [color-scheme:dark] disabled:opacity-60`}
            value={values.date}
            min={todayISO()}
            disabled={Boolean(event)}
            onChange={(e) => set('date', e.target.value)}
          />
        </Field>

        <Field label="Предпочитан час" error={errors.time} htmlFor="res-time" required>
          <select
            id="res-time"
            className={inputClass}
            value={values.time}
            onChange={(e) => set('time', e.target.value)}
          >
            {slots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Брой гости"
        error={errors.guests}
        htmlFor="res-guests"
        required
        hint={event ? `Свободни места: ${maxGuests}` : undefined}
      >
        <input
          id="res-guests"
          type="number"
          inputMode="numeric"
          min={1}
          max={maxGuests}
          className={inputClass}
          value={values.guests}
          onChange={(e) => set('guests', Number(e.target.value))}
        />
      </Field>

      <Field
        label="Бележки (по желание)"
        htmlFor="res-notes"
        hint="Уточнете меню, повод и други подробности."
      >
        <textarea
          id="res-notes"
          rows={3}
          maxLength={300}
          aria-describedby="res-notes-hint"
          className={inputClass}
          value={values.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="напр. рожден ден, предпочитания за менюто, детско столче…"
        />
      </Field>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Изпращане…' : 'Изпрати заявка'}
      </Button>
      <p className="text-center text-xs text-mute">Резервацията се потвърждава от нас по телефон.</p>
    </form>
  )
}
