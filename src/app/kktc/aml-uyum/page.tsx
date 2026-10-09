import type { Metadata } from "next";
import AmlSayfa from "@/components/services/AmlSayfa";
import { AML_KKTC as A } from "@/lib/amlKktc";
import { sayfaKunye } from "@/lib/seo";

/* ============================================================================
   KKTC · AML VE MEVZUAT UYUMU — /kktc/aml-uyum
   Gövde: components/services/AmlSayfa.tsx (üç ülke ortak; bölüm listesi
   orada) · Metin: lib/amlKktc.ts (kaynak düzeni ve yumuşatılan bilgiler orada) ·
   Biçim: css/svc-aml.css (.sam-)

   09.10.2026 · Genel hizmet şablonundan (app/ulke/[slug]/[hizmet]) kendi
   sayfasına çıktı. STATİK KLASÖR DİNAMİK ŞABLONU EZİYOR ama üretim
   derlemesinde ikisi aynı HTML'e yazmasın diye slug
   app/kktc/[hizmet]/page.tsx · KENDI_SAYFASI kümesine de eklendi (gerekçesi
   orada). Yayın: lib/routes.ts · STATIC_LIVE. */

export const metadata: Metadata = sayfaKunye({
  title: A.seo.title,
  description: A.seo.description,
  yol: A.yol,
});

export default function Page() {
  return <AmlSayfa veri={A} />;
}
