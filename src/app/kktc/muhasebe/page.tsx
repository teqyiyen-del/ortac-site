import type { Metadata } from "next";
import MuhasebeSayfa from "@/components/services/MuhasebeSayfa";
import { ACCOUNTING_KKTC as C } from "@/lib/accountingKktc";

/* KKTC MUHASEBE — /kktc/muhasebe. Gövde components/services/MuhasebeSayfa
   (08.10.2026'da oraya taşındı, İngiltere de kullanıyor); metin ve kaynakları
   lib/accountingKktc.ts. STATİK KLASÖR: app/kktc/[hizmet] bu adresi üretmiyor. */

const PAGE_URL = "https://ortacglobal.com/kktc/muhasebe";

export const metadata: Metadata = {
  title: C.seo.title,
  description: C.seo.description,
  alternates: { canonical: PAGE_URL },
};

export default function KktcAccountingPage() {
  return <MuhasebeSayfa veri={C} ulke="KKTC" yol="/kktc/muhasebe" />;
}
