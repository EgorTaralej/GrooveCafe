import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminEvents from '@/features/admin/AdminEvents'
import AdminLogin from '@/features/admin/AdminLogin'
import AdminMenu from '@/features/admin/AdminMenu'
import { site } from '@/data/site'
import { eventsActions } from '@/store/eventsStore'
import { logout, useIsAdmin } from '@/store/authStore'
import { menuActions } from '@/store/menuStore'

type Tab = 'events' | 'menu'

const tabs: { id: Tab; label: string }[] = [
  { id: 'events', label: 'Събития и места' },
  { id: 'menu', label: 'Меню' },
]

export default function AdminPage() {
  const isAdmin = useIsAdmin()
  const [tab, setTab] = useState<Tab>('events')

  if (!isAdmin) return <AdminLogin />

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-smoke bg-charcoal/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <p className="font-display text-lg font-semibold text-cream">
            Админ панел <span className="font-normal text-mute">· {site.name}</span>
          </p>
          <div className="flex items-center gap-5 text-sm">
            <Link to="/" className="text-cream/80 hover:text-amber-300">
              ← Към сайта
            </Link>
            <button type="button" onClick={logout} className="text-cream/80 hover:text-amber-300">
              Изход
            </button>
          </div>
        </div>
      </header>

      <main className="container-page py-10">
        <p className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-relaxed text-cream/80">
          <strong className="text-amber-300">Демо режим:</strong> промените се записват само в този браузър и се
          виждат веднага на сайта. В реалната версия ще се пазят в база данни, а входът ще е защитен.
        </p>

        <div role="tablist" aria-label="Раздели" className="mb-8 flex gap-2 border-b border-smoke">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 px-5 py-3 text-sm transition ${
                tab === t.id
                  ? 'border-amber-500 text-amber-300'
                  : 'border-transparent text-mute hover:text-cream'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'events' ? <AdminEvents /> : <AdminMenu />}

        <div className="mt-16 border-t border-smoke pt-6">
          <button
            type="button"
            className="text-sm text-mute underline-offset-4 hover:text-red-400 hover:underline"
            onClick={() => {
              if (window.confirm('Да върна ли началните (демо) събития и меню? Всички промени ще се загубят.')) {
                eventsActions.reset()
                menuActions.reset()
              }
            }}
          >
            Върни началните данни
          </button>
        </div>
      </main>
    </div>
  )
}
