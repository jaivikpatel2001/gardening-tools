"use client";

import { CheckCircle2, Info } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { env, formSubmitEndpoint } from "@/config/env";
import { site } from "@/config/site";
import { enquiryFields, enquiryForm } from "@/data/contact";
import { buildWhatsAppHref } from "@/lib/whatsapp";

/**
 * The enquiry form.
 *
 * Delivery goes through FormSubmit, a hosted forwarding service: the browser
 * posts the enquiry to its AJAX endpoint and it arrives as email at the address
 * behind NEXT_PUBLIC_FORMSUBMIT_EMAIL. No server, no SMTP credentials and no
 * route of our own, which is what keeps this a static site.
 *
 * Three outcomes, and each one tells the truth:
 *   sent      the service accepted it, so a success message is honest;
 *   failed    it left the browser and was refused, so the enquiry is offered
 *             back through email, phone and WhatsApp;
 *   unset     delivery is not configured, so the form says so rather than
 *             showing a success message for something that never went anywhere.
 *
 * Fields are declared in `data/contact.ts`, so the markup, the labels and the
 * layout stay put if delivery ever moves to a backend: only `onSubmit` changes.
 * Nothing about the destination is hardcoded here.
 */
type Status = "idle" | "sending" | "sent" | "failed" | "unconfigured";

export function EnquiryForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  const whatsappHref = env.whatsappNumber
    ? buildWhatsAppHref(env.whatsappNumber, site.whatsapp.defaultMessage)
    : null;

  /** The enquiry as plain text, used for the subject line and the mail fallback. */
  function compose(data: FormData) {
    const value = (name: string) => String(data.get(name) ?? "").trim();

    const lines = [
      ...enquiryFields.map((field) => `${field.label}: ${value(field.name)}`),
      `${enquiryForm.interestLabel}: ${value("interest")}`,
      "",
      value("message"),
    ];

    return {
      value,
      subject: `Enquiry from ${value("name") || "the website"}`,
      body: lines.join("\n"),
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const { value, subject, body } = compose(data);

    setMailtoHref(
      `${site.contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );

    if (!formSubmitEndpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");

    const payload: Record<string, string> = {
      ...Object.fromEntries(enquiryFields.map((field) => [field.label, value(field.name)])),
      [enquiryForm.interestLabel]: value("interest"),
      Message: value("message"),
      // FormSubmit's own fields: the subject of the email it sends, its table
      // layout, its spam honeypot, and its captcha, which has to be off for the
      // AJAX endpoint or it answers with a challenge page instead of JSON.
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _honey: String(data.get("_honey") ?? ""),
    };

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`FormSubmit responded ${response.status}`);

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("failed");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {enquiryFields.map((field) => {
          const id = `${formId}-${field.name}`;
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={id} className="font-body text-caption font-semibold text-ink">
                {field.label}
                {field.required ? (
                  <span aria-hidden="true" className="ml-1 text-brand">
                    *
                  </span>
                ) : (
                  <span className="ml-1 font-normal text-muted">(optional)</span>
                )}
              </label>
              <input
                id={id}
                name={field.name}
                type={field.type}
                required={field.required}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                className="min-h-11 rounded-sm border border-hairline-strong bg-surface px-3.5 font-body text-[0.9375rem] text-ink placeholder:text-muted"
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${formId}-interest`} className="font-body text-caption font-semibold text-ink">
          {enquiryForm.interestLabel}
        </label>
        <select
          id={`${formId}-interest`}
          name="interest"
          defaultValue=""
          className="min-h-11 rounded-sm border border-hairline-strong bg-surface px-3 font-body text-[0.9375rem] text-ink"
        >
          <option value="" disabled>
            {enquiryForm.interestPlaceholder}
          </option>
          {enquiryForm.interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${formId}-message`} className="font-body text-caption font-semibold text-ink">
          {enquiryForm.messageLabel}
          <span aria-hidden="true" className="ml-1 text-brand">
            *
          </span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          placeholder={enquiryForm.messagePlaceholder}
          className="rounded-sm border border-hairline-strong bg-surface px-3.5 py-3 font-body text-[0.9375rem] text-ink placeholder:text-muted"
        />
      </div>

      {/* FormSubmit's honeypot: hidden from people and from assistive
          technology, and left empty by everyone except a bot filling the form
          field by field. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <p className="text-caption text-muted">{enquiryForm.consentNote}</p>

      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" type="submit" disabled={sending} aria-busy={sending}>
          {sending ? enquiryForm.sendingLabel : enquiryForm.submitLabel}
          <ArrowIcon />
        </Button>
        <a
          href={site.contact.phoneHref}
          className="font-body text-[0.9375rem] font-semibold text-brand transition-colors duration-200 hover:text-brand-hover"
        >
          {site.contact.phone}
        </a>
      </div>

      <div role="status" aria-live="polite">
        {status === "sent" ? (
          <p className="flex items-start gap-3 rounded-lg border border-hairline bg-surface-soft p-5 text-body-sm text-body">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-brand"
              strokeWidth={1.8}
            />
            <span>
              <strong className="font-semibold text-ink">{enquiryForm.successTitle}.</strong>{" "}
              {enquiryForm.successNotice}
            </span>
          </p>
        ) : null}

        {status === "failed" || status === "unconfigured" ? (
          <div className="flex flex-col gap-4 rounded-lg border border-hairline bg-surface-soft p-5">
            <p className="flex items-start gap-3 text-body-sm text-body">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.8} />
              {status === "failed" ? enquiryForm.errorNotice : enquiryForm.unavailableNotice}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {mailtoHref ? <Button href={mailtoHref}>{enquiryForm.fallbackAction}</Button> : null}
              {whatsappHref ? (
                <Button href={whatsappHref} variant="secondary">
                  Send on WhatsApp
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
