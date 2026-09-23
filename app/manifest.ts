import type { MetadataRoute } from "next";
import { COLORS, SITE } from "@/lib/constants";

// Se genera en build (output: "export").
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "browser",
    background_color: COLORS.linen,
    theme_color: COLORS.carbon,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
