import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navigation",
      title: "Navigation Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          title: "Navigation Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "reference",
              to: [{ type: "page" }],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
        defineField({ name: "vimeo", title: "Vimeo URL", type: "url" }),
        defineField({ name: "imdb", title: "IMDb URL", type: "url" }),
        defineField({ name: "email", title: "Email Address", type: "string" }),
      ],
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      fields: [
        defineField({
          name: "primaryColor",
          title: "Primary Color",
          type: "string",
          initialValue: "#1a1a1a",
          description: "Hex color code (e.g., #1a1a1a)",
        }),
        defineField({
          name: "accentColor",
          title: "Accent Color",
          type: "string",
          initialValue: "#c9a87c",
          description: "Hex color code for accents and links",
        }),
        defineField({
          name: "fontFamily",
          title: "Font Family",
          type: "string",
          initialValue: "inter",
          options: {
            list: [
              { title: "Inter (Modern Sans)", value: "inter" },
              { title: "Playfair Display (Elegant Serif)", value: "playfair" },
              { title: "DM Sans (Clean Sans)", value: "dm-sans" },
              { title: "Cormorant Garamond (Classic Serif)", value: "cormorant" },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
