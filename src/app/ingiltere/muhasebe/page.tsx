import type { Metadata } from "next";
import { OG_GORSEL } from "@/lib/seo";
import MuhasebeSayfa from "@/components/services/MuhasebeSayfa";
import { ACCOUNTING_INGILTERE as C } from "@/lib/accountingIngiltere";

/* İNGİLTERE MUHASEBE — /ingiltere/muhasebe (08.10.2026). Gövde ortak
   (services/MuhasebeSayfa); metin ve kaynakları lib/accountingIngiltere.ts.
   Ücret bölümü yok: İngiltere için fiyat belgesi gelmedi. STATİK KLASÖR:
   app/ingiltere/[hizmet] bu adresi üretmiyor. */

const PAGE_URL = "https://ortacglobal.com/ingiltere/muhasebe";

export const metadata: Metadata = {
  title: C.seo.title,
  description: C.seo.description,
  alternates: { canonical: PAGE_URL },
  /* 09.10.2026 · denetim: paylaşım etiketleri ana sayfanınkine düşüyordu */
  openGraph: { type: "website", locale: "tr_TR", siteName: "Ortac Global", url: PAGE_URL, title: C.seo.title, description: C.seo.description, images: [OG_GORSEL] },
  twitter: { card: "summary_large_image", title: C.seo.title, description: C.seo.description },
};

export default function IngiltereAccountingPage() {
  return <MuhasebeSayfa veri={C} ulke="İngiltere" yol="/ingiltere/muhasebe" />;
}
