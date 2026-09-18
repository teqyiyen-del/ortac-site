import { FileText, FolderInput } from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { GecisGerekenler, GecisHat } from "@/components/services/AccountingSections";
import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   /lab/muhasebe-gecis · "MUHASEBECİNİZİ DEĞİŞTİRMEK Mİ İSTİYORSUNUZ?" ADAYLARI
   CSS: css/lab-gecis.css (.lgc-)

   17.09.2026 · ilk üç aday (G1 hat · G2 dört ikon · G3 gece dosya).
   18.09.2026 · ikinci tur: G1 hat G3'ün diline taşındı, "dört ikon" silindi.
   18.09.2026 · ÜÇÜNCÜ TUR — G2 CANLIYA ALINDI. Burak: "g1 güzel oldu ama
   dosya çok yukardan gidiyor nerdeyse siyah boxdan çıkacak. g2 de düzgün
   duruyor … bence g2 koy sitede de güncelle. ama g1 i de düzelt belki onu
   kullanabiliriz belli olmaz."

     Taban  canlı bölüm (AccountingSwitch): beyaz bölüm + gece kart, çıkış
            kartın içinde. Burak G1'i seçti ve düğmeyi kartın içine aldırdı.
     G2     aynı hattın TAM GECE hâli; bir süre canlıdaydı, kayıt olarak
            duruyor.
     G3     17.09'un "devir dosyası" adayı.

   HAT VE GEREKENLER TEK KAYNAK: ikisi de canlı bileşenden dışa açık
   (AccountingSections · GecisHat · GecisGerekenler). Lab ikinci bir kopya
   taşımıyor; canlı hat değişince G1 de değişiyor. */

function Baslik({ dark = false, lead = false }: { dark?: boolean; lead?: boolean }) {
  const S = C.switchover;
  return (
    <div className={dark ? "sec-head sec-head-dark" : "sec-head"}>
      <SplitWords
        as="h2"
        text={S.heading}
        accent={S.accent}
        className="h2"
        style={dark ? { color: "#ffffff" } : undefined}
      />
      {lead && (
        <FadeUp delay={0.2}>
          <p className={dark ? "sec-lead sec-lead-dark" : "sec-lead"}>{S.lead}</p>
        </FadeUp>
      )}
    </div>
  );
}

/* ==================================================== G2 · HAT, TAM GECE
   18.09.2026 · bu hâl bir süre canlıdaydı; aynı gün G1 (beyaz bölüm + gece
   kart) seçilince buraya, kayda döndü. Fark tek: bölümün tamamı gece ve
   çıkış kartın değil bandın altında. */
export function GecisG2() {
  const S = C.switchover;
  return (
    <section className="sec-pad sec-night">
      <div className="container-o">
        <Baslik dark lead />
        <FadeUp delay={0.1}>
          <div className="lgc-bant">
            <GecisHat />
          </div>
        </FadeUp>
        <div className="lgc-gece-alt">
          <FadeUp delay={0.18}>
            <div>
              <p className="lgc-alt-h" data-dark="">
                {S.needsTitle}
              </p>
              <GecisGerekenler />
            </div>
          </FadeUp>
          <FadeUp delay={0.26}>
            <AskCta label={S.askLabel} href={S.askHref} tone="solid" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ============================================ G3 · DEVİR DOSYASI (17.09) */
export function GecisG3() {
  const S = C.switchover;
  return (
    <section className="sec-pad sec-night">
      <div className="container-o lgc3">
        <div className="lgc3-sol">
          <Baslik dark lead />
          <FadeUp delay={0.26}>
            <AskCta label={S.askLabel} href={S.askHref} tone="solid" />
          </FadeUp>
        </div>
        <FadeUp delay={0.12}>
          <div className="lgc3-dosya">
            <p className="lgc3-dosya-h">
              <FolderInput size={16} strokeWidth={2} aria-hidden="true" />
              Devir dosyası
              <span className="data">{S.steps.length} adım</span>
            </p>
            <ol className="lgc3-liste">
              {S.steps.map((a, i) => (
                <li key={a.title} style={{ "--lgc3-i": i } as React.CSSProperties}>
                  <span className="lgc3-onay" aria-hidden="true" />
                  <b>{a.title}</b>
                </li>
              ))}
            </ol>
            <ul className="lgc-cip" data-dark="" aria-label={S.needsTitle}>
              {S.needs.map((n) => (
                <li key={n.t}>
                  <FileText size={13} strokeWidth={2} aria-hidden="true" />
                  {n.t}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
