import type { Metadata } from "next";
import KurumsalSayfa from "@/components/services/KurumsalSayfa";
import { KURUMSAL_INGILTERE as K } from "@/lib/kurumsalIngiltere";
import { sayfaKunye } from "@/lib/seo";

/* ============================================================================
   İNGİLTERE · KURUMSAL DANIŞMANLIK — /ingiltere/kurumsal-danismanlik
   Metin: lib/kurumsalIngiltere.ts (kaynak düzeni ve yumuşatılan bilgiler orada) ·
   Gövde: components/services/KurumsalSayfa.tsx · Biçim: css/svc-kurumsal.css

   09.10.2026 · Sayfa genel hizmet şablonundan (app/ulke/[slug]/[hizmet])
   kendi klasörüne taşındı: şablonda içeriği yoktu ve yayında değildi; bu turda açıldı (lib/routes.ts).
   Burak: "Bunları da öyle doldur, üşenme … neredeyse boş bıraktığın
   sayfaların hepsini yap."

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR: app/ingiltere/[hizmet]/page.tsx içindeki
   KENDI_SAYFASI kümesine "kurumsal-danismanlik" eklendi; eklenmeseydi üretim
   derlemesinde şablon kazanırdı (o dosyadaki 25.09.2026 notu). */

export const metadata: Metadata = sayfaKunye({
  title: "İngiltere'de Kurumsal Danışmanlık | Ortac Global",
  description: K.hero.lead,
  yol: "/ingiltere/kurumsal-danismanlik",
});

export default function IngiltereKurumsalPage() {
  return <KurumsalSayfa veri={K} />;
}
