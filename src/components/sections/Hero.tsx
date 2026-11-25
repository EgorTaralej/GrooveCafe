import { Button, ButtonLink } from '@/components/ui/Button'
import VinylRecord from '@/components/ui/VinylRecord'
import { useReservation } from '@/features/reservation/ReservationContext'
import { site } from '@/data/site'

export default function Hero() {
  const { openReservation } = useReservation()

  return (
    <section className="grooves relative overflow-hidden pt-28 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-amber-500/15 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-12 pb-20 sm:pb-28 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-amber-400">
            Кафе · Винил · Live
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            Бавно кафе
            <br />
            и <span className="text-amber-400">въртящи се плочи.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">
            {site.name} е мястото, където кафето се пие бавно, плочите се въртят на живо, а вечерите
            свършват с музика.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button onClick={() => openReservation()}>Резервирай маса</Button>
            <ButtonLink to="/events" variant="ghost">
              Виж събитията
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
          <VinylRecord className="mx-auto w-full max-w-md drop-shadow-[0_20px_60px_rgba(217,154,43,0.25)]" />
        </div>
      </div>
    </section>
  )
}
