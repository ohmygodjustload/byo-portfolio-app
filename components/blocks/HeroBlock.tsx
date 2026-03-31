import Image from "next/image";
import type { HeroBlock as HeroBlockType } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

interface HeroBlockProps {
  block: HeroBlockType;
}

export function HeroBlock({ block }: HeroBlockProps) {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-primary text-white">
      {block.image && (
        <Image
          src={urlFor(block.image).width(1920).quality(85).url()}
          alt={block.heading}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
      )}
      <div className="relative z-10 px-6 py-20 text-center">
        <h1 className="font-heading text-5xl tracking-tight sm:text-6xl lg:text-7xl">
          {block.heading}
        </h1>
        {block.tagline && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
            {block.tagline}
          </p>
        )}
        {block.ctaText && block.ctaLink && (
          <a
            href={block.ctaLink}
            className="mt-8 inline-block border border-white/40 px-8 py-3 text-sm tracking-widest uppercase transition-colors hover:bg-white hover:text-primary"
          >
            {block.ctaText}
          </a>
        )}
      </div>
    </div>
  );
}
