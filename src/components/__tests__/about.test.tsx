import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

import { About } from "../about";

describe("About", () => {
  it("renders the heading and body copy", () => {
    render(<About />);
    expect(screen.getByText("About.heading")).toBeInTheDocument();
    expect(screen.getByText("About.body")).toBeInTheDocument();
  });

  it("renders as a section with the #about anchor id", () => {
    render(<About />);
    expect(document.getElementById("about")).toBeInTheDocument();
  });
});
