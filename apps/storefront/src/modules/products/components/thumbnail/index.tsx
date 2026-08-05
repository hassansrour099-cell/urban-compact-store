import { Container, clx } from "@modules/common/components/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: { url?: string }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

function resolveImageUrl(
  thumbnail?: string | null,
  images?: { url?: string }[] | null
) {
  if (thumbnail && thumbnail.trim()) {
    return thumbnail
  }
  const first = images?.find((img) => !!img?.url)?.url
  return first || null
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = resolveImageUrl(thumbnail, images)

  return (
    <Container
      className={clx(
        "uc-thumb relative w-full overflow-hidden product-thumb",
        className,
        {
          "aspect-[4/5]": size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string | null }) => {
  if (!image) {
    return (
      <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-black/5">
        <PlaceholderImage size={size === "small" ? 16 : 24} />
      </div>
    )
  }

  return (
    <Image
      src={image}
      alt="Product"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      quality={75}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
      unoptimized
    />
  )
}

export default Thumbnail
