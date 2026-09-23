"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { ATTACHMENT, SUBJECT_OPTIONS, contactSchema, validateAttachment } from "@/lib/validations/contact";
import { Button } from "./ui/Button";

const formSchema = contactSchema.extend({
  attachment: z
    .custom<File>((value) => value === undefined || value instanceof File)
    .optional()
    .superRefine((file, ctx) => {
      const error = file && validateAttachment(file);
      if (error) ctx.addIssue({ code: "custom", message: error });
    }),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;
type Status = { state: "idle" } | { state: "success" } | { state: "error"; message: string };

const fieldClasses =
  "w-full rounded-none border border-line-strong bg-bg-elevated px-4 py-3 text-base text-fg placeholder:text-fg-subtle transition-colors duration-200 hover:border-fg-muted focus:border-fg focus:outline-none aria-[invalid=true]:border-danger";

export function ContactForm() {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    // "" muestra el placeholder del select; el esquema lo rechaza al enviar.
    defaultValues: { name: "", email: "", subject: "" as FormInput["subject"], message: "", company: "" },
  });

  async function onSubmit(values: FormOutput) {
    setStatus({ state: "idle" });
    const body = new FormData();
    body.set("name", values.name);
    body.set("email", values.email);
    body.set("subject", values.subject);
    body.set("message", values.message);
    body.set("company", values.company ?? "");
    if (values.attachment) body.set("attachment", values.attachment);

    try {
      const response = await fetch("/api/contact", { method: "POST", body });
      const result = (await response.json().catch(() => null)) as {
        ok: boolean;
        error?: string;
        fields?: Partial<Record<keyof FormInput, string[]>>;
      } | null;

      if (!response.ok || !result?.ok) {
        for (const [field, messages] of Object.entries(result?.fields ?? {})) {
          if (messages?.[0]) setError(field as keyof FormInput, { message: messages[0] });
        }
        setStatus({
          state: "error",
          message: result?.error ?? "No pudimos enviar tu mensaje. Intenta de nuevo en un momento.",
        });
        return;
      }

      // El formulario se desmonta al mostrar el éxito; al volver, el input
      // de archivo se monta vacío.
      reset();
      setStatus({ state: "success" });
    } catch {
      setStatus({
        state: "error",
        message: "Parece que no hay conexión. Revisa tu internet e intenta de nuevo.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="animate-fade-up border border-line bg-bg-elevated p-8 sm:p-10">
        <p className="eyebrow text-success">Mensaje enviado</p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">Gracias, ya lo tenemos.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-fg-muted">
          {CONTACT.responseTime} Si es urgente, también puedes escribirnos directo a{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-fg underline underline-offset-4">
            {CONTACT.email}
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus({ state: "idle" })}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  const fieldId = (name: string) => `${id}-${name}`;
  const errorId = (name: string) => `${id}-${name}-error`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <Field label="Nombre" htmlFor={fieldId("name")} error={errors.name?.message} errorId={errorId("name")}>
        <input
          id={fieldId("name")}
          type="text"
          autoComplete="name"
          placeholder="¿Cómo te llamas?"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? errorId("name") : undefined}
          className={fieldClasses}
          {...register("name")}
        />
      </Field>

      <Field
        label="Correo"
        htmlFor={fieldId("email")}
        error={errors.email?.message}
        errorId={errorId("email")}
      >
        <input
          id={fieldId("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="tu@correo.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? errorId("email") : undefined}
          className={fieldClasses}
          {...register("email")}
        />
      </Field>

      <Field
        label="Asunto"
        htmlFor={fieldId("subject")}
        error={errors.subject?.message}
        errorId={errorId("subject")}
        className="sm:col-span-2"
      >
        <div className="relative">
          <select
            id={fieldId("subject")}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? errorId("subject") : undefined}
            className={cn(fieldClasses, "appearance-none pr-10")}
            {...register("subject")}
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 12 12"
            className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-fg-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M2 4.5 6 8.5l4-4" />
          </svg>
        </div>
      </Field>

      <Field
        label="Mensaje"
        htmlFor={fieldId("message")}
        error={errors.message?.message}
        errorId={errorId("message")}
        className="sm:col-span-2"
      >
        <textarea
          id={fieldId("message")}
          rows={6}
          placeholder="Cuéntanos sobre tu negocio, qué necesitas y, si lo tienes, un rango de presupuesto o fecha."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={cn(fieldClasses, "resize-y")}
          {...register("message")}
        />
      </Field>

      <Controller
        control={control}
        name="attachment"
        render={({ field }) => (
          <Field
            label="Brief o documento (opcional)"
            htmlFor={fieldId("attachment")}
            error={errors.attachment?.message}
            errorId={errorId("attachment")}
            className="sm:col-span-2"
          >
            <div
              className={cn(
                "flex flex-col gap-3 border border-dashed px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
                errors.attachment ? "border-danger" : "border-line-strong",
              )}
            >
              {field.value ? (
                <p className="min-w-0 truncate text-sm">
                  <span className="font-mono text-xs text-fg-subtle">Adjunto · </span>
                  {field.value.name}
                </p>
              ) : (
                <p className="text-sm text-fg-muted">
                  PDF, Word, PowerPoint, Excel, imagen o ZIP. Máximo {ATTACHMENT.maxLabel}.
                </p>
              )}
              <div className="flex shrink-0 gap-2">
                {field.value && (
                  <button
                    type="button"
                    className="h-9 px-3 text-sm text-fg-muted underline-offset-4 hover:text-fg hover:underline"
                    onClick={() => {
                      field.onChange(undefined);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    Quitar
                  </button>
                )}
                <label
                  htmlFor={fieldId("attachment")}
                  className="inline-flex h-9 cursor-pointer items-center border border-line-strong px-4 text-sm transition-colors hover:border-fg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-bronze"
                >
                  {field.value ? "Cambiar archivo" : "Elegir archivo"}
                  <input
                    ref={fileInputRef}
                    id={fieldId("attachment")}
                    type="file"
                    accept={ATTACHMENT.accept}
                    className="sr-only"
                    aria-describedby={errors.attachment ? errorId("attachment") : undefined}
                    onBlur={field.onBlur}
                    onChange={(event) => field.onChange(event.target.files?.[0] ?? undefined)}
                  />
                </label>
              </div>
            </div>
          </Field>
        )}
      />

      {/* Honeypot: invisible para personas, tentador para bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("company")}>No llenes este campo</label>
        <input
          id={fieldId("company")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-subtle">{CONTACT.responseTime}</p>
        <Button type="submit" size="lg" arrow disabled={isSubmitting} className="sm:min-w-52">
          {isSubmitting ? "Enviando…" : "Enviar mensaje"}
        </Button>
      </div>

      {status.state === "error" && (
        <p role="alert" className="border-l-2 border-danger pl-4 text-sm text-danger sm:col-span-2">
          {status.message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
