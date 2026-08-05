import HeroCarousel from "@modules/home/components/hero-carousel"

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Furniture for small apartments",
    title: "Urban Compact",
    subtitle:
      "Living, sleep, work, and storage—scaled for studios and tight city rooms.",
    cta: { label: "Shop the collection", href: "/store" },
    secondary: { label: "Explore Living", href: "/categories/living" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Quiet materials",
    title: "Designed to take\nless space",
    subtitle:
      "Oak, walnut, and white finishes chosen to calm small rooms instead of crowding them.",
    cta: { label: "Shop Storage", href: "/categories/storage" },
    secondary: { label: "Shop Work", href: "/categories/work" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Sleep better in less room",
    title: "Bedroom pieces\nthat clear the floor",
    subtitle:
      "Under-bed drawers, modular nightstands, and slim profiles for restful, open rooms.",
    cta: { label: "Shop Sleep", href: "/categories/sleep" },
    secondary: { label: "View all", href: "/store" },
  },
]

export default function Hero() {
  return <HeroCarousel slides={slides} tone="urban" />
}
