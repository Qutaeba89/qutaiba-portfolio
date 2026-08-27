import { describe, expect, it, vi } from "vitest";
import { getProject, projects } from "@/data/projects";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));
vi.mock("@/i18n/navigation", () => ({
  Link: "a",
}));

const { generateStaticParams } = await import("../page");

describe("ProjectPage generateStaticParams", () => {
  it("returns one entry per locale per project", () => {
    const params = generateStaticParams();
    expect(params.length).toBe(2 * projects.length);
    expect(params).toContainEqual({ locale: "en", slug: "tdr-reklam" });
    expect(params).toContainEqual({ locale: "sv", slug: "tdr-reklam" });
  });

  it("every generated slug resolves to a real project", () => {
    const params = generateStaticParams();
    for (const { slug } of params) {
      expect(getProject(slug)).toBeDefined();
    }
  });

  it("an unknown slug does not resolve to a project", () => {
    expect(getProject("not-a-real-project")).toBeUndefined();
  });
});
