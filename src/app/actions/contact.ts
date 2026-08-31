"use server";

import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  buildMailto,
  contactSchema,
  fieldErrorsFromIssues,
  type ContactFormState,
} from "@/lib/contact-schema";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    const requestHeaders = await headers();
    // x-real-ip is calculated by Vercel's proxy and not client-controllable;
    // x-forwarded-for can have client-supplied entries prepended, so it's
    // only a fallback for local dev / non-Vercel environments.
    const ip =
      requestHeaders.get("x-real-ip") ??
      requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const { limited } = checkRateLimit(`contact:${ip}`);
    if (limited) {
      return { status: "error", errorCode: "rateLimited" };
    }

    const parsed = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      hp_field: formData.get("hp_field"),
    });

    if (!parsed.success) {
      // A filled honeypot fails validation (hp_field must be empty). Only
      // fake a bot-facing success when hp_field is the SOLE problem — if a
      // real field also failed, a legitimate visitor still needs to see
      // that error rather than a false "success".
      const failedFields = new Set(parsed.error.issues.map((i) => i.path[0]));
      const isHoneypotOnlyTrip =
        failedFields.has("hp_field") && failedFields.size === 1;
      if (isHoneypotOnlyTrip) {
        return { status: "success" };
      }
      return {
        status: "error",
        errorCode: "invalidSubmission",
        fieldErrors: fieldErrorsFromIssues(parsed.error.issues),
      };
    }

    const { name, email, message } = parsed.data;
    return { status: "success", mailto: buildMailto(name, email, message) };
  } catch (error) {
    console.error("submitContactForm failed:", error);
    return { status: "error", errorCode: "unknown" };
  }
}
