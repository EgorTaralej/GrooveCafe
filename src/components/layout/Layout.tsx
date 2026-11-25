import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ReservationProvider } from '@/features/reservation/ReservationContext'
import Header from './Header'
import Footer from './Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useMemo(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <ReservationProvider>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-ink"
      >
        Към съдържанието
      </a>
      <Header />
      <main id="main" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </ReservationProvider>
  )
}
