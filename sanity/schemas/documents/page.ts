import { defineArrayMember, defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isHomepage",
      title: "Is Homepage?",
      type: "boolean",
      initialValue: false,
      description: "Mark one page as the homepage",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Shown in search engine results",
    }),
    defineField({
      name: "blocks",
      title: "Content Blocks",
      type: "array",
      of: [
        defineArrayMember({ type: "hero" }),
        defineArrayMember({ type: "imageGallery" }),
        defineArrayMember({ type: "videoEmbed" }),
        defineArrayMember({ type: "richText" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      isHomepage: "isHomepage",
    },
    prepare({ title, isHomepage }) {
      return {
        title: title,
        subtitle: isHomepage ? "Homepage" : undefined,
      };
    },
  },
});
