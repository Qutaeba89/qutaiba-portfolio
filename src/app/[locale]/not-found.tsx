import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-6 py-32">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {t("heading")}
      </h1>
      <p className="mt-3 max-w-[50ch] text-muted">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/90 active:translate-y-0 active:scale-[0.98]"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
