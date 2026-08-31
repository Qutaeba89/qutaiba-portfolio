import { z } from "zod";

const TO_EMAIL = "qutaebadandashi@gmail.com";

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  message: z.string().min(10).max(2000),
  // Honeypot: deliberately not named like a common identity field
  // (name/email/company/phone/url), so password-manager and browser
  // autofill heuristics won't populate it for a real visitor.
  hp_field: z.string().max(0).optional(),
});

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message", "required" | "tooShort" | "tooLong" | "invalidEmail">
>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errorCode?: "rateLimited" | "invalidSubmission" | "unknown";
  fieldErrors?: ContactFieldErrors;
  mailto?: string;
};

export const initialContactFormState: ContactFormState = { status: "idle" };

export function fieldErrorsFromIssues(issues: z.core.$ZodIssue[]): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (field !== "name" && field !== "email" && field !== "message") continue;

    if (field === "email" && issue.code === "invalid_format") {
      errors.email = "invalidEmail";
    } else if (issue.code === "too_small") {
      errors[field] = issue.minimum === 1 ? "required" : "tooShort";
    } else if (issue.code === "too_big") {
      errors[field] = "tooLong";
    } else {
      errors[field] = "required";
    }
  }

  return errors;
}

export function buildMailto(name: string, email: string, message: string): string {
  const subject = `Portfolio contact from ${name}`.replace(/[\r\n]+/g, " ");
  const body = `From: ${name} <${email}>\n\n${message}`;
  return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
