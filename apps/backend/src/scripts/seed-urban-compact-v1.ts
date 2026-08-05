import { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  deleteProductCategoriesWorkflow,
  deleteProductsWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"
import {
  categories,
  products as catalogProducts,
  SEED_VERSION,
  STORE_NAME,
} from "./seed-data-v1"

/**
 * Seeds Urban Compact catalog (v1).
 * Replaces existing products/categories so re-runs stay clean.
 *
 * Usage (from apps/backend):
 *   npx medusa exec ./src/scripts/seed-urban-compact-v1.ts
 */
export default async function seedUrbanCompactV1({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  logger.info(`Seeding ${STORE_NAME} catalog (${SEED_VERSION})...`)

  const {
    data: [store],
  } = await query.graph({
    entity: "store",
    fields: ["id", "name", "supported_currencies.*", "default_sales_channel_id"],
  })

  if (!store) {
    throw new Error("No store found. Run migrations / initial seed first.")
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: { name: STORE_NAME },
    },
  })
  logger.info(`Store renamed to "${STORE_NAME}".`)

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const defaultSalesChannel =
    salesChannels.find((sc) => sc.id === store.default_sales_channel_id) ??
    salesChannels[0]

  if (!defaultSalesChannel) {
    throw new Error("No sales channel found.")
  }

  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  })
  const stockLocation = stockLocations[0]
  if (!stockLocation) {
    throw new Error("No stock location found. Run initial seed first.")
  }

  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id", "name"],
  })
  const shippingProfile = shippingProfiles[0]
  if (!shippingProfile) {
    throw new Error("No shipping profile found.")
  }

  // --- Clear previous catalog ---
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "title", "handle"],
  })

  if (existingProducts.length) {
    logger.info(`Deleting ${existingProducts.length} existing product(s)...`)
    await deleteProductsWorkflow(container).run({
      input: { ids: existingProducts.map((p) => p.id) },
    })
  }

  const { data: existingCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  })

  if (existingCategories.length) {
    logger.info(
      `Deleting ${existingCategories.length} existing categor(ies)...`
    )
    await deleteProductCategoriesWorkflow(container).run({
      input: existingCategories.map((c) => c.id),
    })
  }

  // --- Categories ---
  logger.info("Creating Urban Compact categories...")
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: categories.map((c) => ({
        name: c.name,
        handle: c.handle,
        description: c.description,
        is_active: true,
      })),
    },
  })

  const categoryByHandle = new Map(
    categoryResult.map((c) => [c.handle as string, c.id])
  )

  // --- Products ---
  logger.info(`Creating ${catalogProducts.length} products...`)

  const { result: createdProducts } = await createProductsWorkflow(
    container
  ).run({
    input: {
      products: catalogProducts.map((product) => ({
        title: product.title,
        handle: product.handle,
        description: product.description,
        status: ProductStatus.PUBLISHED,
        images: product.images.map((url) => ({ url })),
        shipping_profile_id: shippingProfile.id,
        category_ids: product.categoryHandles.map((h) => {
          const id = categoryByHandle.get(h)
          if (!id) {
            throw new Error(`Missing category handle: ${h}`)
          }
          return id
        }),
        options: [
          {
            title: "Finish",
            values: product.finishes,
          },
        ],
        variants: product.variants.map((variant) => ({
          title: variant.title,
          sku: variant.sku,
          options: {
            Finish: variant.finish,
          },
          manage_inventory: true,
          prices: [
            { amount: variant.amount, currency_code: "usd" },
            { amount: variant.amount, currency_code: "eur" },
          ],
        })),
        sales_channels: [{ id: defaultSalesChannel.id }],
      })),
    },
  })

  logger.info(`Created ${createdProducts.length} products.`)

  // --- Inventory by SKU ---
  const qtyBySku = new Map(
    catalogProducts.flatMap((p) =>
      p.variants.map((v) => [v.sku, v.inventory_quantity] as const)
    )
  )

  const { data: variants } = await query.graph({
    entity: "variant",
    fields: ["id", "sku", "inventory_items.inventory_item_id"],
  })

  const inventoryLevels: {
    location_id: string
    inventory_item_id: string
    stocked_quantity: number
  }[] = []

  for (const variant of variants) {
    const sku = variant.sku as string | null
    if (!sku || !qtyBySku.has(sku)) {
      continue
    }
    const qty = qtyBySku.get(sku)!
    const items = (variant.inventory_items ?? []) as {
      inventory_item_id: string
    }[]
    for (const item of items) {
      if (item.inventory_item_id) {
        inventoryLevels.push({
          location_id: stockLocation.id,
          inventory_item_id: item.inventory_item_id,
          stocked_quantity: qty,
        })
      }
    }
  }

  if (inventoryLevels.length) {
    logger.info(`Setting inventory for ${inventoryLevels.length} item(s)...`)
    await createInventoryLevelsWorkflow(container).run({
      input: { inventory_levels: inventoryLevels },
    })
  } else {
    logger.warn("No inventory levels created — check variant inventory links.")
  }

  logger.info(
    `${STORE_NAME} ${SEED_VERSION} seed complete: ${categories.length} categories, ${createdProducts.length} products.`
  )
}
