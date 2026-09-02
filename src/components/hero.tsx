import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { formatDisplayName } from "@/lib/format-display-name";
import { Reveal } from "./reveal";
import { Button } from "./ui/button";

const OWNER_NAME = "qutaiba aldandachi";

const STACK_IMAGES = [
  {
    src: "/images/projects/tdr-home.jpg",
    alt: "Test Reklam storefront",
    className: "top-0 left-0 w-[64%] rotate-[-4deg]",
  },
  {
    src: "/images/projects/alhambra-home.jpg",
    alt: "Alhambra Beauty storefront",
    className: "right-0 bottom-0 w-[64%] rotate-[3deg]",
  },
];

export function Hero() {
  const t = useTranslations("Hero");
  const trust = useTranslations("TrustStrip");
  const displayName = formatDisplayName(OWNER_NAME);

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pt-16 pb-20 md:grid-cols-12 md:items-center md:pt-20">
        <div className="md:col-span-7">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {t("availableBadge")}
            </div>
          </Reveal>
          <Reveal>
            <p className="mb-3 text-sm font-medium text-accent-2">
              {t("greeting", { name: displayName })}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance [text-wrap:balance] md:text-6xl">
              {t("headline")}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
              {t("subtext")}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#work" variant="primary">
                {t("ctaWork")}
                <ArrowUpRightIcon size={16} weight="bold" />
              </Button>
              <Button
                href="/cv/Qutaiba-Aldandachi-CV.pdf"
                download
                variant="secondary"
              >
                <DownloadSimpleIcon size={16} weight="bold" />
                {t("ctaCV")}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative hidden h-80 md:col-span-5 md:block">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-[2rem] bg-linear-to-br from-accent/12 via-accent-2/8 to-transparent blur-3xl"
          />
          {STACK_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`absolute aspect-video overflow-hidden rounded-2xl border ${i === 1 ? "border-accent/25" : "border-white/10"} shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 30vw, 60vw"
                className="object-cover object-top"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-3 text-center font-mono text-xs text-muted md:text-left">
          {trust("label")}
        </p>
      </div>
    </section>
  );
}
