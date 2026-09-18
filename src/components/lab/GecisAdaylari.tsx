import { FileText, FolderInput, Stamp, UserRound } from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   /lab/muhasebe-gecis · "MUHASEBECİNİZİ DEĞİŞTİRMEK Mİ İSTİYORSUNUZ?" ADAYLARI
   CSS: css/lab-gecis.css (.lgc-)

   17.09.2026 · ilk üç aday (G1 hat · G2 dört ikon · G3 gece dosya).
   18.09.2026 · İKİNCİ TUR. Burak: "g1 in aşama aşama gösterme mantığını
   sevdim. g3 ün de tasarımı çok iyi olmuş onu g1 e uyarlayabilir miyiz? bide
   gerekiyorsa siyah üstünede alabiliriz … şu devir için gerekenler kısmı daha
   farklı olabilir bi kurcala … g2 yi silebilirsin."

     G1 · HAT, GECE KART   G1'in akışı (önceki muhasebeci → dört durak →
                           Ortac) G3'ün diliyle: beyaz bölümün içinde gece
                           panel, duraklar G3'ün onay daireleri ve sırayla
                           doluyor. GEREKENLER: "dosya yaprakları" — altı
                           küçük kâğıt, köşesi kıvrık.
     G2 · HAT, TAM GECE    aynı hat, bölümün tamamı gece (fiyat bandı gibi).
                           GEREKENLER: iki sütun, kare onay kutulu liste.
                           (Eski G2 · dört ikon SİLİNDİ.)
     G3 · DEVİR DOSYASI    17.09'un beğenilen adayı, dokunulmadı; kıyas için
                           duruyor.

   ADIM BAŞINA TEK BAŞLIK: switchover.steps[].line hiçbir adayda basılmıyor.
   Metin accountingDubai.ts · switchover'dan; lab metin yazmıyor.

   HAREKET (tuzaklar.md · K): iki sürekli döngü, periyotları asal ve birbirine
   bölünmüyor — hat 7.919 ms, G3'ün dosyası 9.001 ms. `alternate` yok, ikisi
   de prefers-reduced-motion kapısının içinde; hareket kapalıyken bütün
   duraklar dolu duruyor (son hâl). */

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

/* Hat: iki uç düğüm ve aralarında dört durak. `data-kart` gece panelin
   içindeyken, `data-bant` doğrudan gece bölümün üstündeyken. Tek fark
   dolgu ve çerçeve; hattın kendisi aynı. */
function Hat() {
  const S = C.switchover;
  return (
    <div className="lgc-hat">
      <div className="lgc-uc">
        <span className="lgc-uc-d" aria-hidden="true">
          <UserRound size={20} strokeWidth={1.8} />
        </span>
        <b>Önceki muhasebeciniz</b>
      </div>

      <ol className="lgc-durak">
        {S.steps.map((a, i) => (
          <li key={a.title} style={{ "--lgc-i": i } as React.CSSProperties}>
            <span className="lgc-onay" aria-hidden="true" />
            <b>{a.title}</b>
          </li>
        ))}
      </ol>

      <div className="lgc-uc" data-biz="">
        <span className="lgc-uc-d" aria-hidden="true">
          <Stamp size={20} strokeWidth={1.8} />
        </span>
        <b>Ortac ekibi</b>
      </div>
    </div>
  );
}

/* ================================================== G1 · HAT + GECE KART */
export function GecisG1() {
  const S = C.switchover;
  return (
    <section className="sec-pad svm-sec">
      <div className="container-o">
        <Baslik lead />
        <FadeUp delay={0.1}>
          <div className="lgc-kart">
            <Hat />
            {/* GEREKENLER · birinci deneme: dosya yaprakları. Altı kâğıt,
                köşeleri kıvrık (CSS üçgeni), adları üstünde. Çip şeridinden
                farkı: liste değil, bir DOSYA gibi duruyor. */}
            <div className="lgc-yaprak-alan">
              <p className="lgc-alt-h" data-dark="">
                {S.needsTitle}
              </p>
              <ul className="lgc-yaprak">
                {S.needs.map((n) => (
                  <li key={n}>
                    <span aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="lgc-cikis">
            <AskCta label={S.askLabel} href={S.askHref} />
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ==================================================== G2 · HAT, TAM GECE */
export function GecisG2() {
  const S = C.switchover;
  return (
    <section className="sec-pad sec-night">
      <div className="container-o">
        <Baslik dark lead />
        <FadeUp delay={0.1}>
          <div className="lgc-bant">
            <Hat />
          </div>
        </FadeUp>
        <div className="lgc-gece-alt">
          <FadeUp delay={0.18}>
            <div>
              <p className="lgc-alt-h" data-dark="">
                {S.needsTitle}
              </p>
              {/* GEREKENLER · ikinci deneme: iki sütun, kare onay kutulu
                  liste. Kutular boş ve bilerek: ziyaretçinin kendi dosyasında
                  neyin hazır olduğunu gözüyle işaretlediği bir liste. */}
              <ul className="lgc-kutu-liste">
                {S.needs.map((n) => (
                  <li key={n}>
                    <span aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
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
                <li key={n}>
                  <FileText size={13} strokeWidth={2} aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
