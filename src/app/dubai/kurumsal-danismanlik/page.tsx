import type { Metadata } from "next";
import KurumsalSayfa from "@/components/services/KurumsalSayfa";
import { KURUMSAL_DUBAI as K } from "@/lib/kurumsalDubai";
import { sayfaKunye } from "@/lib/seo";

/* ============================================================================
   DUBAİ · KURUMSAL DANIŞMANLIK — /dubai/kurumsal-danismanlik
   Metin: lib/kurumsalDubai.ts (kaynak düzeni ve yumuşatılan bilgiler orada) ·
   Gövde: components/services/KurumsalSayfa.tsx · Biçim: css/svc-kurumsal.css

   09.10.2026 · Sayfa genel hizmet şablonundan (app/ulke/[slug]/[hizmet])
   kendi klasörüne taşındı: şablondaki hâli üç kart, dört kural, dört adım ve dört sorudan ibaretti.
   Burak: "Bunları da öyle doldur, üşenme … neredeyse boş bıraktığın
   sayfaların hepsini yap."

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR: app/dubai/[hizmet]/page.tsx içindeki
   KENDI_SAYFASI kümesine "kurumsal-danismanlik" eklendi; eklenmeseydi üretim
   derlemesinde şablon kazanırdı (o dosyadaki 25.09.2026 notu). */

export const metadata: Metadata = sayfaKunye({
  title: "Dubai'de Kurumsal Danışmanlık | Ortac Global",
  description: K.hero.lead,
  yol: "/dubai/kurumsal-danismanlik",
});

export default function DubaiKurumsalPage() {
  return <KurumsalSayfa veri={K} />;
}
