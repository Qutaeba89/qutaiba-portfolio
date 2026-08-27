import { useTranslations } from "next-intl";
import { skillCategories } from "@/data/skills";
import { Reveal } from "./reveal";

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("heading")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <Reveal key={category.key} delay={i * 0.04} className="bg-surface p-6">
              <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
                {t(`categories.${category.key}`)}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
