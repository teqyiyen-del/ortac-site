import ServicePage, { generateMetadata as meta } from "@/app/ulke/[slug]/[hizmet]/page";
import { pagedServicesFor } from "@/lib/services";

/* URL mimarisi SABİT (brief §5): hizmet sayfası ülkenin altında yaşıyor.
   Gövde tek yerde duruyor; burası yalnızca kktc slug'ını sabitliyor. */
type Params = Promise<{ hizmet: string }>;

const withSlug = async (params: Params) => {
  const { hizmet } = await params;
  return { slug: "kktc", hizmet };
};

/* 07.10.2026 · /kktc/muhasebe ve /kktc/banka-hesabi'nin kendi klasörü var
   (Dubai'ninkilerle aynı bölümler). Bu şablon aynı adresi üretirse üretim
   derlemesinde ŞABLON KAZANIYOR (app/dubai/[hizmet]'teki not); o yüzden
   burada üretilmiyorlar. */
const KENDI_SAYFASI = new Set(["muhasebe", "banka-hesabi", "vergi", "kurumsal-danismanlik", "aml-uyum"]);

export function generateStaticParams() {
  return pagedServicesFor("kktc")
    .filter((s) => !KENDI_SAYFASI.has(s.slug))
    .map((s) => ({ hizmet: s.slug }));
}

export const generateMetadata = ({ params }: { params: Params }) =>
  meta({ params: withSlug(params) });

export default function Page({ params }: { params: Params }) {
  return ServicePage({ params: withSlug(params) });
}
