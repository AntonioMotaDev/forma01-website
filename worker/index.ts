/**
 * Worker de Cloudflare: sirve el sitio estático (carpeta `out/`, generada por
 * `next build`) y atiende el único endpoint dinámico, POST /api/contact.
 *
 * Gracias a `run_worker_first: ["/api/*"]` en wrangler.jsonc, las páginas se
 * sirven directo como assets estáticos y solo /api/* ejecuta este código.
 */
import { handleContact } from "./contact";
import type { Env } from "./env";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      if (request.method !== "POST") {
        return Response.json(
          { ok: false, error: "Método no permitido." },
          { status: 405, headers: { Allow: "POST" } },
        );
      }
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
