# Astro Starter Kit: Blog

```sh
pnpm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

## 🌍 Internationalization (i18n) Workflow

This project uses `mdpo` to synchronize Markdown content with Weblate via PO/POT files.

### 1. Prerequisites (System)

The `mdpo` tool requires the `md4c` system libraries.

```bash
# Ubuntu / Debian
sudo apt-get update
sudo apt-get install libmd4c-html0-dev libmd4c-dev
```

### 2. Setup Virtual Environment

Python tools are managed in a virtual environment to avoid conflicts.

```bash
# Create virtual environment
python3 -m venv .venv

# Activate it
source .venv/bin/activate

# Install mdpo
pip install mdpo
```

### 3. Workflow Scripts

Always ensure your virtual environment is active (`source .venv/bin/activate`) before running these scripts.

#### Extract Translations
Updates the `.pot` templates in `src/i18n/pot/` based on the German (`de`) Markdown source files.

```bash
./scripts/i18n-extract.sh
```

#### Generate Translated Pages
Creates/updates the English (`en`) Markdown pages in `src/content/` based on the translated `.po` files in `src/i18n/po/`.

```bash
./scripts/i18n-generate.sh
```

### 4. CI/CD Automation

The project uses GitHub Actions to automate the i18n synchronization, so editors/translators do not need to run these scripts locally.

#### `i18n Extract` Workflow
*   **Trigger:** Pushes to `src/content/.../de/*.md` (German source changes).
*   **Action:** Runs the extraction script.
*   **Result:** Commits updated `.pot` template files back to the repository.

#### `i18n Generate` Workflow
*   **Trigger:** Pushes to `src/i18n/po/**` (Translation updates, e.g., from Weblate).
*   **Action:** Runs the generation script.
*   **Result:** Commits updated translated Markdown files (e.g., `en/*.md`) back to the repository.
