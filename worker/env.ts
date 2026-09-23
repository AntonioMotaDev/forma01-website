/** Bindings y variables del Worker (ver wrangler.jsonc y .dev.vars.example). */
export interface Env {
  /** Archivos estáticos generados por `next build` en out/. */
  ASSETS: Fetcher;
  /** Límite de envíos por IP (binding `ratelimits` en wrangler.jsonc). */
  CONTACT_RATE_LIMITER: RateLimit;
  /** Secreto: `npx wrangler secret put RESEND_API_KEY`. */
  RESEND_API_KEY: string;
  /** Dónde llegan los mensajes. */
  CONTACT_TO_EMAIL: string;
  /** Remitente verificado en Resend, ej. "FORMA/01 <contacto@forma01.net>". */
  CONTACT_FROM_EMAIL: string;
}
