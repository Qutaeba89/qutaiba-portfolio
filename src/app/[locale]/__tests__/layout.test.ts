import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({}),
}));
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));
vi.mock("@/components/nav", () => ({ Nav: () => null }));
vi.mock("@/components/footer", () => ({ Footer: () => null }));

const { generateStaticParams } = await import("../layout");

describe("generateStaticParams", () => {
  it("returns a param entry for every configured locale", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "sv" }]);
  });

  it("does not include an unconfigured locale", () => {
    const params = generateStaticParams();
    const locales: string[] = params.map((p) => p.locale);
    expect(locales.includes("de")).toBe(false);
  });
});
