import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const items = [
  {
    role: "Role A",
    company: "Company A",
    period: "2025",
    bullets: ["Did the thing."],
  },
  {
    role: "Role B",
    company: "Company B",
    period: "2026",
    bullets: ["Did another thing.", "And a second bullet."],
  },
];

vi.mock("next-intl", () => ({
  useTranslations: () =>
    Object.assign((key: string) => key, { raw: () => items }),
}));

import { Experience } from "../experience";

describe("Experience", () => {
  it("renders one entry per item, in order", () => {
    render(<Experience />);
    const roles = screen.getAllByRole("heading", { level: 3 });
    expect(roles.map((el) => el.textContent)).toEqual(["Role A", "Role B"]);
  });

  it("renders every bullet for an entry with multiple bullets", () => {
    render(<Experience />);
    expect(screen.getByText("Did another thing.")).toBeInTheDocument();
    expect(screen.getByText("And a second bullet.")).toBeInTheDocument();
  });
});
