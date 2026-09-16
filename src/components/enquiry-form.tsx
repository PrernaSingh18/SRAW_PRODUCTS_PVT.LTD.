"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
};

type Props = {
  dict: Dictionary;
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  footer?: string;
};

export function EnquiryForm({
  dict,
  fields,
  submitLabel,
  successTitle,
  successBody,
  footer,
}: Props) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-card border border-line bg-sand p-10 text-center">
        <h3 className="font-display text-xl font-semibold">{successTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">{successBody}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-lg border border-ink px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
        >
          {dict.common.sendAnother}
        </button>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-ink";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-card border border-line bg-white p-7 sm:grid-cols-2"
    >
      {fields.map((field) => (
        <div key={field.name} className={field.full ? "sm:col-span-2" : undefined}>
          <label htmlFor={field.name} className="text-sm font-medium">
            {field.label}
            {field.required ? <span className="text-brand"> *</span> : null}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              rows={5}
              placeholder={field.placeholder}
              className={inputClass}
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                {dict.common.selectOption}
              </option>
              {field.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
              className={inputClass}
            />
          )}
        </div>
      ))}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:w-auto"
        >
          {submitLabel}
        </button>
        {footer ? <p className="mt-4 text-xs text-muted">{footer}</p> : null}
      </div>
    </form>
  );
}
