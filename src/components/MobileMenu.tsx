import { useState } from "react";
import { Menu, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  t: {
    title: string;
    close: string;
    toggle: string;
  };
  navItems: Array<{
    href: string;
    label: string;
    isPrimary?: boolean;
  }>;
  footerLinks: Array<{
    href: string;
    label: string;
  }>;
  legalItems: Array<{
    href: string;
    label: string;
  }>;
  languageLinks: Array<{
    code: string;
    name: string;
    href: string;
    isActive: boolean;
  }>;
}

export default function MobileMenu({
  t,
  navItems,
  footerLinks,
  legalItems,
  languageLinks,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={t.toggle}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 md:hidden overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-primary-600 dark:text-primary-400">
            {t.title}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 min-h-full">
          {/* Navigation links */}
          <nav>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      item.isPrimary
                        ? "bg-primary-600 text-white hover:bg-primary-700 text-center shadow-md"
                        : "hover:bg-primary-50 dark:hover:bg-primary-950 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language switcher */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-2">
              Language
            </h3>
            <div className="flex flex-col gap-2">
              {languageLinks.map((lang) => (
                <a
                  key={lang.code}
                  href={lang.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    lang.isActive
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-950 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <span className="uppercase text-xs font-mono">
                      {lang.code}
                    </span>
                    <span>{lang.name}</span>
                  </div>
                  {lang.isActive && <Check className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-auto border-t border-gray-200 dark:border-gray-800 pt-4 bg-gray-50 dark:bg-gray-800/50 -mx-6 -mb-6 px-6 py-4">
            <div className="space-y-4">
              {/* Links section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-2">
                  Links
                </h3>
                <div className="space-y-2 text-sm">
                  {footerLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Legal section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-2">
                  Legal
                </h3>
                <div className="space-y-2 text-sm">
                  {legalItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
