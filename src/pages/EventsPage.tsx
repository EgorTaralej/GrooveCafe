import EventList from '@/components/events/EventList'
import SectionHeading from '@/components/ui/SectionHeading'
import { site } from '@/data/site'

export default function EventsPage() {
  return (
    <section className="section pt-32 sm:pt-40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Събития"
          title={`Музика на живо в ${site.name}`}
          subtitle="Избери вечер и запази място. Местата са ограничени."
        />
        <EventList />
      </div>
    </section>
  )
}
