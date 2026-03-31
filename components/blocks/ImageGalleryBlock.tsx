"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageGalleryBlock as ImageGalleryBlockType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

interface ImageGalleryBlockProps {
  block: ImageGalleryBlockType;
}

const columnClasses: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function ImageGalleryBlock({ block }: ImageGalleryBlockProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const cols = block.columns ?? 3;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {block.title && (
        <h2 className="mb-10 text-center font-heading text-3xl tracking-tight">
          {block.title}
        </h2>
      )}

      <div className={`grid gap-4 ${columnClasses[cols] ?? columnClasses[3]}`}>
        {block.images?.map((image, index) => (
          <button
            key={image._key ?? index}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/5] overflow-hidden bg-gray-100"
          >
            <Image
              src={urlFor(image).width(800).quality(80).url()}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${Math.round(100 / cols)}vw`}
            />
            {image.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm text-white">{image.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && block.images && (
        <Lightbox
          images={block.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}

interface LightboxProps {
  images: ImageGalleryBlockType["images"];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
        if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
      }}
      role="dialog"
      aria-modal="true"
      tabIndex={0}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-white/70 transition-colors hover:text-white"
        aria-label="Close lightbox"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
          className="absolute left-4 text-white/70 transition-colors hover:text-white"
          aria-label="Previous image"
        >
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      <div
        className="relative max-h-[85vh] max-w-[85vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={urlFor(current).width(1600).quality(90).url()}
          alt={current.alt}
          width={1600}
          height={1200}
          className="max-h-[85vh] w-auto object-contain"
        />
        {current.caption && (
          <p className="mt-3 text-center text-sm text-white/70">{current.caption}</p>
        )}
      </div>

      {hasNext && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
          className="absolute right-4 text-white/70 transition-colors hover:text-white"
          aria-label="Next image"
        >
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  );
}
