import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const replace = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => ({ locale: "en" }),
}));

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/about",
  useRouter: () => ({ replace }),
}));

import { LocaleSwitcher } from "../locale-switcher";

describe("LocaleSwitcher", () => {
  it("marks the active locale as current", () => {
    render(<LocaleSwitcher />);
    expect(screen.getByText("en")).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("sv")).not.toHaveAttribute("aria-current");
  });

  it("navigates to the other locale on click", () => {
    render(<LocaleSwitcher />);
    fireEvent.click(screen.getByText("sv"));
    expect(replace).toHaveBeenCalledWith("/about", { locale: "sv" });
  });
});
