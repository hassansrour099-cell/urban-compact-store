import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

function swatchFor(value: string) {
  const v = value.toLowerCase()
  if (v.includes("oak") && !v.includes("walnut")) {
    return "linear-gradient(145deg, #c4a07a 0%, #8b6348 42%, #5c4033 78%, #3f2b22 100%)"
  }
  if (v.includes("walnut")) {
    return "linear-gradient(145deg, #8a623f 0%, #5c4033 48%, #3a2418 100%)"
  }
  if (v.includes("linen") || v.includes("beige") || v.includes("natural")) {
    return "linear-gradient(145deg, #efe8dc 0%, #d4cdc2 50%, #b8aea0 100%)"
  }
  if (v.includes("steel") || v.includes("grey") || v.includes("gray") || v.includes("metal")) {
    return "linear-gradient(145deg, #d0d2ce 0%, #8e908c 48%, #5f6160 100%)"
  }
  if (v.includes("white") || v.includes("chalk")) {
    return "linear-gradient(145deg, #ffffff 0%, #f7f6f4 55%, #e4e1db 100%)"
  }
  if (v.includes("black") || v.includes("ink")) {
    return "linear-gradient(145deg, #3a342f 0%, #1c1917 100%)"
  }
  if (v.includes("green") || v.includes("sage")) {
    return "linear-gradient(145deg, #9aa894 0%, #5c6658 100%)"
  }
  let h = 0
  for (let i = 0; i < v.length; i++) h = (h + v.charCodeAt(i) * 17) % 360
  return `hsl(${h} 18% 55%)`
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  const isFinish =
    /color|colour|finish|material|fabric|wood/i.test(title) ||
    filteredOptions.some((v) =>
      /oak|walnut|linen|steel|white|black|beige|wood/i.test(v)
    )

  return (
    <div className="flex flex-col gap-y-3">
      <span className="uc-meta">{title}</span>
      <div
        className={clx(isFinish ? "uc-finish-options" : "flex flex-wrap gap-2")}
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const active = v === current
          if (isFinish) {
            return (
              <button
                type="button"
                onClick={() => updateOption(option.id, v)}
                key={v}
                className={clx("uc-finish-option", { "is-active": active })}
                disabled={disabled}
                data-testid="option-button"
                aria-pressed={active}
              >
                <span
                  className="uc-finish-option-swatch"
                  style={{ background: swatchFor(v) }}
                  aria-hidden
                />
                {v}
              </button>
            )
          }
          return (
            <button
              type="button"
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "border px-3 py-2 text-sm min-w-[3rem]",
                active
                  ? "border-[var(--uc-ink)] bg-[var(--uc-ink)] text-[var(--uc-plaster)]"
                  : "border-[var(--uc-line)] bg-transparent text-[var(--uc-ink)]"
              )}
              disabled={disabled}
              data-testid="option-button"
              aria-pressed={active}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
