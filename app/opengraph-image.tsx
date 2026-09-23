import { renderOgImage, OG_SIZE } from "@/lib/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ eyebrow: "Estudio independiente", title: SITE.tagline });
}
