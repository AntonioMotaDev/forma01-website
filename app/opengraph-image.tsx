import { renderOgImage, OG_SIZE } from "@/lib/og";
import { SITE } from "@/lib/constants";

// Se genera en build (output: "export").
export const dynamic = "force-static";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ eyebrow: "Estudio independiente", title: SITE.tagline });
}
