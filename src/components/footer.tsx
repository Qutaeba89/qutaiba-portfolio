import { useTranslations } from "next-intl";
import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";

const EMAIL = "qutaebadandashi@gmail.com";
const GITHUB = "https://github.com/Qutaeba89";
const LINKEDIN = "https://linkedin.com/in/qutaiba-al-dandachi";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Qutaiba Aldandachi. {t("rights")}
        </p>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="flex size-9 items-center justify-center rounded-full border border-transparent transition-all hover:-translate-y-0.5 hover:border-border hover:text-accent"
          >
            <EnvelopeSimpleIcon size={18} />
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex size-9 items-center justify-center rounded-full border border-transparent transition-all hover:-translate-y-0.5 hover:border-border hover:text-accent"
          >
            <GithubLogoIcon size={18} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex size-9 items-center justify-center rounded-full border border-transparent transition-all hover:-translate-y-0.5 hover:border-border hover:text-accent"
          >
            <LinkedinLogoIcon size={18} />
          </a>
        </div>
        <p className="font-mono text-xs text-muted/70">{t("builtWith")}</p>
      </div>
    </footer>
  );
}
