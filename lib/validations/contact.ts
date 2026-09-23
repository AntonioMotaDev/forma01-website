import { z } from "zod";

/**
 * Esquema compartido entre el formulario (cliente) y la API (servidor).
 * Los adjuntos se validan aparte porque en el cliente son FileList y en
 * el servidor son File.
 */

export const SUBJECT_OPTIONS = [
  "Proyecto nuevo",
  "Cotización",
  "Estrategia / consultoría",
  "Sistema o automatización",
  "Otro",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(120, "El nombre es demasiado largo."),
  email: z
    .string()
    .trim()
    .max(200, "El correo es demasiado largo.")
    .pipe(z.email("Revisa tu correo, parece incompleto.")),
  subject: z.enum(SUBJECT_OPTIONS, { error: "Elige un asunto." }),
  message: z
    .string()
    .trim()
    .min(20, "Cuéntanos un poco más (mínimo 20 caracteres).")
    .max(5000, "El mensaje es demasiado largo (máximo 5000 caracteres)."),
  /** Honeypot anti-spam: debe llegar vacío. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Vercel limita el cuerpo de una función a ~4.5 MB, así que el adjunto
 * se mantiene por debajo de eso. Para archivos más grandes, pide un link
 * (Drive, WeTransfer) en el mensaje.
 */
export const ATTACHMENT = {
  maxBytes: 4 * 1024 * 1024,
  maxLabel: "4 MB",
  accept: ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.png,.jpg,.jpeg,.zip",
  mimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "image/png",
    "image/jpeg",
    "application/zip",
    "application/x-zip-compressed",
  ],
} as const;

export function validateAttachment(file: { size: number; type: string; name: string }) {
  if (file.size > ATTACHMENT.maxBytes) {
    return `El archivo pesa más de ${ATTACHMENT.maxLabel}. Compártelo con un link en el mensaje.`;
  }
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const allowedExtensions = ATTACHMENT.accept.replaceAll(".", "").split(",");
  const typeOk =
    (ATTACHMENT.mimeTypes as readonly string[]).includes(file.type) ||
    // Algunos navegadores reportan type vacío para .docx/.zip
    (file.type === "" && allowedExtensions.includes(extension));
  if (!typeOk || !allowedExtensions.includes(extension)) {
    return "Formato no permitido. Usa PDF, Word, PowerPoint, Excel, imagen, TXT o ZIP.";
  }
  return null;
}
