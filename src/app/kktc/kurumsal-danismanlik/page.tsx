import type { Metadata } from "next";
import KurumsalSayfa from "@/components/services/KurumsalSayfa";
import { KURUMSAL_KKTC as K } from "@/lib/kurumsalKktc";
import { sayfaKunye } from "@/lib/seo";

/* ============================================================================
   KKTC · KURUMSAL DANIŞMANLIK — /kktc/kurumsal-danismanlik
   Metin: lib/kurumsalKktc.ts (kaynak düzeni ve yumuşatılan bilgiler orada) ·
   Gövde: components/services/KurumsalSayfa.tsx · Biçim: css/svc-kurumsal.css

   09.10.2026 · Sayfa genel hizmet şablonundan (app/ulke/[slug]/[hizmet])
   kendi klasörüne taşındı: şablonda içeriği yoktu ve yayında değildi; bu turda açıldı (lib/routes.ts).
   Burak: "Bunları da öyle doldur, üşenme … neredeyse boş bıraktığın
   sayfaların hepsini yap."

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR: app/kktc/[hizmet]/page.tsx içindeki
   KENDI_SAYFASI kümesine "kurumsal-danismanlik" eklendi; eklenmeseydi üretim
   derlemesinde şablon kazanırdı (o dosyadaki 25.09.2026 notu). */

export const metadata: Metadata = sayfaKunye({
  title: "KKTC'de Kurumsal Danışmanlık | Ortac Global",
  description: K.hero.lead,
  yol: "/kktc/kurumsal-danismanlik",
});

export default function KktcKurumsalPage() {
  return <KurumsalSayfa veri={K} />;
}
