"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { ARTWORK_MAX_BYTES, ARTWORK_MAX_FILES, ARTWORK_TYPES } from "@/lib/validation";
import { IconCheck, IconUpload } from "./icons";

type Base = { label: ReactNode; name: string; hint?: ReactNode; error?: string; optional?: boolean };

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function LabelText({ label, optional }: { label: ReactNode; optional?: boolean }) {
  return (
    <>
      {label}
      {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
    </>
  );
}

function Messages({ id, hint, error }: { id: string; hint?: ReactNode; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </>
  );
}

export function TextField({ label, name, hint, error, optional, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        <LabelText label={label} optional={optional} />
      </label>
      <input
        id={id}
        name={name}
        className="field"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        required={!optional}
        {...rest}
      />
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

export function TextArea({ label, name, hint, error, optional, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        <LabelText label={label} optional={optional} />
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        className="field"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        required={!optional}
        {...rest}
      />
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  hint,
  error,
  optional,
  options,
  placeholder,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[]; placeholder?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        <LabelText label={label} optional={optional} />
      </label>
      <select
        id={id}
        name={name}
        className="field"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        required={!optional}
        {...rest}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

export function Checkbox({
  name,
  children,
  error,
  ...rest
}: { name: string; children: ReactNode; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          name={name}
          className="mt-1 size-5 shrink-0 accent-navy"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="field-error ml-8">
          {error}
        </p>
      )}
    </div>
  );
}

/** Phone input with Bangladesh mobile formatting guidance (blueprint §8 step 7). */
export function PhoneField({ error, defaultValue }: { error?: string; defaultValue?: string }) {
  return (
    <TextField
      label="Mobile number"
      name="phone"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="01XXXXXXXXX"
      hint="Bangladeshi mobile, e.g. 01712345678 or +8801712345678"
      pattern="^(\+?880|0)?[\s-]?1[3-9][\d\s-]{8,12}$"
      error={error}
      defaultValue={defaultValue}
    />
  );
}

/**
 * Artwork upload with client-side checks. The server re-validates type, size
 * and file signature (see lib/server/store.ts).
 */
export function FileUploader({ error, label = "Upload your logo / artwork" }: { error?: string; label?: string }) {
  const id = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [localError, setLocalError] = useState<string>();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? []);
    let problem: string | undefined;
    if (list.length > ARTWORK_MAX_FILES) problem = `Please choose up to ${ARTWORK_MAX_FILES} files.`;
    for (const f of list) {
      const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
      if (!ARTWORK_TYPES.includes(ext)) problem = `${f.name}: this file type isn’t accepted.`;
      else if (f.size > ARTWORK_MAX_BYTES) problem = `${f.name}: larger than 15 MB.`;
    }
    setLocalError(problem);
    if (problem) {
      e.target.value = "";
      setFiles([]);
    } else {
      setFiles(list);
    }
  }

  const shownError = localError ?? error;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} <span className="font-normal text-muted">(optional)</span>
      </label>
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-none border-2 border-dashed border-[#c9ceda] bg-white p-6 text-center hover:border-navy focus-within:border-navy"
      >
        <IconUpload width={28} height={28} className="text-navy" />
        <span className="font-semibold text-navy">Choose files</span>
        <span className="text-sm text-muted">AI, EPS, SVG, PDF, PNG or JPG · up to {ARTWORK_MAX_FILES} files · 15 MB each</span>
        <input
          id={id}
          type="file"
          name="artwork"
          multiple
          accept={ARTWORK_TYPES.join(",")}
          onChange={onChange}
          className="sr-only"
          aria-describedby={`${id}-hint${shownError ? ` ${id}-error` : ""}`}
        />
      </label>
      <p id={`${id}-hint`} className="field-hint">
        Vector files (AI, EPS, SVG, PDF) give the best production quality. Our team may ask for a production-ready
        file before manufacturing.
      </p>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm" aria-live="polite">
          {files.map((f) => (
            <li key={f.name} className="flex items-center gap-2">
              <IconCheck className="text-success" width={16} height={16} />
              {f.name} <span className="text-muted">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
            </li>
          ))}
        </ul>
      )}
      {shownError && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {shownError}
        </p>
      )}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-none border border-error/40 bg-[#fdf0ef] px-4 py-3 font-semibold text-error">
      {message}
    </div>
  );
}

/** Honeypot field for basic bot filtering. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
