import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// Se genera en build (output: "export").
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
