import type { ContentBlock } from "@/lib/types";
import { HeroBlock } from "./HeroBlock";
import { ImageGalleryBlock } from "./ImageGalleryBlock";
import { VideoEmbedBlock } from "./VideoEmbedBlock";
import { RichTextBlock } from "./RichTextBlock";

interface BlockRendererProps {
  block: ContentBlock;
}

const blockComponents: Record<
  ContentBlock["_type"],
  React.ComponentType<{ block: never }>
> = {
  hero: HeroBlock as React.ComponentType<{ block: never }>,
  imageGallery: ImageGalleryBlock as React.ComponentType<{ block: never }>,
  videoEmbed: VideoEmbedBlock as React.ComponentType<{ block: never }>,
  richText: RichTextBlock as React.ComponentType<{ block: never }>,
};

export function BlockRenderer({ block }: BlockRendererProps) {
  const Component = blockComponents[block._type];

  if (!Component) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="border-2 border-dashed border-red-300 bg-red-50 p-6 text-center text-sm text-red-600">
          Unknown block type: <code>{block._type}</code>
        </div>
      );
    }
    return null;
  }

  return (
    <section>
      <Component block={block as never} />
    </section>
  );
}
