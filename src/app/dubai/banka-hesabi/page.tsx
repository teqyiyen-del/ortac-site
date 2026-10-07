import type { Metadata } from "next";
import BankaSayfa from "@/components/services/BankaSayfa";
import { BANKA_DUBAI as B } from "@/lib/bankaDubai";

/* ============================================================================
   DUBAİ · BANKA & ÖDEME — /dubai/banka-hesabi
   Metin: lib/bankaDubai.ts (kaynak düzeni ve teyit bekleyenler orada) ·
   Biçim: css/svc-banka.css (.svb-) · Hero kartı: services/BankaHeroCard.tsx

   Bu sayfa /dubai'nin (şirket kuruluşu) BANKA ADIMININ AYRINTISI, kendi
   başına bir ürün değil. Beş durak:

     hero       HeroSceneCard iskeleti (kuruluş ve muhasebeyle kardeş)
     banka      kurumsal banka hesabı: sahne + üç banka satırı + "bankanın
                başvuruda baktığı şeyler"
     ödeme      ödeme ve tahsilat kanalları: ayna düzen, dört kanal satırı,
                her birinde "ne zaman" etiketi
     süreç      beş adım alt alta satır (aşama bileşeni yalnız kuruluş sayfalarında)
     belgeler   sitenin standart belge bileşeni (CountryDocs)
     SSS        sitenin SSS bloğu (CountryFaq)

   22.09.2026 · İKİNCİ GEÇİŞ (gerekçe bankaDubai.ts başında): ilk hâl bir
   beyaz bir gece küçük bölümlerle dama tahtasına dönmüştü, bankalar ve ödeme
   kanalları yalnız logoydu, süreç sitenin aşama dilinde değildi ve mavi bir
   "ayrı ücreti yok" paneli vardı. Şimdi gövde baştan sona beyaz; ücret
   hiçbir yerde yazmıyor.

   22.09.2026 · ÜÇÜNCÜ GEÇİŞ: banka ve ödeme iki ayrı bölüm, iki ayrı başlık
   (Burak: "banka konusu farklı, ödeme ve tahsilat konusu ayrı"). İkinci
   geçişin iki kartı ve "Hangi kanal ne için" rehberi kalktı; rehberin
   içeriği ödeme satırlarının etiketine eridi. İlk hâl /lab/banka-ilk'te.

   AÇIK SAYFA · 22.09.2026 (lib/routes.ts · STATIC_LIVE). Açılınca menü,
   /dubai'nin hizmet kartları ve zincir bağlantıları kendiliğinden canlandı.
   Teyit bekleyen cümleler docs/teyit-listesi.md'de.

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR (app/dubai/[hizmet]; muhasebe de
   böyle).

   07.10.2026 · GÖVDE components/services/BankaSayfa.tsx'e taşındı: KKTC'nin
   banka sayfası aynı bölümleri kendi verisiyle basıyor. */

export const metadata: Metadata = {
  title: "Dubai'de Banka Hesabı ve Ödeme Altyapısı | Ortac Global",
  description: B.hero.lead,
};

export default function DubaiBankaPage() {
  return <BankaSayfa veri={B} />;
}
