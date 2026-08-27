import { useTranslations } from "next-intl";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";

const EMAIL = "qutaebadandashi@gmail.com";
const GITHUB = "https://github.com/Qutaeba89";
const LINKEDIN = "https://linkedin.com/in/qutaiba-al-dandachi";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("heading")}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted md:text-lg">
            {t("body")}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground active:scale-[0.98]"
            >
              <EnvelopeSimpleIcon size={16} weight="bold" />
              {t("email")}
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              <GithubLogoIcon size={16} weight="bold" />
              {t("github")}
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              <LinkedinLogoIcon size={16} weight="bold" />
              {t("linkedin")}
            </a>
            <a
              href="/cv/Qutaiba-Aldandachi-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              <DownloadSimpleIcon size={16} weight="bold" />
              {t("downloadCV")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
