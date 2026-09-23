import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { COLORS, SITE } from "./constants";

export const OG_SIZE = { width: 1200, height: 630 };

const fontPath = (weight: 400 | 600) =>
  join(
    process.cwd(),
    `node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-${weight}-normal.woff`,
  );

/**
 * Plantilla de imagen Open Graph con la identidad de FORMA/01.
 * Se usa en app/opengraph-image.tsx y en cada caso de estudio.
 */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [regular, semibold] = await Promise.all([readFile(fontPath(400)), readFile(fontPath(600))]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: COLORS.carbon,
        backgroundImage: `linear-gradient(to right, rgba(242,239,231,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,239,231,0.05) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        color: COLORS.linen,
        fontFamily: "Plex",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>
          FORMA<span style={{ color: COLORS.bronze }}>/01</span>
        </div>
        <div style={{ fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.55 }}>
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: title.length > 48 ? 64 : 80,
          fontWeight: 600,
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          opacity: 0.6,
          borderTop: "1px solid rgba(242,239,231,0.15)",
          paddingTop: 28,
        }}
      >
        <span>{SITE.services.join(" · ")}</span>
        <span>forma01.net</span>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Plex", data: regular, weight: 400, style: "normal" },
        { name: "Plex", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
