import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "../reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>content</p>
      </Reveal>,
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("applies the passed className to the wrapper", () => {
    render(
      <Reveal className="test-class">
        <span>x</span>
      </Reveal>,
    );
    expect(screen.getByText("x").parentElement).toHaveClass("test-class");
  });
});
