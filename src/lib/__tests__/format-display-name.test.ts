import { describe, expect, it } from "vitest";

import { formatDisplayName } from "../format-display-name";

describe("formatDisplayName", () => {
  it("title-cases each word of a lowercase name", () => {
    expect(formatDisplayName("qutaiba aldandachi")).toBe("Qutaiba Aldandachi");
  });

  it("trims leading, trailing, and repeated whitespace", () => {
    expect(formatDisplayName("  qutaiba   aldandachi  ")).toBe(
      "Qutaiba Aldandachi",
    );
  });

  it("normalizes a name that is already uppercase", () => {
    expect(formatDisplayName("QUTAIBA ALDANDACHI")).toBe("Qutaiba Aldandachi");
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(formatDisplayName("   ")).toBe("");
  });
});
