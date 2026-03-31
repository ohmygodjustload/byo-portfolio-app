import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings: SiteSettings | null = await client.fetch(siteSettingsQuery);

  const siteTitle = settings?.siteTitle ?? "Miranda Peirce";

  return (
    <ThemeProvider theme={settings?.theme}>
      <Header
        siteTitle={siteTitle}
        logo={settings?.logo}
        navigation={settings?.navigation}
      />
      <main className="flex-1">{children}</main>
      <Footer siteTitle={siteTitle} socialLinks={settings?.socialLinks} />
    </ThemeProvider>
  );
}
