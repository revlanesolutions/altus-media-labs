"use client";
import Image from "next/image";
import { useState } from "react";
import type { SiteImage } from "@/data/imagery";

const aspectRatios = {
  standard: "aspect-[3/2]",
  landscape: "aspect-[4/3]",
  wide: "aspect-video",
  portrait: "aspect-[4/5]",
};

export function Media({
  image,
  priority = false,
  aspectRatio = "standard",
  radiusClassName = "rounded-[24px]",
  className = "",
  sizes = "(max-width: 767px) 100vw, 50vw",
}: {
  image?: SiteImage;
  priority?: boolean;
  aspectRatio?: keyof typeof aspectRatios;
  radiusClassName?: string;
  className?: string;
  sizes?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string>();
  if (!image || failedSrc === image.src) return null;
  return (
    <div
      className={`relative min-w-0 overflow-hidden bg-muted ${aspectRatios[aspectRatio]} ${radiusClassName} ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={image.fit === "contain" ? "object-contain" : "object-cover"}
        style={{ objectPosition: image.focalPoint || "50% 50%" }}
        onError={() => setFailedSrc(image.src)}
      />
    </div>
  );
}
