import "server-only";
import nodemailer from "nodemailer";
import { CONTACT, SITE } from "./constants";
import type { ContactInput } from "./validations/contact";

/**
 * Configuración SMTP (ver .env.example). Con Gmail:
 *   SMTP_HOST=smtp.gmail.com  SMTP_PORT=465
 *   SMTP_USER=dev.antoniomota@gmail.com
 *   SMTP_PASS=<contraseña de aplicación de 16 caracteres>
 */
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Faltan variables SMTP_HOST, SMTP_USER o SMTP_PASS.");
  }
  const port = Number(SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export type Attachment = { filename: string; content: Buffer; contentType?: string };

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function sendContactEmail(data: ContactInput, attachment?: Attachment) {
  const to = process.env.CONTACT_TO_EMAIL ?? CONTACT.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER!;

  const text = [
    `Nombre: ${data.name}`,
    `Correo: ${data.email}`,
    `Asunto: ${data.subject}`,
    attachment ? `Adjunto: ${attachment.filename}` : null,
    "",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#15191C;max-width:560px">
      <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#315A70;margin:0 0 16px">
        Nuevo mensaje · ${escapeHtml(SITE.name)}
      </p>
      <table style="font-size:14px;border-collapse:collapse;margin-bottom:20px">
        <tr><td style="padding:4px 16px 4px 0;color:#6b7075">Nombre</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6b7075">Correo</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6b7075">Asunto</td><td>${escapeHtml(data.subject)}</td></tr>
        ${attachment ? `<tr><td style="padding:4px 16px 4px 0;color:#6b7075">Adjunto</td><td>${escapeHtml(attachment.filename)}</td></tr>` : ""}
      </table>
      <div style="font-size:15px;line-height:1.6;white-space:pre-wrap;border-top:1px solid #e3dfd4;padding-top:16px">${escapeHtml(data.message)}</div>
    </div>`;

  await getTransport().sendMail({
    from: `"${SITE.name} · Sitio web" <${from}>`,
    to,
    replyTo: `"${data.name.replaceAll('"', "")}" <${data.email}>`,
    subject: `[${SITE.name}] ${data.subject} — ${data.name}`,
    text,
    html,
    attachments: attachment ? [attachment] : undefined,
  });
}
