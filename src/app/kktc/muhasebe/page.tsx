import type { Metadata } from "next";
import { OG_GORSEL } from "@/lib/seo";
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
  /* 09.10.2026 · denetim: paylaşım etiketleri ana sayfanınkine düşüyordu */
  openGraph: { type: "website", locale: "tr_TR", siteName: "Ortac Global", url: PAGE_URL, title: C.seo.title, description: C.seo.description, images: [OG_GORSEL] },
  twitter: { card: "summary_large_image", title: C.seo.title, description: C.seo.description },
};

export default function KktcAccountingPage() {
  return <MuhasebeSayfa veri={C} ulke="KKTC" yol="/kktc/muhasebe" />;
}
