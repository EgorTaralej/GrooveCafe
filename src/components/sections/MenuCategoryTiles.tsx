import { Link } from 'react-router-dom'
import { ChevronRightIcon, ImageIcon } from '@/components/ui/icons'
import type { MenuCategory } from '@/types'

export default function MenuCategoryTiles({ categories }: { categories: MenuCategory[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {categories.map((cat) => (
        <li key={cat.id}>
          <Link
            to={`/menu#${cat.id}`}
            className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-3xl border border-smoke bg-gradient-to-br from-graphite via-charcoal to-amber-600/20 p-5 transition hover:border-amber-500/60 hover:shadow-glow"
          >
            {!cat.image && (
              <ImageIcon className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-amber-400/50 sm:h-12 sm:w-12" />
            )}
            {cat.image && (
              <>
                <img
                  src={cat.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition group-hover:opacity-80"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/10 to-ink/80"
                />
              </>
            )}
            <span className="relative font-display text-lg font-medium leading-tight text-cream sm:text-xl">
              {cat.title}
            </span>
            <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/50 px-4 py-1.5 text-sm text-amber-300 transition group-hover:bg-amber-500/10">
              <ChevronRightIcon />
              Виж още
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}