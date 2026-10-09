import type { Metadata } from "next";
import VergiSayfa from "@/components/services/VergiSayfa";
import { VERGI_KKTC as V } from "@/lib/vergiKktc";
import { sayfaKunye } from "@/lib/seo";

/* ============================================================================
   KKTC · VERGİ DANIŞMANLIĞI — /kktc/vergi
   Metin: lib/vergiKktc.ts (kaynak düzeni ve yumuşatılan cümleler orada) ·
   Gövde: components/services/VergiSayfa.tsx · Biçim: css/svc-vergi.css (.svr-)

   09.10.2026 · Sayfa genel hizmet şablonundan (app/ulke/[slug]/[hizmet])
   kendi klasörüne çıktı; üç ülke aynı gövdeyi kendi verisiyle basıyor.

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR: "vergi" app/kktc/[hizmet]
   içindeki KENDI_SAYFASI kümesinde, şablon bu adresi artık üretmiyor
   (üretseydi üretim derlemesinde şablon kazanırdı; gerekçe o dosyada). */

export const metadata: Metadata = sayfaKunye({
  title: V.seo.title,
  description: V.seo.description,
  yol: V.yol,
});

/* Sayfa sunucu bileşeni; etkileşimli tek parça yok (Dubai'deki kaydırıcı
   services/VergiHesap'ta, yalnız o ülkenin verisiyle basılıyor). */
export default function KktcVergiPage() {
  return <VergiSayfa veri={V} />;
}
