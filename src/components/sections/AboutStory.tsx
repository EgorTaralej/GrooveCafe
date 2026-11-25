import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder'
import { aboutStory, aboutValues } from '@/data/about'

export default function AboutStory() {
  return (
    <>
      <section className="section">
        <div className="container-page space-y-20">
          {aboutStory.map((block, i) => (
            <div
              key={block.id}
              className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <div>
                <h2 className="text-3xl font-semibold text-cream sm:text-4xl">{block.title}</h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">{block.text}</p>
              </div>
              {/* Снимките се сменят в src/data/about.ts (aboutStory[].image) */}
              {block.image.src ? (
                <img
                  src={block.image.src}
                  alt={block.image.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-3xl border border-smoke object-cover"
                />
              ) : (
                <PhotoPlaceholder label={block.image.alt} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-smoke bg-charcoal">
        <div className="container-page grid gap-10 sm:grid-cols-3">
          {aboutValues.map((v) => (
            <div key={v.id}>
              <h3 className="text-xl font-semibold text-amber-400">{v.title}</h3>
              <p className="mt-3 text-mute">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
