import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail, type Attachment } from "@/lib/email";
import { contactSchema, validateAttachment } from "@/lib/validations/contact";

// Nodemailer necesita el runtime de Node (no Edge).
export const runtime = "nodejs";

/**
 * Límite básico por IP: 5 envíos cada 10 minutos. Vive en memoria de la
 * instancia, así que en Vercel es "best effort" (cada instancia tiene su
 * propio contador). Para algo más estricto usa Vercel KV / Upstash.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Espera unos minutos o escríbenos por correo." },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: si un bot llenó el campo oculto, respondemos OK sin enviar nada.
  if (formData.get("company")) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Revisa los campos marcados.",
        fields: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  let attachment: Attachment | undefined;
  const file = formData.get("attachment");
  if (file instanceof File && file.size > 0) {
    const fileError = validateAttachment(file);
    if (fileError) {
      return NextResponse.json(
        { ok: false, error: fileError, fields: { attachment: [fileError] } },
        { status: 422 },
      );
    }
    attachment = {
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    };
  }

  try {
    await sendContactEmail(parsed.data, attachment);
  } catch (error) {
    console.error("[contact] Error al enviar correo:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo por correo.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
