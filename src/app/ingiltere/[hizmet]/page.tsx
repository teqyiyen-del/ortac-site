import ServicePage, { generateMetadata as meta } from "@/app/ulke/[slug]/[hizmet]/page";
import { pagedServicesFor } from "@/lib/services";

/* URL mimarisi SABİT (brief §5): hizmet sayfası ülkenin altında yaşıyor.
   Gövde tek yerde duruyor; burası yalnızca ingiltere slug'ını sabitliyor. */
type Params = Promise<{ hizmet: string }>;

const withSlug = async (params: Params) => {
  const { hizmet } = await params;
  return { slug: "ingiltere", hizmet };
};

/* 08.10.2026 · /ingiltere/muhasebe ve /ingiltere/banka-hesabi'nin kendi
   klasörü var; aynı adresi bu şablon da üretirse üretimde şablon kazanıyor
   (app/dubai/[hizmet]'teki not). */
const KENDI_SAYFASI = new Set(["muhasebe", "banka-hesabi"]);

export function generateStaticParams() {
  return pagedServicesFor("ingiltere")
    .filter((s) => !KENDI_SAYFASI.has(s.slug))
    .map((s) => ({ hizmet: s.slug }));
}

export const generateMetadata = ({ params }: { params: Params }) =>
  meta({ params: withSlug(params) });

export default function Page({ params }: { params: Params }) {
  return ServicePage({ params: withSlug(params) });
}
