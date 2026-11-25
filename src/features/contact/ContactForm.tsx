import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, inputClass } from '@/components/ui/Field'
import { inquiryTypes, MESSAGE_MAX_LENGTH } from '@/data/contact'

interface Values {
  name: string
  email: string
  phone: string
  topic: string
  message: string
  consent: boolean
}
type Errors = Partial<Record<keyof Values, string>>

const empty: Values = { name: '', email: '', phone: '', topic: '', message: '', consent: false }

export default function ContactForm() {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const set = <K extends keyof Values>(key: K, value: Values[K]) => setValues((v) => ({ ...v, [key]: value }))

  function validate(): Errors {
    const e: Errors = {}
    if (values.name.trim().length < 2) e.name = 'Моля, въведете име и фамилия.'
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) e.email = 'Моля, въведете валиден имейл адрес.'
    if (!/^[+\d\s()-]{7,}$/.test(values.phone.trim())) e.phone = 'Моля, въведете валиден телефонен номер.'
    if (!values.topic) e.topic = 'Изберете опция.'
    if (values.message.trim().length < 5) e.message = 'Моля, напишете съобщение.'
    if (!values.consent) e.consent = 'Необходимо е съгласие.'
    return e
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSending(true)
    try {
      // TODO(backend): изпращане на съобщението към имейла на заведението
      // (напр. serverless функция / Formspree / EmailJS). Засега е симулация:
      // данните не напускат браузъра.
      await new Promise((resolve) => setTimeout(resolve, 700))
      console.info('[demo] contact message', values)
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="py-6 text-center">
        <p className="font-display text-xl text-amber-300">Благодарим ви!</p>
        <p className="mt-3 text-mute">Получихме съобщението ви и ще се свържем с вас възможно най-скоро.</p>
        <Button
          variant="ghost"
          className="mt-8"
          onClick={() => {
            setValues(empty)
            setSent(false)
          }}
        >
          Ново съобщение
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Име" htmlFor="c-name" error={errors.name} required>
        <input
          id="c-name"
          className={inputClass}
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          autoComplete="name"
          placeholder="Име и фамилия"
        />
      </Field>

      <Field label="Имейл адрес" htmlFor="c-email" error={errors.email} required>
        <input
          id="c-email"
          type="email"
          className={inputClass}
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          autoComplete="email"
          placeholder="Въведете имейл адрес"
        />
      </Field>

      <Field label="Телефонен номер" htmlFor="c-phone" error={errors.phone} required>
        <input
          id="c-phone"
          type="tel"
          className={inputClass}
          value={values.phone}
          onChange={(e) => set('phone', e.target.value)}
          autoComplete="tel"
          placeholder="Въведете телефонен номер"
        />
      </Field>

      <Field label="Запитване за" htmlFor="c-topic" error={errors.topic} required>
        <select
          id="c-topic"
          className={inputClass}
          value={values.topic}
          onChange={(e) => set('topic', e.target.value)}
        >
          <option value="" disabled>
            Изберете опция
          </option>
          {inquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Съобщение"
        htmlFor="c-message"
        error={errors.message}
        required
        aside={`${values.message.length} / ${MESSAGE_MAX_LENGTH}`}
      >
        <textarea
          id="c-message"
          rows={5}
          maxLength={MESSAGE_MAX_LENGTH}
          className={inputClass}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="Въведете вашия текст тук…"
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm text-cream/80">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-amber-500"
          />
          <span>
            Съгласен/на съм данните ми да бъдат използвани, за да получа отговор на запитването.
            <span className="ml-1 text-red-400">*</span>
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1.5 text-sm text-red-400">
            {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" disabled={sending}>
        {sending ? 'Изпращане…' : 'Изпрати'}
      </Button>
    </form>
  )
}
