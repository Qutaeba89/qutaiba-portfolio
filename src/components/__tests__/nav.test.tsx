import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
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

vi.mock("../locale-switcher", () => ({
  LocaleSwitcher: () => <div data-testid="locale-switcher" />,
}));

import { Nav } from "../nav";

describe("Nav", () => {
  it("renders every section link and the CV download", () => {
    render(<Nav />);
    expect(screen.getAllByText("work").length).toBeGreaterThan(0);
    expect(screen.getAllByText("about").length).toBeGreaterThan(0);
    expect(screen.getAllByText("experience").length).toBeGreaterThan(0);
    expect(screen.getAllByText("contact").length).toBeGreaterThan(0);
    expect(screen.getAllByText("downloadCV").length).toBeGreaterThan(0);
  });

  it("toggles the mobile menu open and closed", () => {
    render(<Nav />);
    const toggle = screen.getByLabelText("Open menu");
    fireEvent.click(toggle);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });
});
