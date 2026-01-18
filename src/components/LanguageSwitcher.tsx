import { Languages, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  currentLang: string;
  languages: Array<{
    code: string;
    name: string;
    href: string;
    isActive: boolean;
  }>;
}

export default function LanguageSwitcher({ currentLang, languages }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          aria-label="Select language"
        >
          <Languages className="h-5 w-5" />
          <span className="uppercase font-semibold">{currentLang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem key={language.code} asChild>
            <a
              href={language.href}
              className={`flex items-center justify-between w-full ${
                language.isActive ? "bg-primary-50 dark:bg-primary-950" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="uppercase text-xs font-mono">
                  {language.code}
                </span>
                <span>{language.name}</span>
              </div>
              {language.isActive && <Check className="h-4 w-4 ml-2" />}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
