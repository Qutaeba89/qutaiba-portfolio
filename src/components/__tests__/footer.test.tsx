import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

import { Footer } from "../footer";

describe("Footer", () => {
  it("renders the current year and full name", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getByText(/Qutaiba Aldandachi/)).toBeInTheDocument();
  });

  it("links to email, GitHub, and LinkedIn with safe target attributes", () => {
    render(<Footer />);
    const github = screen.getByLabelText("GitHub");
    const linkedin = screen.getByLabelText("LinkedIn");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "href",
      "mailto:qutaebadandashi@gmail.com",
    );
  });
});
