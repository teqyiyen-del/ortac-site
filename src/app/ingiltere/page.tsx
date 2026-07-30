import CountryPage, { generateMetadata as meta } from "@/app/ulke/[slug]/page";

/* URL mimarisi SABİT (brief §5): ülke sayfası /ingiltere adresinde yaşıyor.
   İçerik bileşeni şimdilik eski konumdan geliyor; brief'in tam /dubai
   iskeleti bir sonraki turda buraya taşınacak. */
const params = Promise.resolve({ slug: "ingiltere" });

export const generateMetadata = () => meta({ params });

export default function Page() {
  return CountryPage({ params });
}
