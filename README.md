# Digital independence day Website

## Overview

di-day is a static site built with [Astro](https://astro.build)

## Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [TailwindCSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Internationalization**: [astro-i18next](https://github.com/yassinelley/astro-i18next)
- **Content Management**: [TinaCMS](https://tina.io)
- **Maps**: [Leaflet](https://leafletjs.com) + [react-leaflet](https://react-leaflet.js.org)
- **UI Components**: [Radix UI](https://www.radix-ui.com)
- **Language**: TypeScript + React for interactive components

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (recommended) or npm/yarn

### Installation

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

Starts the dev server with Tina CMS integration at `http://localhost:4321`

### Building

```sh
pnpm build
```

Generates optimized production build in the `dist/` directory.

### Preview

```sh
pnpm preview
```

Preview the production build locally before deployment.

## Scripts

| Command        | Action                           |
| -------------- | -------------------------------- |
| `pnpm dev`     | Start dev server with TinaCMS    |
| `pnpm build`   | Build for production             |
| `pnpm preview` | Preview production build locally |

## Content

### Adding Content

Use [TinaCMS](https://app.tina.io) to manage content, or edit JSON/Markdown files directly in:

- `src/content/recipes/` - Recipe data
- `src/content/faqs/` - FAQ content
- `src/content/pages/` - Markdown pages
- `src/content/snacks.json` - Alternative knowledge snacks
