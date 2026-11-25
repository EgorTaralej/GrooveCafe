import { ButtonLink } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="section pt-40 text-center">
      <div className="container-page">
        <p className="font-display text-6xl text-amber-400">404</p>
        <p className="mt-4 text-mute">Тази страница не съществува.</p>
        <ButtonLink to="/" className="mt-8">
          Към началото
        </ButtonLink>
      </div>
    </section>
  )
}
