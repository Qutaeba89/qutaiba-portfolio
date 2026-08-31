import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

const submitContactFormMock = vi.fn();
vi.mock("@/app/actions/contact", () => ({
  submitContactForm: (...args: unknown[]) => submitContactFormMock(...args),
}));

import { ContactForm } from "../contact-form";

describe("ContactForm", () => {
  it("renders labeled name, email, and message fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Contact.form.nameLabel")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact.form.emailLabel")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact.form.messageLabel")).toBeInTheDocument();
  });

  it("renders a submit button that is not disabled before submission", () => {
    render(<ContactForm />);
    const submit = screen.getByRole("button", { name: /Contact\.form\.submit/ });
    expect(submit).not.toBeDisabled();
  });

  it("keeps the honeypot field hidden from view and out of tab order", () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="hp_field"]');
    expect(honeypot).toHaveAttribute("tabIndex", "-1");
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
  });
});

describe("ContactForm resubmission", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    submitContactFormMock.mockReset();
    // @ts-expect-error -- narrowing window.location to a writable stub for this test
    delete window.location;
    // @ts-expect-error -- partial Location stub, only `href` is exercised
    window.location = { href: "" };
  });

  afterEach(() => {
    // @ts-expect-error -- restoring the real Location object after the stub
    window.location = originalLocation;
  });

  it("navigates to the mailto link again on an identical resubmission", async () => {
    // The action always returns a fresh object literal per call, even when
    // the content (mailto URL) is identical across two submissions.
    submitContactFormMock.mockImplementation(async () => ({
      status: "success",
      mailto: "mailto:test@example.com?subject=a&body=b",
    }));

    render(<ContactForm />);
    const form = screen
      .getByRole("button", { name: /Contact\.form\.submit/ })
      .closest("form")!;

    await act(async () => {
      fireEvent.submit(form);
    });
    expect(window.location.href).toBe("mailto:test@example.com?subject=a&body=b");

    // @ts-expect-error -- reset the stub between the two simulated submissions
    window.location = { href: "" };

    await act(async () => {
      fireEvent.submit(form);
    });
    expect(window.location.href).toBe("mailto:test@example.com?subject=a&body=b");
  });
});
