import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HERO_IMG =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80"

const Hero = () => {
  return (
    <section className="uc-hero relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <div
        className="uc-hero-media absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        aria-hidden
      />
      <div className="uc-hero-veil absolute inset-0" aria-hidden />

      <div className="relative z-10 flex h-full flex-col justify-end content-container pb-16 small:pb-24">
        <p className="uc-reveal uc-reveal-1 uc-eyebrow mb-4">
          Furniture for small apartments
        </p>
        <h1 className="uc-reveal uc-reveal-2 font-display text-5xl leading-[1.05] text-uc-ink small:text-7xl max-w-3xl">
          Urban Compact
        </h1>
        <p className="uc-reveal uc-reveal-3 mt-5 max-w-md text-base leading-relaxed text-uc-ink/80 small:text-lg">
          Living, sleep, work, and storage—scaled for studios and tight city
          rooms.
        </p>
        <div className="uc-reveal uc-reveal-4 mt-8 flex flex-wrap gap-3">
          <LocalizedClientLink href="/store" className="uc-btn-primary">
            Shop the collection
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/categories/living"
            className="uc-btn-ghost"
          >
            Explore Living
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default Hero
