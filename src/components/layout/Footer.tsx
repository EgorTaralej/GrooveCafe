import { Link } from 'react-router-dom'
import Logo from '@/components/ui/Logo'
import { groupOpeningHours } from '@/lib/format'
import { navLinks, site } from '@/data/site'

export default function Footer() {
  const tel = (n: string) => `tel:${n.replace(/\s/g, '')}`

  return (
    <footer className="border-t border-smoke bg-charcoal">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1.4fr_1fr]">
        <div>
          {/* ЛОГО: файлът/линкът се задава в src/config/brand.ts */}
          <Logo className="h-12" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">{site.tagline}</p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-400">Контакти</h3>
          <address className="space-y-2 text-sm not-italic text-cream/80">
            <p>
              <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-amber-300">
                {site.address}
                <br />
                {site.city}
              </a>
            </p>
            <p>
              <a href={tel(site.phone)} className="hover:text-amber-300">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-amber-300">
                {site.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-400">Работно време</h3>
          <ul className="space-y-2 text-sm text-cream/80">
            {groupOpeningHours(site.openingHours).map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="whitespace-nowrap text-mute">{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-400">Следвай ни</h3>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              <a href={site.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-amber-300">
                Facebook
              </a>
            </li>
            <li>
              <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-amber-300">
                Instagram
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-amber-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-smoke py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-mute sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Демо версия на уебсайт.
          </p>
          <Link to="/admin" className="hover:text-amber-300">
            Админ вход
          </Link>
        </div>
      </div>
    </footer>
  )
}
