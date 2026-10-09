import type { Metadata } from "next";
import VergiSayfa from "@/components/services/VergiSayfa";
import { VERGI_DUBAI as V } from "@/lib/vergiDubai";
import { sayfaKunye } from "@/lib/seo";

/* ============================================================================
   DUBAİ · VERGİ DANIŞMANLIĞI — /dubai/vergi
   Metin: lib/vergiDubai.ts (kaynak düzeni ve yumuşatılan cümleler orada) ·
   Gövde: components/services/VergiSayfa.tsx · Biçim: css/svc-vergi.css (.svr-)

   09.10.2026 · Sayfa genel hizmet şablonundan (app/ulke/[slug]/[hizmet])
   kendi klasörüne çıktı; üç ülke aynı gövdeyi kendi verisiyle basıyor.

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR: "vergi" app/dubai/[hizmet]
   içindeki KENDI_SAYFASI kümesinde, şablon bu adresi artık üretmiyor
   (üretseydi üretim derlemesinde şablon kazanırdı; gerekçe o dosyada). */

export const metadata: Metadata = sayfaKunye({
  title: V.seo.title,
  description: V.seo.description,
  yol: V.yol,
});

export default function DubaiVergiPage() {
  return <VergiSayfa veri={V} />;
}
