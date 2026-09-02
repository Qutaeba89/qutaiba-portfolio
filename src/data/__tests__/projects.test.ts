import { describe, expect, it } from "vitest";
import { getProject, projects } from "../projects";

describe("getProject", () => {
  it("returns the matching project for a known slug", () => {
    const project = getProject("tdr-reklam");
    expect(project?.name).toBe("Test Reklam");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProject("does-not-exist")).toBeUndefined();
  });

  it("every project has a non-empty stack list", () => {
    for (const project of projects) {
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });
});
