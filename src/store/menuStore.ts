import { useSyncExternalStore } from 'react'
import { menu as defaultMenu } from '@/data/menu'
import { uid } from '@/lib/id'
import type { MenuCategory, MenuItem } from '@/types'
import { createStore } from './createStore'

/** Bump the version in the key when the shape of MenuCategory changes. */
export const menuStore = createStore<MenuCategory[]>('groove-cafe.menu.v1', defaultMenu)

export function useMenu(): MenuCategory[] {
  return useSyncExternalStore(menuStore.subscribe, menuStore.get)
}

type CategoryPatch = Partial<Omit<MenuCategory, 'id' | 'items'>>
type ItemPatch = Partial<Omit<MenuItem, 'id'>>

export const menuActions = {
  addCategory() {
    menuStore.set((prev) => [...prev, { id: uid('cat'), title: 'Нова категория', items: [] }])
  },
  updateCategory(categoryId: string, patch: CategoryPatch) {
    menuStore.set((prev) => prev.map((c) => (c.id === categoryId ? { ...c, ...patch } : c)))
  },
  removeCategory(categoryId: string) {
    menuStore.set((prev) => prev.filter((c) => c.id !== categoryId))
  },
  addItem(categoryId: string) {
    menuStore.set((prev) =>
      prev.map((c) =>
        c.id === categoryId ? { ...c, items: [...c.items, { id: uid('item'), name: 'Нов артикул' }] } : c,
      ),
    )
  },
  updateItem(categoryId: string, itemId: string, patch: ItemPatch) {
    menuStore.set((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) }
          : c,
      ),
    )
  },
  removeItem(categoryId: string, itemId: string) {
    menuStore.set((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c)),
    )
  },
  reset() {
    menuStore.reset()
  },
}
