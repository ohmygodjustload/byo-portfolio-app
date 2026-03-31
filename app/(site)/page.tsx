import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { homepageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { Page, SiteSettings } from "@/lib/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings]: [Page | null, SiteSettings | null] =
    await Promise.all([
      client.fetch(homepageQuery),
      client.fetch(siteSettingsQuery),
    ]);

  return {
    title: settings?.siteTitle ?? "Miranda Peirce",
    description:
      page?.seoDescription ??
      settings?.siteDescription ??
      "Actor, Costume Designer, Dancer",
  };
}

export default async function HomePage() {
  const page: Page | null = await client.fetch(homepageQuery);

  if (!page) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-4xl tracking-tight">
          Welcome
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          Head to{" "}
          <Link href="/studio" className="text-accent underline">
            /studio
          </Link>{" "}
          to create your first page and mark it as the homepage.
        </p>
      </div>
    );
  }

  return (
    <div>
      {page.blocks?.map((block) => (
        <BlockRenderer key={block._key} block={block} />
      ))}
    </div>
  );
}
