"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { submitContactForm } from "@/app/actions/contact";
import { initialContactFormState, type ContactFormState } from "@/lib/contact-schema";
import { Button } from "./ui/button";

const fieldClasses =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  // Identity check, not a value check: `state` is a new object on every
  // dispatch, so this fires once per submission even if a user resubmits
  // identical field values (e.g. their mail client didn't visibly open the
  // first time). Comparing state.mailto by value would wrongly treat that
  // resubmission as a no-op.
  const lastHandledState = useRef<ContactFormState | null>(null);

  useEffect(() => {
    if (state.status === "success" && state.mailto && state !== lastHandledState.current) {
      lastHandledState.current = state;
      window.location.href = state.mailto;
    }
  }, [state]);

  const nameError = state.fieldErrors?.name;
  const emailError = state.fieldErrors?.email;
  const messageError = state.fieldErrors?.message;

  return (
    <form action={formAction} className="mt-10 grid max-w-xl gap-5" noValidate>
      <div className="grid gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          {t("nameLabel")}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
          aria-invalid={nameError ? "true" : undefined}
          aria-describedby={nameError ? "contact-name-error" : undefined}
          className={fieldClasses}
          placeholder={t("namePlaceholder")}
        />
        {nameError && (
          <p id="contact-name-error" className="text-sm text-error">
            {t(`errors.${nameError}`)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          {t("emailLabel")}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={emailError ? "true" : undefined}
          aria-describedby={emailError ? "contact-email-error" : undefined}
          className={fieldClasses}
          placeholder={t("emailPlaceholder")}
        />
        {emailError && (
          <p id="contact-email-error" className="text-sm text-error">
            {t(`errors.${emailError}`)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={2000}
          required
          aria-invalid={messageError ? "true" : undefined}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          className={`${fieldClasses} resize-y`}
          placeholder={t("messagePlaceholder")}
        />
        {messageError && (
          <p id="contact-message-error" className="text-sm text-error">
            {t(`errors.${messageError}`)}
          </p>
        )}
      </div>

      <input
        type="text"
        name="hp_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" disabled={pending}>
          <PaperPlaneTiltIcon size={16} weight="bold" />
          {pending ? t("submitting") : t("submit")}
        </Button>
        <p aria-live="polite" className="text-sm">
          {state.status === "success" && (
            <span className="text-success">{t("success")}</span>
          )}
          {state.status === "error" && state.errorCode === "rateLimited" && (
            <span className="text-error">{t("errors.rateLimited")}</span>
          )}
          {state.status === "error" && state.errorCode === "unknown" && (
            <span className="text-error">{t("errors.unknown")}</span>
          )}
        </p>
      </div>
    </form>
  );
}
