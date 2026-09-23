import type { ContactInput } from "../lib/validations/contact";
import type { Env } from "./env";

export type Attachment = { filename: string; content: Uint8Array };

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

/**
 * workerd implementa Uint8Array.prototype.toBase64 de forma nativa (~2 ms
 * para 4 MB). La versión en JS tarda ~300 ms de CPU y rebasaría el límite
 * del plan gratis, así que solo queda como respaldo.
 */
function toBase64(bytes: Uint8Array) {
  const native = (bytes as Uint8Array & { toBase64?: () => string }).toBase64;
  if (native) return native.call(bytes);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/**
 * Envía el mensaje del formulario con la API de Resend.
 * https://resend.com/docs/api-reference/emails/send-email
 */
export async function sendContactEmail(env: Env, data: ContactInput, attachment?: Attachment) {
  if (!env.RESEND_API_KEY) throw new Error("Falta el secreto RESEND_API_KEY.");

  const rows: [string, string][] = [
    ["Nombre", escapeHtml(data.name)],
    ["Correo", `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`],
    ["Asunto", escapeHtml(data.subject)],
    ...(attachment ? [["Adjunto", escapeHtml(attachment.filename)] as [string, string]] : []),
  ];

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#15191C;max-width:560px">
      <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#315A70;margin:0 0 16px">
        Nuevo mensaje · FORMA/01
      </p>
      <table style="font-size:14px;border-collapse:collapse;margin-bottom:20px">
        ${rows.map(([label, value]) => `<tr><td style="padding:4px 16px 4px 0;color:#6b7075">${label}</td><td>${value}</td></tr>`).join("")}
      </table>
      <div style="font-size:15px;line-height:1.6;white-space:pre-wrap;border-top:1px solid #e3dfd4;padding-top:16px">${escapeHtml(data.message)}</div>
    </div>`;

  const text = [
    `Nombre: ${data.name}`,
    `Correo: ${data.email}`,
    `Asunto: ${data.subject}`,
    ...(attachment ? [`Adjunto: ${attachment.filename}`] : []),
    "",
    data.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: `${data.name.replaceAll(/["<>]/g, "")} <${data.email}>`,
      subject: `[FORMA/01] ${data.subject} — ${data.name}`,
      html,
      text,
      ...(attachment && {
        attachments: [{ filename: attachment.filename, content: toBase64(attachment.content) }],
      }),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend respondió ${response.status}: ${await response.text()}`);
  }
}
