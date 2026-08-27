export type ProjectLink = {
  github?: string;
  live?: string;
};

export type Project = {
  slug: string;
  name: string;
  period: string;
  status: "solo" | "internship";
  stack: string[];
  links: ProjectLink;
  metric?: string;
  image?: string;
  imageAlt?: string;
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "dar-al-alson",
    name: "Dar Al-Alson",
    period: "2025 – 2026",
    status: "solo",
    stack: [
      "Next.js 16",
      "Prisma",
      "PostgreSQL",
      "Iron-Session",
      "Redis",
      "Docker",
      "Kubernetes",
      "Vitest",
      "Playwright",
      "Sentry",
    ],
    links: {
      github: "https://github.com/Qutaeba89/Dar-Al-Alson",
    },
    metric: "1,000+ tests",
    image: "/images/projects/dar-al-alson-login.jpg",
    imageAlt: "Dar Al-Alson login screen, Arabic RTL interface",
    gallery: [
      { src: "/images/projects/dar-al-alson-dashboard.png", alt: "Dar Al-Alson staff dashboard" },
      { src: "/images/projects/dar-al-alson-courses.png", alt: "Dar Al-Alson course catalogue" },
      { src: "/images/projects/dar-al-alson-placement-test.png", alt: "Dar Al-Alson CEFR placement test" },
    ],
  },
  {
    slug: "alhambra-beauty",
    name: "Alhambra Beauty",
    period: "2025",
    status: "solo",
    stack: [
      "Next.js 15",
      "Drizzle ORM",
      "Neon Postgres",
      "JWT (jose)",
      "Argon2",
      "TOTP 2FA",
      "Tailwind CSS",
      "Framer Motion",
    ],
    links: {
      github: "https://github.com/Qutaeba89/Alhambra-beauty",
      live: "http://89.46.83.46/",
    },
    metric: "Dual-currency, dual-script",
    image: "/images/projects/alhambra-home.jpg",
    imageAlt: "Alhambra Beauty storefront hero",
    gallery: [
      { src: "/images/projects/alhambra-shop-dark.png", alt: "Alhambra Beauty shop grid, dark mode" },
      { src: "/images/projects/alhambra-admin-dark.png", alt: "Alhambra Beauty admin console" },
      { src: "/images/projects/alhambra-try-live-dark.png", alt: "Alhambra Beauty try-it-live product view" },
    ],
  },
  {
    slug: "tdr-reklam",
    name: "TDR Reklam",
    period: "2026",
    status: "solo",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Drizzle ORM",
      "Neon Postgres",
      "next-intl",
      "Stripe",
      "Upstash Redis",
      "Resend",
      "GitHub Actions",
      "Vitest",
    ],
    links: {
      github: "https://github.com/Qutaeba89/TDR-Reklam",
      live: "https://tdr-reklam.vercel.app/en",
    },
    metric: "599 tests · CI on every push",
    image: "/images/projects/tdr-home.jpg",
    imageAlt: "TDR Reklam storefront hero",
    gallery: [
      { src: "/images/projects/tdr-catalog.png", alt: "TDR Reklam product catalogue with tier pricing" },
      { src: "/images/projects/tdr-admin-owner.png", alt: "TDR Reklam owner-level admin dashboard" },
      { src: "/images/projects/tdr-invoice.png", alt: "TDR Reklam invoice and receipt printing" },
    ],
  },
  {
    slug: "cm-client",
    name: "AI Condition Monitoring Dashboard",
    period: "Feb 2026 – May 2026",
    status: "internship",
    stack: ["Next.js", "WebSocket", "Docker", "Kubernetes", "i18n (EN/SV)"],
    links: {},
    metric: "Live / Reconnecting / Offline",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
