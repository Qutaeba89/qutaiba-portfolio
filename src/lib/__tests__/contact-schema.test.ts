import { describe, expect, it } from "vitest";
import { buildMailto, contactSchema, fieldErrorsFromIssues } from "../contact-schema";

describe("contactSchema", () => {
  it("accepts a well-formed submission", () => {
    const result = contactSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "I would love to collaborate on a project together.",
      hp_field: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      message: "short",
      hp_field: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = contactSchema.safeParse({
      name: "Ada",
      email: "not-an-email",
      message: "I would love to collaborate on a project together.",
      hp_field: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-empty honeypot field", () => {
    const result = contactSchema.safeParse({
      name: "Bot",
      email: "bot@example.com",
      message: "This is a message written by an automated bot.",
      hp_field: "Acme Inc",
    });
    expect(result.success).toBe(false);
  });
});

describe("fieldErrorsFromIssues", () => {
  it("maps a missing name to a required error", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "ada@example.com",
      message: "I would love to collaborate on a project together.",
      hp_field: "",
    });
    if (result.success) throw new Error("expected validation to fail");
    expect(fieldErrorsFromIssues(result.error.issues)).toEqual({ name: "required" });
  });

  it("maps a too-short message to a tooShort error", () => {
    const result = contactSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      message: "short",
      hp_field: "",
    });
    if (result.success) throw new Error("expected validation to fail");
    expect(fieldErrorsFromIssues(result.error.issues)).toEqual({ message: "tooShort" });
  });

  it("maps an invalid email to an invalidEmail error", () => {
    const result = contactSchema.safeParse({
      name: "Ada",
      email: "not-an-email",
      message: "I would love to collaborate on a project together.",
      hp_field: "",
    });
    if (result.success) throw new Error("expected validation to fail");
    expect(fieldErrorsFromIssues(result.error.issues)).toEqual({ email: "invalidEmail" });
  });

  it("ignores issues on fields outside the form (e.g. the honeypot)", () => {
    const result = contactSchema.safeParse({
      name: "Bot",
      email: "bot@example.com",
      message: "This is a message written by an automated bot.",
      hp_field: "Acme Inc",
    });
    if (result.success) throw new Error("expected validation to fail");
    expect(fieldErrorsFromIssues(result.error.issues)).toEqual({});
  });
});

describe("buildMailto", () => {
  it("builds a mailto link addressed to the site owner with an encoded subject and body", () => {
    const url = buildMailto("Ada Lovelace", "ada@example.com", "Let's collaborate.");

    expect(url).toContain("mailto:qutaebadandashi@gmail.com");
    expect(url).toContain(`subject=${encodeURIComponent("Portfolio contact from Ada Lovelace")}`);
    expect(url).toContain(encodeURIComponent("From: Ada Lovelace <ada@example.com>"));
    expect(url).toContain(encodeURIComponent("Let's collaborate."));
  });

  it("strips newlines from the name before using it in the subject line", () => {
    const url = buildMailto("Ada\nBcc: attacker@example.com", "ada@example.com", "Hello there.");

    expect(url).toContain(`subject=${encodeURIComponent("Portfolio contact from Ada Bcc: attacker@example.com")}`);
  });
});
