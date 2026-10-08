import type { Metadata } from "next";
import BankaSayfa from "@/components/services/BankaSayfa";
import { BANKA_INGILTERE as B } from "@/lib/bankaIngiltere";

import { sayfaKunye } from "@/lib/seo";
/* İNGİLTERE · BANKA & ÖDEME — /ingiltere/banka-hesabi (08.10.2026). Dubai ve
   KKTC'yle aynı gövde (services/BankaSayfa); metin ve kaynakları
   lib/bankaIngiltere.ts. STATİK KLASÖR: app/ingiltere/[hizmet] üretmiyor. */

export const metadata: Metadata = sayfaKunye({
  title: "İngiltere'de Banka Hesabı ve Ödeme Altyapısı | Ortac Global",
  description: B.hero.lead,
  yol: "/ingiltere/banka-hesabi",
});

export default function IngiltereBankaPage() {
  return <BankaSayfa veri={B} />;
}
