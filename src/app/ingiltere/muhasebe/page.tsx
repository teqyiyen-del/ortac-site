import type { Metadata } from "next";
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
};

export default function IngiltereAccountingPage() {
  return <MuhasebeSayfa veri={C} ulke="İngiltere" yol="/ingiltere/muhasebe" />;
}
