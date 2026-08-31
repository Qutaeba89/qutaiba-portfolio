import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Button } from "../button";

describe("Button", () => {
  it("renders as a link with the given href and children", () => {
    render(<Button href="/cv/resume.pdf">Download CV</Button>);
    const link = screen.getByRole("link", { name: "Download CV" });
    expect(link).toHaveAttribute("href", "/cv/resume.pdf");
  });

  it("applies the primary variant's gradient background class", () => {
    render(
      <Button href="mailto:a@b.com" variant="primary">
        Email
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Email" }).className).toContain(
      "from-accent",
    );
  });

  it("forwards arbitrary anchor props and merges custom className", () => {
    render(
      <Button href="https://example.com" target="_blank" rel="noopener noreferrer" className="mt-4">
        External
      </Button>,
    );
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.className).toContain("mt-4");
  });
});
