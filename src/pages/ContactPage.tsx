import { site } from '@/data/site'
import ContactForm from '@/features/contact/ContactForm'

export default function ContactPage() {
  const tel = (n: string) => `tel:${n.replace(/\s/g, '')}`

  return (
    <>
      <section className="pt-32 sm:pt-40">
        <h1 className="sr-only">Контакти</h1>
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-semibold text-cream">Работно време</h2>
            <dl className="max-w-sm space-y-2.5 text-cream/80">
              {site.openingHours.map((h) => (
                <div key={h.day} className="flex justify-between gap-6 border-b border-smoke pb-2.5">
                  <dt>{h.day}:</dt>
                  <dd className={h.hours === 'Затворено' ? 'text-mute' : 'text-cream'}>{h.hours}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 space-y-2 text-cream/80">
              <li>
                Телефон:{' '}
                <a href={tel(site.phone)} className="text-amber-400 hover:text-amber-300">
                  {site.phone}
                </a>
              </li>
              <li>
                Имейл:{' '}
                <a href={`mailto:${site.email}`} className="text-amber-400 hover:text-amber-300">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cream">Адрес</h2>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-amber-400 hover:text-amber-300"
            >
              {site.address}, {site.city}
            </a>
            <iframe
              title={`Карта: ${site.name}, ${site.address}`}
              src={site.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="mt-5 h-80 w-full rounded-3xl border border-smoke [filter:invert(0.9)_hue-rotate(180deg)_contrast(0.9)]"
            />
          </div>
        </div>
      </section>

      <section className="section mt-20 border-t border-smoke bg-charcoal">
        <div className="container-page">
          <div className="mx-auto max-w-xl rounded-3xl border border-smoke bg-ink p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold text-cream">Форма за контакти</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
