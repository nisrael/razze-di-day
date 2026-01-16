import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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
    }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const snacks = defineCollection({
  loader: glob({ base: "./src/content/snacks", pattern: "*.json" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    groups: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        items: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            content: z.string(),
            link: z
              .object({
                text: z.string(),
                url: z.string(),
              })
              .nullable(),
          }),
        ),
      }),
    ),
  }),
});

export const collections = { recipes, pages, snacks };
