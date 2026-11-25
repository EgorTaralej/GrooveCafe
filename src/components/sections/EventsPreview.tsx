import EventList from '@/components/events/EventList'
import { ButtonLink } from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'

export default function EventsPreview() {
  return (
    <section className="section border-t border-smoke bg-charcoal">
      <div className="container-page">
        <SectionHeading
          eyebrow="На живо"
          title="Предстоящи събития"
          subtitle="Музика на живо, винил вечери и празници. Запази си място."
        />
        <EventList limit={2} />
        <div className="mt-10">
          <ButtonLink to="/events" variant="ghost">
            Всички събития
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
