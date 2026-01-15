#!/bin/bash
# Extracts translatable strings from Markdown files into POT files.
# Uses 'mdpo' (pip install mdpo).
# Note: Requires 'mdpo' package, NOT 'translate-toolkit' (which also has md2po command).

set -e

# Configuration
SRC_DIR="src/content"
POT_DIR="src/i18n/pot"

# Ensure output directory exists
mkdir -p "$POT_DIR"

echo "Starting extraction of translations from Markdown files..."

# Check for md2po
if ! command -v md2po &> /dev/null; then
    echo "Error: md2po command not found."
    exit 1
fi

# Extract Pages
# We use glob expansion to pass all files to md2po
echo "  Processing 'pages'..."
md2po "$SRC_DIR/pages/de/"*.md \
    --po-filepath "$POT_DIR/pages.pot" \
    --save --quiet

# Extract Recipes
echo "  Processing 'recipes'..."
md2po "$SRC_DIR/recipes/de/"*.md \
    --po-filepath "$POT_DIR/recipes.pot" \
    --save --quiet

echo "Done. POT files are in $POT_DIR."
