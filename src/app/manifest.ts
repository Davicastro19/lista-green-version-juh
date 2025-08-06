import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ListaGreen",
    short_name: "ListaGreen",
    description: "Semeando conexões para um mundo mais verde.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/images/favicon-32x32.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/images/favicon-32x32.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/images/favicon-32x32.png",
        sizes: "144x144",
        type: "image/png",
      },
    ],
    orientation: "portrait",
  };
}
