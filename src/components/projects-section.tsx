import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

export function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("heading")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
