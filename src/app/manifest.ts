import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oil Prices",
    id: "/",
    short_name: "OilPrices",
    description: "Follow the oil prices in Spain",
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
        src: "/buho_512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}