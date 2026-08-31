import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SectionHeading } from "../section-heading";

describe("SectionHeading", () => {
  it("renders its children inside an h2", () => {
    render(<SectionHeading>Selected work</SectionHeading>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Selected work" }),
    ).toBeInTheDocument();
  });

  it("renders the decorative kicker line as aria-hidden", () => {
    const { container } = render(<SectionHeading>About</SectionHeading>);
    const kicker = container.querySelector("[aria-hidden='true']");
    expect(kicker).not.toBeNull();
  });

  it("merges a custom className onto the wrapper", () => {
    const { container } = render(
      <SectionHeading className="mb-4">Stack</SectionHeading>,
    );
    expect(container.firstElementChild?.className).toContain("mb-4");
  });
});
