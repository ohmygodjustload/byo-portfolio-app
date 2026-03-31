import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    siteTitle,
    siteDescription,
    logo,
    navigation[] {
      _key,
      label,
      link-> {
        _type,
        title,
        "slug": slug
      }
    },
    socialLinks,
    theme
  }
`;

export const homepageQuery = groq`
  *[_type == "page" && isHomepage == true][0] {
    _id,
    _type,
    title,
    slug,
    isHomepage,
    seoDescription,
    blocks[] {
      _type,
      _key,
      ...
    }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    isHomepage,
    seoDescription,
    blocks[] {
      _type,
      _key,
      ...
    }
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    slug,
    isHomepage
  }
`;
