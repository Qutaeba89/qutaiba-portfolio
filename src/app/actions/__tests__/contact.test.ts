import { describe, expect, it, vi } from "vitest";

const headersMock = vi.fn();
vi.mock("next/headers", () => ({
  headers: () => headersMock(),
}));

import { submitContactForm } from "../contact";
import { initialContactFormState } from "@/lib/contact-schema";

function withIp(ip: string) {
  headersMock.mockResolvedValue(new Headers({ "x-forwarded-for": ip }));
}

function validFormData(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  fd.set("name", overrides.name ?? "Grace Hopper");
  fd.set("email", overrides.email ?? "grace@example.com");
  fd.set(
    "message",
    overrides.message ?? "Interested in your embedded systems work, let's talk.",
  );
  fd.set("hp_field", overrides.hp_field ?? "");
  return fd;
}

describe("submitContactForm", () => {
  it("returns a mailto link addressed to the site owner for a valid submission", async () => {
    withIp("203.0.113.10");

    const result = await submitContactForm(initialContactFormState, validFormData());

    expect(result.status).toBe("success");
    expect(result.mailto).toContain("mailto:qutaebadandashi@gmail.com");
  });

  it("returns field errors and does not build a mailto link for an invalid submission", async () => {
    withIp("203.0.113.11");
    const fd = validFormData({ name: "", email: "not-an-email", message: "short" });

    const result = await submitContactForm(initialContactFormState, fd);

    expect(result.status).toBe("error");
    expect(result.errorCode).toBe("invalidSubmission");
    expect(result.fieldErrors).toEqual({
      name: "required",
      email: "invalidEmail",
      message: "tooShort",
    });
    expect(result.mailto).toBeUndefined();
  });

  it("succeeds silently without a mailto link when only the honeypot field is filled", async () => {
    withIp("203.0.113.12");
    const fd = validFormData({ hp_field: "Acme Inc" });

    const result = await submitContactForm(initialContactFormState, fd);

    expect(result.status).toBe("success");
    expect(result.mailto).toBeUndefined();
  });

  it("still reports real field errors when the honeypot is filled alongside genuinely invalid fields", async () => {
    // Guards against a false "success" masking a dropped message for a real
    // visitor whose hidden field got autofilled (e.g. by a password manager)
    // while another field is also invalid.
    withIp("203.0.113.17");
    const fd = validFormData({ hp_field: "Acme Inc", email: "not-an-email" });

    const result = await submitContactForm(initialContactFormState, fd);

    expect(result.status).toBe("error");
    expect(result.errorCode).toBe("invalidSubmission");
    expect(result.fieldErrors).toEqual({ email: "invalidEmail" });
  });

  it("rate-limits a fourth submission from the same IP within the window", async () => {
    withIp("203.0.113.13");

    const first = await submitContactForm(initialContactFormState, validFormData());
    const second = await submitContactForm(initialContactFormState, validFormData());
    const third = await submitContactForm(initialContactFormState, validFormData());
    const fourth = await submitContactForm(initialContactFormState, validFormData());

    expect([first.status, second.status, third.status]).toEqual([
      "success",
      "success",
      "success",
    ]);
    expect(fourth.status).toBe("error");
    expect(fourth.errorCode).toBe("rateLimited");
  });

  it("does not let submissions from a different IP count against another visitor's limit", async () => {
    const busyIp = "203.0.113.14";
    withIp(busyIp);
    for (let i = 0; i < 3; i++) {
      await submitContactForm(initialContactFormState, validFormData());
    }
    const limited = await submitContactForm(initialContactFormState, validFormData());
    expect(limited.errorCode).toBe("rateLimited");

    withIp("203.0.113.15");
    const otherVisitor = await submitContactForm(initialContactFormState, validFormData());
    expect(otherVisitor.status).toBe("success");
  });

  it("rate-limits by x-real-ip even when x-forwarded-for is spoofed to a different value each time", async () => {
    const realIp = "203.0.113.16";
    let spoofedForwardedFor = 0;
    headersMock.mockImplementation(() =>
      Promise.resolve(
        new Headers({
          "x-real-ip": realIp,
          "x-forwarded-for": `198.51.100.${spoofedForwardedFor++}`,
        }),
      ),
    );

    for (let i = 0; i < 3; i++) {
      const result = await submitContactForm(initialContactFormState, validFormData());
      expect(result.status).toBe("success");
    }
    const fourth = await submitContactForm(initialContactFormState, validFormData());

    expect(fourth.status).toBe("error");
    expect(fourth.errorCode).toBe("rateLimited");
  });

  it("returns a generic unknown error and does not throw when reading the request fails", async () => {
    headersMock.mockRejectedValue(new Error("boom"));

    const result = await submitContactForm(initialContactFormState, validFormData());

    expect(result.status).toBe("error");
    expect(result.errorCode).toBe("unknown");
  });
});
