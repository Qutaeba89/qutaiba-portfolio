import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

// Test-only stand-in for next/image (no real optimization pipeline in jsdom).
vi.mock("next/image", () => ({
  default: (props: { alt: string }) =>
    createElement("span", { role: "img", "aria-label": props.alt }),
}));

import { Hero } from "../hero";

describe("Hero", () => {
  it("renders the headline, subtext, and both CTAs", () => {
    render(<Hero />);
    expect(screen.getByText("Hero.headline")).toBeInTheDocument();
    expect(screen.getByText("Hero.subtext")).toBeInTheDocument();
    expect(screen.getByText("Hero.ctaWork")).toBeInTheDocument();
    expect(screen.getByText("Hero.ctaCV")).toBeInTheDocument();
  });

  it("points the primary CTA at the work section", () => {
    render(<Hero />);
    expect(screen.getByText("Hero.ctaWork").closest("a")).toHaveAttribute(
      "href",
      "#work",
    );
  });
});
