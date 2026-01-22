import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const recipes = defineCollection({
  loader: glob({ base: "./src/content/recipes", pattern: "*.yaml" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    recipes: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),

        category: z.string(),
        heroImage: z.string(),
        time: z.string().optional(),
        difficulty: z.string().optional(),
        ingredients: z.array(z.object({ content: z.string() })).optional(),
        instructions: z.array(z.object({ content: z.string() })),
        dessert: z.string(),
        conclusion: z.string(),
        topping: z.string().optional(),
      }),
    ),
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
  loader: glob({ base: "./src/content/snacks", pattern: "*.yaml" }),
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

const faqs = defineCollection({
  loader: glob({ base: "./src/content/faqs", pattern: "*.yaml" }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    moreQuestions: z.string(),
  }),
});

export const collections = { recipes, pages, snacks, faqs };
