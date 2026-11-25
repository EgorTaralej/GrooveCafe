import { ButtonLink } from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import { useMenu } from '@/store/menuStore'
import MenuCategoryTiles from './MenuCategoryTiles'

export default function MenuHighlights() {
  const menu = useMenu()

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading eyebrow="Менюто" title="Разгледай цялото меню" subtitle="Избери категория и виж какво предлагаме." />
        <MenuCategoryTiles categories={menu} />
        <div className="mt-10">
          <ButtonLink to="/menu" variant="ghost">
            Към менюто
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
