type Updater<T> = T | ((prev: T) => T)

export interface Store<T> {
  get: () => T
  set: (next: Updater<T>) => void
  /** Drop saved changes and go back to the initial (mock) data. */
  reset: () => void
  subscribe: (listener: () => void) => () => void
}

/**
 * Tiny external store persisted in web storage.
 * It is read with `useSyncExternalStore` (see the *Store.ts files), so no
 * `useEffect` is needed.
 *
 * DEMO ONLY: data lives in the visitor's own browser. When a backend exists,
 * replace `get`/`set` with API calls and keep the same hooks.
 */
export function createStore<T>(
  key: string,
  initial: T,
  getStorage: () => Storage = () => localStorage,
): Store<T> {
  const listeners = new Set<() => void>()

  function read(): T {
    try {
      const raw = getStorage().getItem(key)
      return raw === null ? initial : (JSON.parse(raw) as T)
    } catch {
      return initial
    }
  }

  let state = read()

  function emit() {
    listeners.forEach((listener) => listener())
  }

  // Keep several open tabs in sync (admin edits in one tab show up in another).
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === key) {
        state = read()
        emit()
      }
    })
  }

  return {
    get: () => state,
    set(next) {
      state = typeof next === 'function' ? (next as (prev: T) => T)(state) : next
      try {
        getStorage().setItem(key, JSON.stringify(state))
      } catch {
        /* storage full or blocked: keep working in memory */
      }
      emit()
    },
    reset() {
      try {
        getStorage().removeItem(key)
      } catch {
      }
      state = initial
      emit()
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}
