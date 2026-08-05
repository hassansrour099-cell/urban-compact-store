"use client"

import { useEffect, useMemo, useState } from "react"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import clsx from "clsx"

type OptionsPickerProps = {
  selectedValueIds: string[]
  setOptionValueIds: (valueIds: string[]) => void
}

const APPAREL_SIZE =
  /^(xxs|xs|s|m|l|xl|xxl|2xl|3xl|small|medium|large)$/i
const APPAREL_COLOR =
  /^(black|white|blue|red|green|navy|grey|gray|beige|pink|yellow|orange|purple|brown)$/i

function isApparelNoiseOption(option: HttpTypes.StoreProductOption) {
  const title = (option.title || "").toLowerCase().trim()
  const values = option.values?.map((v) => (v.value || "").trim()) || []

  if (title === "size" || title.includes("size")) {
    const apparelish =
      values.length > 0 &&
      values.every((v) => APPAREL_SIZE.test(v) || /^\d{1,2}$/.test(v))
    return apparelish || title === "size"
  }

  // Starter apparel Color (Black/White) — not furniture finishes
  if (title === "color" || title === "colour") {
    return (
      values.length > 0 &&
      values.every((v) => APPAREL_COLOR.test(v)) &&
      !values.some((v) => /oak|walnut|linen|steel|ash|oak/i.test(v))
    )
  }

  return false
}

const OptionsPicker = ({
  selectedValueIds,
  setOptionValueIds,
}: OptionsPickerProps) => {
  const [options, setOptions] = useState<HttpTypes.StoreProductOption[]>([])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await sdk.client.fetch<{
          product_options?: HttpTypes.StoreProductOption[]
        }>("/store/product-options", {
          method: "GET",
          query: {
            is_exclusive: false,
            fields: "*values",
          },
        })

        if (response?.product_options) {
          setOptions(response.product_options)
        }
      } catch (error) {
        console.error("Failed to fetch product options", error)
      }
    }

    fetchOptions()
  }, [])

  const furnitureOptions = useMemo(
    () => options.filter((option) => !isApparelNoiseOption(option)),
    [options]
  )

  if (!furnitureOptions.length) {
    return null
  }

  return (
    <div className="filter-options uc-text-options">
      {furnitureOptions.map((option) => {
        const values =
          option.values
            ?.map((value) => ({
              id: value.id,
              label: value.value,
            }))
            .filter(
              (value): value is { id: string; label: string } =>
                !!value.id && !!value.label
            ) || []

        if (!values.length) {
          return null
        }

        const toggleValue = (valueId: string) => {
          const isSelected = selectedValueIds.includes(valueId)
          const nextSelections = isSelected
            ? selectedValueIds.filter((id) => id !== valueId)
            : [...selectedValueIds, valueId]

          setOptionValueIds(Array.from(new Set(nextSelections)))
        }

        return (
          <div key={option.id} className="uc-text-option-group">
            <span className="filter-group-title">
              {option.title || "Finish"}
            </span>
            <div className="uc-text-option-list" role="list">
              {values.map((value) => {
                const isSelected = selectedValueIds.includes(value.id)

                return (
                  <button
                    key={value.id}
                    type="button"
                    role="listitem"
                    onClick={() => toggleValue(value.id)}
                    className={clsx("uc-text-option", {
                      "is-active": isSelected,
                    })}
                    aria-pressed={isSelected}
                  >
                    {value.label}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OptionsPicker
