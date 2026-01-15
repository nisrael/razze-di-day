import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { LOCALES } from "./consts";

const recipes = defineCollection({
  loader: glob({ base: "./src/content/recipes", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      category: z.string(),
      lang: z.enum(LOCALES).default("de"),
    }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(LOCALES).default("de"),
  }),
});

export const collections = { recipes, pages };
