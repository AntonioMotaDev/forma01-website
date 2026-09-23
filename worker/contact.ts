import { z } from "zod";
import { contactSchema, validateAttachment } from "../lib/validations/contact";
import { sendContactEmail, type Attachment } from "./email";
import type { Env } from "./env";

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function handleContact(request: Request, env: Env) {
  // Límite por IP (configurado en wrangler.jsonc → ratelimits).
  const ip = request.headers.get("CF-Connecting-IP") ?? "local";
  const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: `contact:${ip}` });
  if (!success) {
    return json({ ok: false, error: "Demasiados intentos. Espera un minuto o escríbenos por correo." }, 429);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, error: "Solicitud inválida." }, 400);
  }

  // Honeypot: si un bot llenó el campo oculto, respondemos OK sin enviar nada.
  if (formData.get("company")) {
    return json({ ok: true });
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return json(
      { ok: false, error: "Revisa los campos marcados.", fields: z.flattenError(parsed.error).fieldErrors },
      422,
    );
  }

  let attachment: Attachment | undefined;
  const file = formData.get("attachment");
  if (file instanceof File && file.size > 0) {
    const fileError = validateAttachment(file);
    if (fileError) {
      return json({ ok: false, error: fileError, fields: { attachment: [fileError] } }, 422);
    }
    attachment = { filename: file.name, content: new Uint8Array(await file.arrayBuffer()) };
  }

  try {
    await sendContactEmail(env, parsed.data, attachment);
  } catch (error) {
    console.error("[contact] Error al enviar correo:", error);
    return json(
      { ok: false, error: "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo por correo." },
      500,
    );
  }

  return json({ ok: true });
}
