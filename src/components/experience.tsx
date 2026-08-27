import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export function Experience() {
  const t = useTranslations("Experience");
  const items = t.raw("items") as ExperienceItem[];

  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("heading")}
          </h2>
        </Reveal>

        <ol className="mt-10 space-y-10 border-l border-border pl-8">
          {items.map((item, i) => (
            <Reveal key={`${item.role}-${item.company}`} delay={i * 0.05}>
              <li className="relative">
                <span className="absolute top-1.5 -left-[calc(2rem+5px)] size-2.5 rounded-full bg-accent" />
                <p className="font-mono text-xs text-muted">{item.period}</p>
                <h3 className="mt-1.5 text-lg font-medium text-foreground">
                  {item.role}
                </h3>
                <p className="text-sm text-muted">{item.company}</p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="max-w-[70ch]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
