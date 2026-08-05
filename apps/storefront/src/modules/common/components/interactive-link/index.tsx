import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  className,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className={`inline-flex gap-x-1 items-center group uc-text-link${className ? ` ${className}` : ""}`}
      href={href}
      onClick={onClick}
      {...props}
    >
      <span className="uc-text-link-label">{children}</span>
      <span
        className="inline-block transition-transform duration-150 group-hover:translate-x-0.5"
        aria-hidden
      >
        →
      </span>
    </LocalizedClientLink>
  )
}

export default InteractiveLink
