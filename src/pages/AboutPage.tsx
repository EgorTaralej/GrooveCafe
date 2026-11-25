import AboutStory from '@/components/sections/AboutStory'
import SectionHeading from '@/components/ui/SectionHeading'
import { aboutTeaser } from '@/data/about'

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40">
        <div className="container-page">
          <SectionHeading eyebrow="За нас" title="Кафе, плочи и добра компания" subtitle={aboutTeaser} />
        </div>
      </section>
      <AboutStory />
    </>
  )
}
