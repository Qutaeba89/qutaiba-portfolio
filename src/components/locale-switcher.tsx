"use client";

import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const activeLocale = String(params.locale ?? routing.defaultLocale);

  return (
    <div className="flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-mono">
      {routing.locales.map((locale) => {
        const isActive = locale === activeLocale;
        return (
          <button
            key={locale}
            type="button"
            aria-current={isActive ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale })}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
