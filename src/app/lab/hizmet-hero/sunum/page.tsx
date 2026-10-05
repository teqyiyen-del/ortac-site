import type { Metadata } from "next";
import CountryPage from "@/app/ulke/[slug]/page";
import { HizmetS6Sunum } from "@/components/lab/HizmetHeroAdaylari";

/* LAB · /lab/hizmet-hero/sunum — MÜŞTERİ SUNUMU (05.10.2026).
   Burak: "S6 iyidir, onu bana müşteriye gösterebileceğim şekilde sunsana."
   Gerçek Dubai sayfasının TAMAMI, yalnız girişi S6. Canlı koda dokunulmadı:
   ülke sayfası olduğu gibi basılıyor, eski siyah giriş (.ph) bu sayfada CSS
   ile gizli (css/lab-hizmet-hero.css · .lhz-sunum), yerinde S6 duruyor.
   Lab şeridi gizli, menü açık zeminde koyu yazıyla. Arama motoruna kapalı
   (lab/layout.tsx · noindex). Aday canlıya alınınca bu sayfa silinir. */
export const metadata: Metadata = { title: "Dubai'de şirket kurmak · yeni giriş | Ortac Global" };

export default async function Sunum() {
  const sayfa = await CountryPage({ params: Promise.resolve({ slug: "dubai" }) });
  return (
    <div className="lhz-sayfa lhz-sunum">
      <HizmetS6Sunum />
      {sayfa}
    </div>
  );
}
