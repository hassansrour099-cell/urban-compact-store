import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@modules/common/components/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: string
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="filter-group">
      <Text className="filter-group-title">{title}</Text>
      <RadioGroup data-testid={dataTestId} className="filter-group-list">
        {items?.map((i) => {
          const active = i.value === value
          return (
            <div
              key={i.value}
              className={clx("filter-option", { "is-active": active })}
            >
              <RadioGroup.Item
                checked={active}
                onChange={() => handleChange(i.value)}
                className="hidden peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className="filter-option-label"
                data-testid="radio-label"
                data-active={active}
              >
                <span className="filter-option-dot" aria-hidden>
                  {active ? <EllipseMiniSolid /> : null}
                </span>
                {i.label}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
