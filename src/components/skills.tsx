import { useTranslations } from "next-intl";
import {
  DatabaseIcon,
  BrowserIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
  TestTubeIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import { skillCategories } from "@/data/skills";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const CATEGORY_ICONS: Record<
  (typeof skillCategories)[number]["key"],
  React.ComponentType<IconProps>
> = {
  backend: DatabaseIcon,
  frontend: BrowserIcon,
  devops: CloudArrowUpIcon,
  security: ShieldCheckIcon,
  testing: TestTubeIcon,
  tools: WrenchIcon,
};

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading>{t("heading")}</SectionHeading>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = CATEGORY_ICONS[category.key];
            return (
              <Reveal
                key={category.key}
                delay={i * 0.04}
                className="group bg-surface p-6 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-accent transition-colors group-hover:border-accent/40">
                    <Icon size={15} />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
                    {t(`categories.${category.key}`)}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
