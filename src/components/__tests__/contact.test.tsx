import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

import { Contact } from "../contact";

describe("Contact", () => {
  it("does not render a standalone email CTA (the contact form is the single email path)", () => {
    render(<Contact />);
    expect(screen.queryByText("Contact.email")).not.toBeInTheDocument();
  });

  it("opens GitHub and LinkedIn in a new tab with safe rel attributes", () => {
    render(<Contact />);
    const github = screen.getByText("Contact.github").closest("a")!;
    const linkedin = screen.getByText("Contact.linkedin").closest("a")!;
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });
});
