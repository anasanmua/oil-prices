import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oil Prices",
    id: "/",
    short_name: "OilPrices",
    description: "Seguimiento de precios del aceite de oliva",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#166534",
    icons: [
      {
        src: "/buho.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/play_store_512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}