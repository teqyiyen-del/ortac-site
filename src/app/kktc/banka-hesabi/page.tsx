import type { Metadata } from "next";
import BankaSayfa from "@/components/services/BankaSayfa";
import { BANKA_KKTC as B } from "@/lib/bankaKktc";

import { sayfaKunye } from "@/lib/seo";
/* KKTC · BANKA & ÖDEME — /kktc/banka-hesabi (07.10.2026)
   Dubai'nin banka sayfasıyla AYNI gövde (components/services/BankaSayfa):
   giriş, kurumsal hesap, ödeme ve tahsilat, süreç, belgeler, SSS. Önceki
   hâl genel hizmet şablonunun kısa düzeniydi (üç kart, dört kural, dört
   adım); Burak: "bu kadar da boş olmasın … paralel git."
   Metin ve kaynakları lib/bankaKktc.ts'te.

   STATİK KLASÖR: app/kktc/[hizmet] bu adresi artık ÜRETMİYOR (oradaki
   KENDI_SAYFASI listesi); iki sayfa aynı HTML'e yazılırsa üretimde şablon
   kazanıyor (app/dubai/[hizmet]'teki not). */

export const metadata: Metadata = sayfaKunye({
  title: "KKTC'de Banka Hesabı ve Tahsilat | Ortac Global",
  description: B.hero.lead,
  yol: "/kktc/banka-hesabi",
});

export default function KktcBankaPage() {
  return <BankaSayfa veri={B} />;
}
