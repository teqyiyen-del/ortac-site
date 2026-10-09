/* ANA SAYFA · ÜLKELER BÖLÜMÜ · ÜÇ FOTOĞRAFLI KART (10.10.2026).
   Önce İngilizce denemede (/en) "sade karşılık" olarak kuruldu; Burak görünce:
   "İngilizcedeki hâlini beğendim, onu Türkçede de aynı yapabiliriz. Üç ülke
   dursun, basınca gider kıyaslarlar. Yay ve kıyas tablosunu kaldır."
   Türkçe ana sayfada ThreeCountries (yay + yerinde açılan panel + yan yana
   kıyas tablosu) akıştan çıktı; bileşen dosyası duruyor, kıyas zaten ayrı
   sayfada (/ulkeler). İki dil aynı bileşeni kullanıyor; metin çağırandan
   geliyor (Türkçesi app/page.tsx'te, İngilizcesi lib/en/anaSayfa.ts'te).
   Kimlik (#ulkeler) korunuyor: menü ve öteki bölümler bu çapaya iniyor. */
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import SplitWords from "@/components/shared/SplitWords";
import UlkeFotoKartlar, { type UlkeFotoKart } from "@/components/shared/UlkeFotoKartlar";

export default function UlkeKartBolumu({
  title,
  accent,
  lead,
  kartlar,
  kiyas,
}: {
  title: string;
  accent: string;
  lead: string;
  kartlar: UlkeFotoKart[];
  /** kartların altındaki bağlantının metni; hedef /ulkeler */
  kiyas: string;
}) {
  return (
    <section id="ulkeler" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={title} accent={accent} className="h2" style={{ color: "var(--text-900)" }} />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{lead}</p>
          </FadeUp>
        </div>
        {/* sec-head ile kartlar arasındaki boşluk: öteki bölümlerde ızgaranın
            kendi üst boşluğu var, .ufk'de yok */}
        <div style={{ marginTop: "var(--space-head)" }}>
          <FadeUp delay={0.24}>
            <UlkeFotoKartlar items={kartlar} />
          </FadeUp>
        </div>
        <FadeUp delay={0.3}>
          <SmartLink href="/ulkeler" className="link-arrow" style={{ marginTop: 28 }}>
            {kiyas}
            <ArrowRight size={15} strokeWidth={2.1} />
          </SmartLink>
        </FadeUp>
      </div>
    </section>
  );
}
