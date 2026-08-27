import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

import { Skills } from "../skills";
import { skillCategories } from "@/data/skills";

describe("Skills", () => {
  it("renders a category block for every entry in skillCategories", () => {
    render(<Skills />);
    for (const category of skillCategories) {
      expect(
        screen.getByText(`Skills.categories.${category.key}`),
      ).toBeInTheDocument();
    }
  });

  it("renders each individual skill chip for the backend category", () => {
    render(<Skills />);
    const backend = skillCategories.find((c) => c.key === "backend")!;
    for (const item of backend.items) {
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    }
  });
});
