import { Button } from '@/components/ui/Button'
import { menuActions, useMenu } from '@/store/menuStore'
import type { MenuCategory } from '@/types'

const compactInput =
  'w-full rounded-lg border border-smoke bg-ink px-3 py-2 text-sm text-cream placeholder:text-mute/60 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
const rowGrid = 'grid gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_7rem_auto] sm:items-center'

export default function AdminMenu() {
  const menu = useMenu()

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-cream">Меню</h2>
        <Button onClick={() => menuActions.addCategory()}>+ Нова категория</Button>
      </div>
      <p className="mb-8 max-w-2xl text-sm text-mute">
        Промените се виждат веднага на страница „Меню“ и на началната. Цената не е задължителна.
      </p>

      <div className="space-y-6">
        {menu.map((cat) => (
          <CategoryEditor key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  )
}

function CategoryEditor({ category }: { category: MenuCategory }) {
  return (
    <div className="rounded-2xl border border-smoke bg-charcoal p-5">
      <div className="mb-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
        <label className="block text-xs text-mute">
          Име на категория
          <input
            className={`${compactInput} mt-1 text-base font-medium`}
            value={category.title}
            onChange={(e) => menuActions.updateCategory(category.id, { title: e.target.value })}
          />
        </label>
        <label className="block text-xs text-mute">
          Снимка на категорията (линк, по желание)
          <input
            type="url"
            placeholder="https://…"
            className={`${compactInput} mt-1`}
            value={category.image ?? ''}
            onChange={(e) => menuActions.updateCategory(category.id, { image: e.target.value })}
          />
        </label>
        <button
          type="button"
          className="rounded-full border border-smoke px-4 py-2 text-sm text-cream/80 transition hover:border-red-400 hover:text-red-400"
          onClick={() => {
            if (window.confirm(`Да изтрия ли категория „${category.title}“ с всички артикули в нея?`))
              menuActions.removeCategory(category.id)
          }}
        >
          Изтрий категорията
        </button>
      </div>

      {category.items.length > 0 && (
        <div className={`${rowGrid} mb-2 hidden px-1 text-xs text-mute sm:grid`} aria-hidden="true">
          <span>Артикул</span>
          <span>Количество / описание</span>
          <span>Цена</span>
          <span className="w-9" />
        </div>
      )}

      <ul className="space-y-3 sm:space-y-2">
        {category.items.map((item) => (
          <li key={item.id} className={`${rowGrid} rounded-xl border border-smoke/60 p-3 sm:border-0 sm:p-0`}>
            <input
              aria-label="Име на артикул"
              placeholder="Име"
              className={compactInput}
              value={item.name}
              onChange={(e) => menuActions.updateItem(category.id, item.id, { name: e.target.value })}
            />
            <input
              aria-label="Количество или описание"
              placeholder="напр. 0.50 л"
              className={compactInput}
              value={item.description ?? ''}
              onChange={(e) => menuActions.updateItem(category.id, item.id, { description: e.target.value })}
            />
            <input
              aria-label="Цена"
              placeholder="3.50 €."
              className={compactInput}
              value={item.price ?? ''}
              onChange={(e) => menuActions.updateItem(category.id, item.id, { price: e.target.value })}
            />
            <button
              type="button"
              aria-label={`Изтрий „${item.name}“`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-smoke text-mute transition hover:border-red-400 hover:text-red-400"
              onClick={() => menuActions.removeItem(category.id, item.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 rounded-full border border-amber-500/60 px-4 py-2 text-sm text-amber-300 transition hover:bg-amber-500/10"
        onClick={() => menuActions.addItem(category.id)}
      >
        + Добави артикул
      </button>
    </div>
  )
}
