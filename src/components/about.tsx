import { useTranslations } from "next-intl";
import { MapPinIcon, TranslateIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading>{t("heading")}</SectionHeading>
        </Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <p className="max-w-[65ch] text-base leading-relaxed text-muted md:text-lg">
              {t("body")}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-4">
            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
                  <MapPinIcon size={16} />
                </span>
                <div>
                  <dt className="text-muted">{t("locationLabel")}</dt>
                  <dd className="text-foreground">{t("location")}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
                  <TranslateIcon size={16} />
                </span>
                <dd className="text-foreground">{t("languages")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
