import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";
import { Reveal } from "./reveal";

export function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const t = useTranslations("Projects");
  const tagline = t(`items.${project.slug}.tagline`);

  return (
    <Reveal delay={delay}>
      <Link
        href={`/work/${project.slug}`}
        className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60"
      >
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border bg-surface-2">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.name}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex gap-2 font-mono text-xs">
              {project.metric?.split(" / ").map((state) => (
                <span
                  key={state}
                  className="rounded-full border border-border px-3 py-1.5 text-muted"
                >
                  {state}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-medium text-foreground">
              {project.name}
            </h3>
            <ArrowUpRightIcon
              size={18}
              className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent"
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
