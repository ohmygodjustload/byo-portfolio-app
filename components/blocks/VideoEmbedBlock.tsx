import type { VideoEmbedBlock as VideoEmbedBlockType } from "@/lib/types";

interface VideoEmbedBlockProps {
  block: VideoEmbedBlockType;
}

function getEmbedUrl(url: string): string | null {
  // YouTube: various URL formats
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo: various URL formats
  const vimeoMatch = url.match(
    /(?:vimeo\.com\/)(\d+)/,
  );
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

export function VideoEmbedBlock({ block }: VideoEmbedBlockProps) {
  const embedUrl = getEmbedUrl(block.url);

  if (!embedUrl) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="mx-auto max-w-4xl border-2 border-dashed border-amber-300 bg-amber-50 p-6 text-center text-sm text-amber-700">
          Unsupported video URL: <code>{block.url}</code>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {block.title && (
        <h2 className="mb-6 text-center font-heading text-3xl tracking-tight">
          {block.title}
        </h2>
      )}
      <div className="relative aspect-video overflow-hidden bg-black">
        <iframe
          src={embedUrl}
          title={block.title ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {block.caption && (
        <p className="mt-4 text-center text-sm text-muted">{block.caption}</p>
      )}
    </div>
  );
}
