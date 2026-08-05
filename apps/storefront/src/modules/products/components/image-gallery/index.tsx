"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, clx } from "@modules/common/components/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  tone?: "urban" | "street"
}

const ImageGallery = ({ images, tone = "urban" }: ImageGalleryProps) => {
  const [active, setActive] = useState(0)
  const list = images?.length ? images : []

  if (!list.length) {
    return (
      <div
        className={clx(
          "relative aspect-[4/5] w-full",
          tone === "urban" ? "bg-[#e8eeea]" : "bg-[#1a201c]"
        )}
      />
    )
  }

  return (
    <div className={clx("product-gallery", `tone-${tone}`)}>
      <Container className="product-gallery-main relative aspect-[4/5] w-full overflow-hidden !p-0 !rounded-none !shadow-none">
        {list.map((image, index) => (
          <div
            key={image.id}
            className={clx(
              "absolute inset-0 transition-opacity duration-500",
              index === active ? "opacity-100" : "opacity-0"
            )}
          >
            {!!image.url && (
              <Image
                src={image.url}
                priority={index === 0}
                className="object-cover"
                alt={`Product image ${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 800px"
              />
            )}
          </div>
        ))}
        {list.length > 1 && (
          <>
            <button
              type="button"
              className="product-gallery-nav prev"
              aria-label="Previous image"
              onClick={() =>
                setActive((i) => (i - 1 + list.length) % list.length)
              }
            >
              ←
            </button>
            <button
              type="button"
              className="product-gallery-nav next"
              aria-label="Next image"
              onClick={() => setActive((i) => (i + 1) % list.length)}
            >
              →
            </button>
          </>
        )}
      </Container>

      {list.length > 1 && (
        <div className="product-gallery-thumbs">
          {list.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={clx(
                "product-gallery-thumb",
                index === active && "is-active"
              )}
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
