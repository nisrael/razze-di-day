import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { RecipesRecipes } from "tina/__generated__/types";

interface Props {
  recipe: { id: string; data: RecipesRecipes };
  href: string;
}

export default function RecipeCard({ recipe, href }: Props) {
  const data = recipe.data || recipe;
  const heroImage = data.heroImage;
  const title = data.title;
  const description = data.description;

  return (
    <a
      href={href}
      className="group block transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-primary-900 rounded-2xl"
    >
      <Card className="h-full border-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
        {heroImage && (
          <div
            className="aspect-video overflow-hidden"
            data-astro-transition:name={`recipe-image-${title}`}
          >
            <img
              src={typeof heroImage === "string" ? heroImage : heroImage.src}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardContent className="p-6">
          <CardTitle className="text-xl font-display font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </CardTitle>

          <CardDescription className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </a>
  );
}
