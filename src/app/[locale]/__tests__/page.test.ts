import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/hero", () => ({ Hero: () => null }));
vi.mock("@/components/about", () => ({ About: () => null }));
vi.mock("@/components/skills", () => ({ Skills: () => null }));
vi.mock("@/components/projects-section", () => ({ ProjectsSection: () => null }));
vi.mock("@/components/experience", () => ({ Experience: () => null }));
vi.mock("@/components/contact", () => ({ Contact: () => null }));

const { generateStaticParams } = await import("../page");

describe("HomePage generateStaticParams", () => {
  it("returns a param entry for every configured locale", () => {
    expect(generateStaticParams()).toEqual([{ locale: "en" }, { locale: "sv" }]);
  });

  it("does not include an unconfigured locale", () => {
    const locales: string[] = generateStaticParams().map((p) => p.locale);
    expect(locales.includes("de")).toBe(false);
  });
});
