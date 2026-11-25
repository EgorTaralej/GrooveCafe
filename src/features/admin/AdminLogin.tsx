import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Field, inputClass } from '@/components/ui/Field'
import Logo from '@/components/ui/Logo'
import { login } from '@/store/authStore'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(login(password) ? '' : 'Грешна парола.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-3xl border border-smoke bg-charcoal p-8">
        <div className="mb-8 flex justify-center">
          <Logo className="h-12" />
        </div>
        <h1 className="mb-6 text-center text-2xl font-semibold text-cream">Админ панел</h1>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <Field label="Парола" htmlFor="admin-password" error={error}>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Button type="submit" className="w-full">
            Вход
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-mute">
          Демо версия. Паролата е във файла <code className="text-amber-300">src/config/admin.ts</code>.
        </p>
        <p className="mt-4 text-center text-sm">
          <Link to="/" className="text-mute hover:text-amber-300">
            ← Към сайта
          </Link>
        </p>
      </div>
    </div>
  )
}
