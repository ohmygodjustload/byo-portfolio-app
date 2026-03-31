"use client";

import type { ThemeSettings } from "@/lib/types";

interface ThemeProviderProps {
  theme?: ThemeSettings;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const style = theme
    ? ({
        "--color-primary": theme.primaryColor ?? "#1a1a1a",
        "--color-accent": theme.accentColor ?? "#c9a87c",
      } as React.CSSProperties)
    : undefined;

  return <div style={style}>{children}</div>;
}
