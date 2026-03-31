"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/lib/types";

interface NavigationProps {
  items: NavItem[];
}

export function Navigation({ items }: NavigationProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav>
      {/* Mobile toggle */}
      <button
        type="button"
        className="text-foreground md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          {mobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>

      {/* Desktop nav */}
      <ul className="hidden gap-8 md:flex">
        {items.map((item) => {
          const href =
            item.link?.slug?.current === "/"
              ? "/"
              : `/${item.link?.slug?.current ?? ""}`;
          const isActive = pathname === href;
          return (
            <li key={item._key}>
              <Link
                href={href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile nav */}
      {mobileOpen && (
        <ul className="absolute left-0 top-full z-50 w-full border-b border-border bg-background px-6 py-4 md:hidden">
          {items.map((item) => {
            const href =
              item.link?.slug?.current === "/"
                ? "/"
                : `/${item.link?.slug?.current ?? ""}`;
            const isActive = pathname === href;
            return (
              <li key={item._key} className="py-2">
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-wide ${
                    isActive
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
