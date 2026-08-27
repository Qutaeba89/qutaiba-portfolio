import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  GithubLogoIcon,
  LockKeyIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({
    locale,
    namespace: `Projects.items.${slug}`,
  });

  const path = `/${locale}/work/${slug}`;

  return {
    title: `${project.name} — Qutaiba Aldandachi`,
    description: t("tagline"),
    alternates: {
      canonical: path,
      languages: {
        en: `/en/work/${slug}`,
        sv: `/sv/work/${slug}`,
        "x-default": `/en/work/${slug}`,
      },
    },
    openGraph: {
      title: `${project.name} — Qutaiba Aldandachi`,
      description: t("tagline"),
      url: path,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("Projects");
  const item = await getTranslations(`Projects.items.${slug}`);

  const sections: { key: "problem" | "architecture" | "security" | "results" }[] =
    [{ key: "problem" }, { key: "architecture" }, { key: "security" }, { key: "results" }];

  return (
    <article>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon size={15} />
          {t("backToWork")}
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">
          {item("tagline")}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted">
          <div>
            <dt className="inline">{project.period}</dt>
          </div>
          <div>
            <dt className="inline">{item("role")}</dt>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <GithubLogoIcon size={16} weight="bold" />
              {t("viewCode")}
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
            >
              <ArrowSquareOutIcon size={16} weight="bold" />
              {t("liveDemo")}
            </a>
          )}
          {!project.links.github && !project.links.live && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted">
              <LockKeyIcon size={16} weight="bold" />
              {t("clientProject")}
            </span>
          )}
        </div>
      </div>

      {project.image && (
        <div className="border-y border-border bg-surface">
          <div className="relative mx-auto aspect-[16/9] max-w-5xl">
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.name}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-4xl gap-10 px-6 py-14 md:grid-cols-12 md:py-20">
        <div className="space-y-10 md:col-span-8">
          {sections.map((section) => (
            <div key={section.key}>
              <h2 className="text-lg font-medium text-foreground">
                {t(`sections.${section.key}`)}
              </h2>
              <p className="mt-2.5 max-w-[70ch] leading-relaxed text-muted">
                {item(section.key)}
              </p>
            </div>
          ))}

          {item.has("liveNote") && (
            <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">
              {item("liveNote")}
            </p>
          )}
        </div>

        <div className="md:col-span-4">
          <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
            {t("stackHeading")}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="border-t border-border">
          <div className="mx-auto grid max-w-5xl gap-4 px-6 py-14 sm:grid-cols-3">
            {project.gallery.map((shot) => (
              <div
                key={shot.src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
