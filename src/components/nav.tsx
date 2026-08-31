"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ListIcon, XIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { Button } from "./ui/button";

const sections = [
  { href: "/#work", key: "work" },
  { href: "/#about", key: "about" },
  { href: "/#experience", key: "experience" },
  { href: "/#contact", key: "contact" },
] as const;

export function Nav() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/85 shadow-[0_1px_0_0_var(--border)]"
          : "border-transparent bg-background/40"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="group font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="transition-opacity group-hover:opacity-70">QA</span>
          <span className="text-gradient inline-block transition-transform duration-200 group-hover:scale-125">
            .
          </span>
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
          <Button
            href="/cv/Qutaiba-Aldandachi-CV.pdf"
            download
            variant="secondary"
            size="sm"
          >
            <DownloadSimpleIcon size={15} weight="bold" />
            {t("downloadCV")}
          </Button>
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
            <Button
              href="/cv/Qutaiba-Aldandachi-CV.pdf"
              download
              variant="secondary"
              size="sm"
            >
              <DownloadSimpleIcon size={15} weight="bold" />
              {t("downloadCV")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
