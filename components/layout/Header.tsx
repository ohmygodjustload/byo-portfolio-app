import Link from "next/link";
import type { NavItem, SanityImage } from "@/lib/types";
import { Navigation } from "./Navigation";

interface HeaderProps {
  siteTitle: string;
  logo?: SanityImage;
  navigation?: NavItem[];
}

export function Header({ siteTitle, navigation }: HeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-heading text-xl tracking-wide text-foreground"
        >
          {siteTitle}
        </Link>
        {navigation && navigation.length > 0 && (
          <Navigation items={navigation} />
        )}
      </div>
    </header>
  );
}
