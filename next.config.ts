import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera un sitio 100% estático en out/, que Cloudflare sirve como assets.
  // El formulario de contacto vive aparte, en el Worker (worker/index.ts).
  output: "export",
  images: {
    // La optimización de imágenes necesita un servidor; exporta las
    // imágenes ya optimizadas (ver README → Imágenes).
    unoptimized: true,
  },
};

export default nextConfig;
