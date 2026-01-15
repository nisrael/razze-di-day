import { defineConfig } from "tinacms";
import { LOCALES } from "../src/consts";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images", // Check where images are stored. existing heroImage is "../../../assets/soup.jpg" which is relative.
      // If images are in src/assets, Tina might need configuration.
      // But standard public folder is "public".
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages/de",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",
            options: [...LOCALES],
            name: "lang",
            label: "Language",
            required: true,
            ui: {
              defaultValue: "de",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "recipes",
        label: "Recipes",
        path: "src/content/recipes/de",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publication Date",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            options: [...LOCALES],
            name: "lang",
            label: "Language",
            required: true,
            ui: {
              defaultValue: "de",
            },
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "partners",
        label: "Partners",
        path: "src/data",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "partners",
        },
        fields: [
          {
            type: "object",
            name: "partners",
            label: "Partners",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name };
              },
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Partner Name",
                required: true,
              },
              {
                type: "image",
                name: "logo",
                label: "Logo Path",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
