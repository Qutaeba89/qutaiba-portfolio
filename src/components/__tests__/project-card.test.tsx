import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Project } from "@/data/projects";

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

import { ProjectCard } from "../project-card";

const project: Project = {
  slug: "test-project",
  name: "Test Project",
  period: "2026",
  status: "solo",
  stack: ["Next.js", "PostgreSQL", "Docker", "Vitest", "Redis"],
  links: { github: "https://github.com/example/test-project" },
  image: "/images/projects/test.jpg",
  imageAlt: "Test project screenshot",
};

describe("ProjectCard", () => {
  it("links to the project's case study page", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/work/test-project",
    );
  });

  it("caps the visible stack chips at 4", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText("Vitest")).toBeInTheDocument();
    expect(screen.queryByText("Redis")).not.toBeInTheDocument();
  });

  it("falls back to metric pills when no image is provided", () => {
    const noImageProject: Project = {
      ...project,
      image: undefined,
      imageAlt: undefined,
      metric: "Live / Reconnecting / Offline",
    };
    render(<ProjectCard project={noImageProject} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("Offline")).toBeInTheDocument();
  });
});
