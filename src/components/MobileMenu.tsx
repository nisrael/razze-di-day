import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuContent = (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[100] md:hidden transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-xl z-[101] md:hidden overflow-y-auto transform transition-transform duration-300 animate-slide-in">
        <div className="flex flex-col min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <span className="text-xl font-display font-bold text-primary-600 dark:text-primary-400">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-4">
              <li>
                <a
                  href="/rezepte"
                  className="block px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Wechselrezepte
                </a>
              </li>
              <li>
                <a
                  href="/alternativen"
                  className="block px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Alternativen
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="block px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  FAQs
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="/newsletter"
                  className="block px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center font-semibold shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </nav>

          {/* Footer links */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="space-y-3 text-sm">
              <a
                href="/impressum"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                Datenschutz
              </a>
              <a
                href="/initiatoren"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                Initiatoren
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 -mr-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && mounted && createPortal(menuContent, document.body)}
    </>
  );
}
