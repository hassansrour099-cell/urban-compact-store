import { Metadata } from "next"

import HomeCatalog from "@modules/home/components/home-catalog"
import Hero from "@modules/home/components/hero"
import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Urban Compact",
  description: "Furniture sized for small apartments — living, sleep, work, and storage.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const [{ response }, categories] = await Promise.all([
    listProducts({
      countryCode,
      queryParams: { limit: 8 },
    }),
    listCategories(),
  ])

  return (
    <>
      <Hero />
      <HomeCatalog
        products={response.products}
        categories={categories || []}
        region={region}
      />
    </>
  )
}
