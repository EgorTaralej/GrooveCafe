import { useState, useSyncExternalStore } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks, site } from '@/data/site'
import { useReservation } from '@/features/reservation/ReservationContext'
import { Button } from '@/components/ui/Button'
import CallButton from '@/components/ui/CallButton'
import Logo from '@/components/ui/Logo'

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}
const getScrolled = () => window.scrollY > 16
const getServerScrolled = () => false

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled)
  const { pathname } = useLocation()
  const { openReservation } = useReservation()

  // Close the mobile menu on navigation (state adjusted during render, no effect needed).
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMenuOpen(false)
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-sm tracking-wide transition hover:text-amber-300 ${
      isActive
        ? 'text-amber-400 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-amber-500'
        : 'text-cream/80'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled || menuOpen ? 'border-b border-smoke/70 bg-ink/90 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="shrink-0" aria-label={`${site.name} – начало`}>
          {/* ЛОГО: файлът/линкът се задава в src/config/brand.ts */}
          <Logo className="h-12 sm:h-16" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основна навигация">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CallButton compact />
          <button
            type="button"
            className="rounded-full p-2 text-cream lg:hidden"
            aria-label={menuOpen ? 'Затвори менюто' : 'Отвори менюто'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="container-page flex flex-col gap-5 pb-8 pt-2 lg:hidden" aria-label="Мобилна навигация">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              <span className="text-lg">{l.label}</span>
            </NavLink>
          ))}
          <Button
            variant="ghost"
            onClick={() => {
              setMenuOpen(false)
              openReservation()
            }}
          >
            Резервирай маса
          </Button>
        </nav>
      )}
    </header>
  )
}
