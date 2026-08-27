import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";

const STACK_IMAGES = [
  {
    src: "/images/projects/tdr-home.jpg",
    alt: "TDR Reklam storefront",
    className: "top-0 left-0 w-[62%] rotate-[-3deg]",
  },
  {
    src: "/images/projects/alhambra-home.jpg",
    alt: "Alhambra Beauty storefront",
    className: "bottom-0 right-0 w-[62%] rotate-[3deg]",
  },
];

export function Hero() {
  const t = useTranslations("Hero");
  const trust = useTranslations("TrustStrip");

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 md:grid-cols-12 md:items-center md:pt-20">
        <div className="md:col-span-7">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
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
              <a
                href="#work"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform active:scale-[0.98]"
              >
                {t("ctaWork")}
                <ArrowUpRightIcon size={16} weight="bold" />
              </a>
              <a
                href="/cv/Qutaiba-Aldandachi-CV.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                <DownloadSimpleIcon size={16} weight="bold" />
                {t("ctaCV")}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative hidden h-72 md:col-span-5 md:block">
          {STACK_IMAGES.map((img) => (
            <div
              key={img.src}
              className={`absolute aspect-video overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/40 ${img.className}`}
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
