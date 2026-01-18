// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { LOCALES } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: "https://di.day",
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  i18n: {
    defaultLocale: "de",
    locales: [...LOCALES],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    "/de/rezepte": "/de/recipes",
    "/de/alternativen": "/de/snacks",
    "/de/datenschutz": "/de/privacy",
    "/de/impressum": "/de/imprint",
    "/de/partner": "/de/partners",
    "/de/recipes/buchladen": "/de/recipes/bookstore",
    "/de/recipes/whats-app-zu-signal": "/de/recipes/whats-app-to-signal",
    "/de/recipes/google-zu-ecosia": "/en/recipes/google-to-ecosia",
    "/de/talkaboutit": "/de/contribute",
    "/de/support": "/de/contribute",
    "/rezepte": "/de/recipes",
    "/alternativen": "/de/snacks",
    "/datenschutz": "/de/privacy",
    "/impressum": "/de/imprint",
    "/partner": "/de/partners",
    "/recipes/buchladen": "/de/recipes/bookstore",
    "/recipes/whats-app-zu-signal": "/de/recipes/whats-app-to-signal",
    "/recipes/google-zu-ecosia": "/en/recipes/google-to-ecosia",
    "/talkaboutit": "/de/contribute",
    "/sprichdrueber": "/de/contribute",
    "/support": "/de/contribute",
    "/en/alternativen": "/en/snacks",
    "/en/talkaboutit": "/en/contribute",
    "/en/support": "/en/contribute",
  },
});
