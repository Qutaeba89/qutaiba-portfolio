import { useTranslations } from "next-intl";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { Button } from "./ui/button";

const GITHUB = "https://github.com/Qutaeba89";
const LINKEDIN = "https://linkedin.com/in/qutaiba-al-dandachi";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full bg-radial-[at_50%_100%] from-accent/12 via-transparent to-transparent"
      />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading>{t("heading")}</SectionHeading>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted md:text-lg">
            {t("body")}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <GithubLogoIcon size={16} weight="bold" />
              {t("github")}
            </Button>
            <Button
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <LinkedinLogoIcon size={16} weight="bold" />
              {t("linkedin")}
            </Button>
            <Button
              href="/cv/Qutaiba-Aldandachi-CV.pdf"
              download
              variant="secondary"
            >
              <DownloadSimpleIcon size={16} weight="bold" />
              {t("downloadCV")}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
