import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./env";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio CMS",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
