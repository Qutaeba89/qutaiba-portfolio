import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";
import { Reveal } from "./reveal";
import { Badge } from "./ui/badge";

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
        className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_60px_-24px_rgba(217,122,63,0.4)]"
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
                <Badge key={state} className="px-3 py-1.5">
                  {state}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-medium text-foreground">
              {project.name}
            </h3>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-transparent group-hover:bg-linear-to-br group-hover:from-accent group-hover:to-accent-2 group-hover:text-accent-foreground">
              <ArrowUpRightIcon size={16} weight="bold" />
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech} className="group-hover:border-border-strong">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
