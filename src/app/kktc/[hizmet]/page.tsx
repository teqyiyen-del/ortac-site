import ServicePage, { generateMetadata as meta } from "@/app/ulke/[slug]/[hizmet]/page";
import { servicesFor } from "@/lib/services";

/* URL mimarisi SABİT (brief §5): hizmet sayfası ülkenin altında yaşıyor.
   Gövde tek yerde duruyor; burası yalnızca kktc slug'ını sabitliyor. */
type Params = Promise<{ hizmet: string }>;

const withSlug = async (params: Params) => {
  const { hizmet } = await params;
  return { slug: "kktc", hizmet };
};

export function generateStaticParams() {
  return servicesFor("kktc").map((s) => ({ hizmet: s.slug }));
}

export const generateMetadata = ({ params }: { params: Params }) =>
  meta({ params: withSlug(params) });

export default function Page({ params }: { params: Params }) {
  return ServicePage({ params: withSlug(params) });
}
