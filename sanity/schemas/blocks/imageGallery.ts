import { defineArrayMember, defineField, defineType } from "sanity";

export const imageGallery = defineType({
  name: "imageGallery",
  title: "Image Gallery",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Gallery Title",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      initialValue: 3,
      options: {
        list: [
          { title: "2 Columns", value: 2 },
          { title: "3 Columns", value: 3 },
          { title: "4 Columns", value: 4 },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
    },
    prepare({ title, media }) {
      return {
        title: title || "Image Gallery",
        media,
      };
    },
  },
});
