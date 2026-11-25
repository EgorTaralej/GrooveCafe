import { ButtonLink } from '@/components/ui/Button'
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder'
import SectionHeading from '@/components/ui/SectionHeading'
import { aboutTeaser, aboutTeaserImage } from '@/data/about'

export default function AboutTeaser() {
  return (
    <section className="section border-t border-smoke bg-charcoal">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        {/* Снимката се сменя в src/data/about.ts (aboutTeaserImage) */}
        {aboutTeaserImage.src ? (
          <img
            src={aboutTeaserImage.src}
            alt={aboutTeaserImage.alt}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl border border-smoke object-cover"
          />
        ) : (
          <PhotoPlaceholder label={aboutTeaserImage.alt} />
        )}
        <div>
          <SectionHeading eyebrow="За нас" title="Място за музика, кафе и разговор" subtitle={aboutTeaser} />
          <ButtonLink to="/about" variant="ghost">
            Научи повече
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
