import { useSyncExternalStore } from 'react'
import { ADMIN_PASSWORD } from '@/config/admin'
import { createStore } from './createStore'

/** Admin session lives in sessionStorage: it ends when the tab is closed. DEMO ONLY (see config/admin.ts). */
const authStore = createStore<boolean>('groove-cafe.admin', false, () => sessionStorage)

export function useIsAdmin(): boolean {
  return useSyncExternalStore(authStore.subscribe, authStore.get)
}

/** Returns true when the password is correct. */
export function login(password: string): boolean {
  const ok = password === ADMIN_PASSWORD
  if (ok) authStore.set(true)
  return ok
}

export function logout() {
  authStore.set(false)
}
