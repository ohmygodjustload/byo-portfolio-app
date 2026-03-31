import type { SchemaTypeDefinition } from "sanity";
import { hero } from "./blocks/hero";
import { imageGallery } from "./blocks/imageGallery";
import { richText } from "./blocks/richText";
import { videoEmbed } from "./blocks/videoEmbed";
import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  page,
  siteSettings,
  // Blocks (object types used inside page.blocks array)
  hero,
  imageGallery,
  videoEmbed,
  richText,
];
