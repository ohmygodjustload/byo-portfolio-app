import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "image",
      title: "Headshot / Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ctaText",
      title: "Call-to-Action Text",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "Call-to-Action Link",
      type: "url",
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto"],
        }),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
  },
});
