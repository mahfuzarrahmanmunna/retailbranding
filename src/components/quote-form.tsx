"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitQuote, type FormState } from "@/app/actions";
import { track } from "@/lib/cart";
import { districts, solutions } from "@/lib/catalog";
import type { SignConfig } from "@/lib/pricing";
import { Checkbox, FileUploader, FormError, Honeypot, PhoneField, SelectField, TextArea, TextField } from "./form";
import { IconBadgeCheck } from "./icons";

const initial: FormState = { status: "idle" };

export function QuoteForm({
  kind,
  config,
  showSite = true,
  showProject = false,
  showArtwork = true,
  submitLabel = "Submit Quote Request",
}: {
  kind: "product" | "custom" | "project";
  config?: SignConfig;
  showSite?: boolean;
  showProject?: boolean;
  showArtwork?: boolean;
  submitLabel?: string;
}) {
  const [state, action, pending] = useActionState(submitQuote, initial);
  const successRef = useRef<HTMLDivElement>(null);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status === "success") {
      track("request_quote", { kind, product: config?.productSlug });
      successRef.current?.focus();
    }
  }, [state.status, kind, config?.productSlug]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="card border-success/40 p-6 md:p-8">
        <IconBadgeCheck width={40} height={40} className="text-success" />
        <h2 className="mt-3 text-2xl">Thank you — your request has been received</h2>
        <p lang="bn" className="mt-1 font-semibold text-muted">
          আমাদের টিম আপনার সাথে যোগাযোগ করবে
        </p>
        <p className="mt-4">
          Your reference number is <strong className="text-navy">{state.reference}</strong>. Please keep it for any
          follow-up.
        </p>
        <h3 className="mt-6 text-lg">What happens next</h3>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-muted">
          <li>Our team reviews your specification and artwork.</li>
          <li>We contact you if we need more information or a site visit.</li>
          <li>You receive a formal quotation with scope, exclusions and validity.</li>
          <li>Production starts only after you approve the quotation and artwork proof.</li>
        </ol>
        <Link href="#" className="btn btn-outline mt-6">
          Continue browsing
        </Link>
      </div>
    );
  }

  return (
    <form key={v.__attempt ?? "initial"} action={action} className="relative space-y-6" noValidate>
      <Honeypot />
      <input type="hidden" name="kind" value={kind} />
      {config && <input type="hidden" name="config" value={JSON.stringify(config)} />}

      <FormError message={state.status === "error" ? (state.message ?? "Please check the highlighted fields.") : undefined} />

      <fieldset className="space-y-4">
        <legend className="mb-2 text-xl font-extrabold text-navy">Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Your name" name="name" autoComplete="name" error={e.name} defaultValue={v.name} />
          <PhoneField error={e.phone} defaultValue={v.phone} />
          <TextField label="Email" name="email" type="email" autoComplete="email" optional error={e.email} defaultValue={v.email} />
          <TextField label="Company / shop name" name="company" autoComplete="organization" optional error={e.company} defaultValue={v.company} />
        </div>
      </fieldset>

      {showProject && (
        <fieldset className="space-y-4">
          <legend className="mb-2 text-xl font-extrabold text-navy">Project scope</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Industry"
              name="industry"
              optional
              placeholder="Select industry"
              options={[...solutions.map((s) => ({ value: s.name, label: s.name })), { value: "Other", label: "Other" }]}
              defaultValue={v.industry}
            />
            <TextField label="Number of outlets / locations" name="outlets" type="number" min={1} max={1000} inputMode="numeric" optional error={e.outlets} defaultValue={v.outlets} />
            <SelectField
              label="Approximate budget"
              name="budget"
              optional
              placeholder="Prefer not to say"
              options={["Under ৳ 50,000", "৳ 50,000 – 2,00,000", "৳ 2,00,000 – 10,00,000", "Above ৳ 10,00,000"].map((b) => ({ value: b, label: b }))}
              defaultValue={v.budget}
            />
            <TextField label="Target date" name="deadline" type="date" optional defaultValue={v.deadline} />
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-4">
        <legend className="mb-2 text-xl font-extrabold text-navy">{showSite ? "Installation / delivery location" : "Location"}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="District"
            name="district"
            placeholder="Select district"
            options={districts.map((d) => ({ value: d, label: d }))}
            error={e.district}
            defaultValue={v.district}
          />
          <TextField label="Upazila / area" name="area" optional error={e.area} defaultValue={v.area} />
        </div>
        <TextField label="Address" name="address" autoComplete="street-address" optional error={e.address} defaultValue={v.address} />
        {showSite && (
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Wall / mounting surface"
              name="wallType"
              optional
              placeholder="Not sure"
              options={["Brick / concrete", "Glass", "Metal structure", "Gypsum / board", "Existing signboard frame", "Other"].map((w) => ({ value: w, label: w }))}
              defaultValue={v.wallType}
            />
            <TextField label="Floor / height of sign" name="floor" placeholder="e.g. Ground floor, 12 ft above street" optional defaultValue={v.floor} />
            <SelectField
              label="Power available near sign?"
              name="power"
              optional
              placeholder="Not sure"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unsure", label: "Not sure" },
              ]}
              defaultValue={v.power}
            />
            {!showProject && <TextField label="Needed by" name="deadline" type="date" optional defaultValue={v.deadline} />}
            <div className="sm:col-span-2">
              <TextField label="Access constraints" name="access" placeholder="e.g. narrow lane, mall hours only, needs scaffolding" optional defaultValue={v.access} />
            </div>
          </div>
        )}
        <Checkbox name="siteSurvey" defaultChecked={v.siteSurvey === "on"}>
          I&apos;d like a site survey / consultation
        </Checkbox>
      </fieldset>

      {showArtwork && <FileUploader error={e.artwork} />}

      <TextArea
        label={showProject ? "Describe your project" : "Anything else we should know?"}
        name="message"
        optional
        placeholder={showProject ? "Locations, sign types, brand guidelines, deadlines…" : "Colours, references, questions…"}
        defaultValue={v.message}
        error={e.message}
      />

      <Checkbox name="consent" error={e.consent} defaultChecked={v.consent === "on"}>
        I agree that Retail Branding may contact me by phone, SMS or WhatsApp about this request, and store my details
        and files as described in the <Link href="#" className="font-semibold text-navy underline">privacy notice</Link>.
      </Checkbox>

      <button type="submit" className="btn btn-primary w-full text-[17px] sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
