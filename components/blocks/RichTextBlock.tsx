import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import type { RichTextBlock as RichTextBlockType, SanityImage } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

interface RichTextBlockProps {
  block: RichTextBlockType;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-heading text-3xl tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-heading text-2xl tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 font-heading text-xl tracking-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-accent pl-6 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => {
      const target = value?.openInNewTab ? "_blank" : undefined;
      const rel = value?.openInNewTab ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-accent underline transition-colors hover:text-foreground"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(1200).quality(85).url()}
          alt={value.alt ?? ""}
          width={1200}
          height={800}
          className="w-full"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </figure>
    ),
  },
};

export function RichTextBlock({ block }: RichTextBlockProps) {
  if (!block.content) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PortableText value={block.content} components={portableTextComponents} />
    </div>
  );
}
