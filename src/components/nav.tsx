"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ListIcon, XIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";

const sections = [
  { href: "/#work", key: "work" },
  { href: "/#about", key: "about" },
  { href: "/#experience", key: "experience" },
  { href: "/#contact", key: "contact" },
] as const;

export function Nav() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          QA<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {sections.map((section) => (
            <a
              key={section.key}
              href={section.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(section.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          <a
            href="/cv/Qutaiba-Aldandachi-CV.pdf"
            download
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadSimpleIcon size={15} weight="bold" />
            {t("downloadCV")}
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
        >
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {sections.map((section) => (
              <a
                key={section.key}
                href={section.href}
                onClick={() => setOpen(false)}
                className="text-base text-muted transition-colors hover:text-foreground"
              >
                {t(section.key)}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between">
            <LocaleSwitcher />
            <a
              href="/cv/Qutaiba-Aldandachi-CV.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground"
            >
              <DownloadSimpleIcon size={15} weight="bold" />
              {t("downloadCV")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
