import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Badge } from "../badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>Next.js</Badge>);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("merges a custom className with the base pill styles", () => {
    render(<Badge className="text-success">Live</Badge>);
    const badge = screen.getByText("Live");
    expect(badge.className).toContain("text-success");
    expect(badge.className).toContain("rounded-full");
  });

  it("forwards arbitrary span props", () => {
    render(<Badge aria-label="status">Live</Badge>);
    expect(screen.getByLabelText("status")).toBeInTheDocument();
  });
});
