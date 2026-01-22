import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
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
    host: "0.0.0.0",
  },
  media: {
    tina: {
      mediaRoot: "images",
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
        path: "src/content/recipes",
        format: "yaml",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "de",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            isBody: false,
            required: true,
          },
          {
            type: "object",
            name: "recipes",
            label: "Recipes",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title };
              },
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                isTitle: true,
                required: true,
              },
              {
                type: "rich-text",
                name: "description",
                label: "Description",
                isBody: false,
                required: true,
              },

              {
                type: "string",
                name: "category",
                label: "Category",
                required: true,
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hero Image",
                required: true,
              },
              {
                type: "string",
                name: "time",
                label: "Preparation Time",
                required: false,
              },
              {
                type: "string",
                name: "difficulty",
                label: "Difficulty",
                required: false,
              },
              {
                type: "object",
                name: "ingredients",
                label: "Ingredients",
                list: true,
                fields: [
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Content",
                  },
                ],
              },
              {
                type: "object",
                name: "instructions",
                label: "Instructions",
                list: true,
                fields: [
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Content",
                  },
                ],
              },
              {
                type: "rich-text",
                name: "dessert",
                label: "Dessert",
                isBody: false,
                required: true,
              },
              {
                type: "rich-text",
                name: "conclusion",
                label: "Conclusion",
                isBody: false,
                required: true,
              },
              {
                type: "rich-text",
                name: "topping",
                label: "Topping",
                isBody: false,
                required: false,
              },
            ],
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
      {
        name: "faqs",
        label: "FAQs",
        path: "src/content/faqs",
        format: "yaml",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "de",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "FAQ Title",
            required: true,
          },
          {
            type: "rich-text",
            name: "desc",
            label: "FAQ Description",
            required: true,
          },
          {
            type: "object",
            name: "items",
            label: "FAQ Items",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.question };
              },
            },
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                required: true,
              },
              {
                type: "rich-text",
                name: "answer",
                label: "Answer",
                required: true,
              },
            ],
          },
          {
            type: "rich-text",
            name: "moreQuestions",
            label: "More Questions CTA",
            required: true,
          },
        ],
      },
      {
        name: "snacks",
        label: "Snacks",
        path: "src/content/snacks",
        format: "yaml",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "object",
            name: "groups",
            label: "Groups",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title };
              },
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Group Title",
                required: true,
              },
              {
                type: "rich-text",
                name: "description",
                label: "Group Description",
              },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "id",
                    label: "ID",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Item Title",
                    required: true,
                  },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Content",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "link",
                    label: "Link",
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Link Text",
                      },
                      {
                        type: "string",
                        name: "url",
                        label: "Link URL",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
