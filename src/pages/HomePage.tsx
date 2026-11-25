import Hero from '@/components/sections/Hero'
import AboutTeaser from '@/components/sections/AboutTeaser'
import MenuHighlights from '@/components/sections/MenuHighlights'
import EventsPreview from '@/components/sections/EventsPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventsPreview />
      <MenuHighlights />
      <AboutTeaser />
    </>
  )
}
