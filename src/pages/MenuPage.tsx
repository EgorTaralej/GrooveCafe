import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import MenuCategoryTiles from '@/components/sections/MenuCategoryTiles'
import SectionHeading from '@/components/ui/SectionHeading'
import { useMenu } from '@/store/menuStore'

export default function MenuPage() {
  const menu = useMenu()
  const { hash } = useLocation()

  // Scroll to the category from the URL (/menu#wine). A new callback identity on every hash
  // change makes React call it again, so this also works when only the hash changes.
  const scrollIfTarget = useCallback(
    (el: HTMLElement | null) => {
      if (el && hash && el.id === hash.slice(1)) el.scrollIntoView()
    },
    [hash],
  )

  return (
    <>
      <section className="pt-32 sm:pt-40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Меню"
            title="Разгледайте менюто ни"
            subtitle="Кафе, вино, коктейли, нещо за хапване и десерт. Избери категория."
          />
          <MenuCategoryTiles categories={menu} />
        </div>
      </section>

      <section className="section">
        <div className="container-page space-y-16">
          {menu.map((cat) => (
            <section key={cat.id} id={cat.id} ref={scrollIfTarget} className="scroll-mt-28">
              <h2 className="mb-6 border-b border-smoke pb-4 text-2xl font-semibold text-amber-400 sm:text-3xl">
                {cat.title}
              </h2>
              {cat.items.length === 0 ? (
                <p className="text-mute">Скоро.</p>
              ) : (
                <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
                  {cat.items.map((item) => (
                    <li key={item.id} className="flex items-baseline gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base text-cream">{item.name}</h3>
                        {item.description && <p className="text-sm text-mute">{item.description}</p>}
                      </div>
                      {item.price && (
                        <>
                          <span aria-hidden="true" className="min-w-4 flex-1 border-b border-dotted border-mute/50" />
                          <span className="shrink-0 font-display text-amber-400">{item.price}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
