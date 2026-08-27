import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { projects } from "@/data/projects";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

vi.mock("next/image", () => ({
  default: (props: { alt: string }) =>
    createElement("span", { role: "img", "aria-label": props.alt }),
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import { ProjectsSection } from "../projects-section";

describe("ProjectsSection", () => {
  it("renders a card for every project in the data set", () => {
    render(<ProjectsSection />);
    for (const project of projects) {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    }
  });

  it("exposes the #work anchor for the nav to scroll to", () => {
    render(<ProjectsSection />);
    expect(document.getElementById("work")).toBeInTheDocument();
  });
});
