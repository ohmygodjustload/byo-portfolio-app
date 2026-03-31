import { defineField, defineType } from "sanity";

export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video Embed",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Video URL",
      description: "Paste a YouTube or Vimeo URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
    },
    prepare({ title, url }) {
      return {
        title: title || "Video",
        subtitle: url,
      };
    },
  },
});
