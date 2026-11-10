"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitContact, type FormState } from "@/app/actions";
import { Checkbox, FormError, Honeypot, PhoneField, TextArea, TextField } from "./form";

const initial: FormState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-none border border-success/40 bg-[#e7f4ed] p-6">
        <h2 className="text-xl">Message received</h2>
        <p className="mt-2">
          Reference <strong>{state.reference}</strong>. Our team will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form key={v.__attempt ?? "initial"} action={action} noValidate className="relative space-y-4">
      <Honeypot />
      <FormError message={state.status === "error" ? (state.message ?? "Please check the highlighted fields.") : undefined} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Your name" name="name" autoComplete="name" error={e.name} defaultValue={v.name} />
        <PhoneField error={e.phone} defaultValue={v.phone} />
      </div>
      <TextField label="Email" name="email" type="email" autoComplete="email" optional error={e.email} defaultValue={v.email} />
      <TextArea label="How can we help?" name="message" error={e.message} defaultValue={v.message} />
      <Checkbox name="consent" error={e.consent} defaultChecked={v.consent === "on"}>
        I agree to be contacted about my enquiry, as described in the{" "}
        <Link href="/policies/privacy" className="font-semibold text-navy underline">privacy notice</Link>.
      </Checkbox>
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
