import type { PortableTextBlock } from "@portabletext/types";

// ─── Sanity Image ────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
}

// ─── Block Types ─────────────────────────────────────────────────────────────

export interface HeroBlock {
  _type: "hero";
  _key: string;
  heading: string;
  tagline?: string;
  image?: SanityImage;
  ctaText?: string;
  ctaLink?: string;
}

export interface GalleryImage extends SanityImage {
  _key?: string;
  alt: string;
  caption?: string;
}

export interface ImageGalleryBlock {
  _type: "imageGallery";
  _key: string;
  title?: string;
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export interface VideoEmbedBlock {
  _type: "videoEmbed";
  _key: string;
  title?: string;
  url: string;
  caption?: string;
}

export interface RichTextBlock {
  _type: "richText";
  _key: string;
  content: PortableTextBlock[];
}

export type ContentBlock =
  | HeroBlock
  | ImageGalleryBlock
  | VideoEmbedBlock
  | RichTextBlock;

// ─── Documents ───────────────────────────────────────────────────────────────

export interface NavItem {
  _key: string;
  label: string;
  link: {
    _type: "reference";
    slug: { current: string };
    title: string;
  };
}

export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  vimeo?: string;
  imdb?: string;
  email?: string;
}

export interface ThemeSettings {
  primaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  siteTitle: string;
  siteDescription?: string;
  logo?: SanityImage;
  navigation?: NavItem[];
  socialLinks?: SocialLinks;
  theme?: ThemeSettings;
}

export interface Page {
  _id: string;
  _type: "page";
  title: string;
  slug: { current: string };
  isHomepage?: boolean;
  seoDescription?: string;
  blocks?: ContentBlock[];
}
