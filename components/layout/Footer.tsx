import type { SocialLinks } from "@/lib/types";

interface FooterProps {
  siteTitle: string;
  socialLinks?: SocialLinks;
}

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  vimeo: "Vimeo",
  imdb: "IMDb",
};

export function Footer({ siteTitle, socialLinks }: FooterProps) {
  const socialEntries = socialLinks
    ? Object.entries(socialLinks).filter(
        ([key, value]) => value && key !== "email",
      )
    : [];

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {siteTitle}
        </p>

        {socialEntries.length > 0 && (
          <div className="flex gap-6">
            {socialEntries.map(([key, value]) => (
              <a
                key={key}
                href={value as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {socialLabels[key] ?? key}
              </a>
            ))}
            {socialLinks?.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                Email
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
