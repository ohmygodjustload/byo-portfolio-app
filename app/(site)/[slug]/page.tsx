import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { allPagesQuery, pageBySlugQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { Page, SiteSettings } from "@/lib/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [page, settings]: [Page | null, SiteSettings | null] =
    await Promise.all([
      client.fetch(pageBySlugQuery, { slug }),
      client.fetch(siteSettingsQuery),
    ]);

  const siteTitle = settings?.siteTitle ?? "Miranda Peirce";

  return {
    title: page ? `${page.title} | ${siteTitle}` : siteTitle,
    description: page?.seoDescription ?? settings?.siteDescription,
  };
}

export async function generateStaticParams() {
  const pages: Pick<Page, "slug">[] = await client.fetch(allPagesQuery);
  return pages
    .filter((p) => p.slug?.current)
    .map((p) => ({ slug: p.slug.current }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page: Page | null = await client.fetch(pageBySlugQuery, { slug });

  if (!page) {
    notFound();
  }

  return (
    <div>
      {page.blocks?.map((block) => (
        <BlockRenderer key={block._key} block={block} />
      ))}
    </div>
  );
}
