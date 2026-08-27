import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { ProjectsSection } from "@/components/projects-section";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProjectsSection />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
