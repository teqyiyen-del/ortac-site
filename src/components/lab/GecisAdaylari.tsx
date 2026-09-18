import {
  BookOpen,
  FileCheck2,
  FileText,
  FolderInput,
  Hash,
  Landmark,
  ScanSearch,
  ScrollText,
  Stamp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
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

   18.09.2026 · ÜÇÜNCÜ TUR, G1 SEÇİLDİ. Burak: "g1 i beğendim … önceki süreç
   şeyinde hepsinin üstünde sayı yazıyordu ve üstünde de dosya fln çıkıyordu
   ya ilk versiyonda onu beğeniyordum onu taşıyalım bu tasarıma … devir için
   gerekenler kısmı biraz garip olmuş, yine icon kullan da biraz daha düzgün
   yap, öncekinde tüm iconlar aynıydı fln ondan sıkıntıydı."
     · Duraklar yine NUMARALI (ilk hâlin daireleri), üstlerinden de belge
       akıyor; ikisi tek zaman çizelgesinde: belge durağa geldiği anda o
       durak doluyor ve numarası beyaza dönüyor.
     · Gerekenler listesi dosya yapraklarından KALEM BAŞINA AYRI İKONLU
       satırlara döndü (numara · beyanname · defter · banka · lisans ·
       denetim), ikon adları accountingDubai.ts · switchover.needs'te.

   HAREKET (tuzaklar.md · K): iki sürekli döngü, periyotları asal ve birbirine
   bölünmüyor — hat 7.919 ms (belge ve durak dolumu AYNI döngü), G3'ün
   dosyası 9.001 ms. `alternate` yok, ikisi de prefers-reduced-motion
   kapısının içinde; hareket kapalıyken duraklar numaralı ve açık mavi
   duruyor, belge ilk durağın üstünde bekliyor. */

const NEED_IKON: Record<string, LucideIcon> = {
  numara: Hash,
  beyanname: FileCheck2,
  defter: BookOpen,
  banka: Landmark,
  lisans: ScrollText,
  denetim: ScanSearch,
};

/* Gerekenler · kalem başına ayrı ikon, üç sütun. `dark` gece yüzeylerde. */
function Gerekenler({ dark = false }: { dark?: boolean }) {
  const S = C.switchover;
  return (
    <ul className="lgc-gerek" data-dark={dark ? "" : undefined} aria-label={S.needsTitle}>
      {S.needs.map((n) => {
        const Ikon = NEED_IKON[n.ikon] ?? FileText;
        return (
          <li key={n.t}>
            <span aria-hidden="true">
              <Ikon size={16} strokeWidth={1.9} />
            </span>
            {n.t}
          </li>
        );
      })}
    </ul>
  );
}

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

/* Hat: iki uç düğüm, aralarında dört numaralı durak ve hattın üstünde akan
   belge. Belge <ol>'un DIŞINDA, çünkü <ol>'un doğrudan çocuğu yalnız <li>
   olabilir. */
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

      <div className="lgc-yol">
        <span className="lgc-belge" aria-hidden="true">
          <FileText size={15} strokeWidth={2} />
        </span>
        <ol className="lgc-durak">
          {S.steps.map((a, i) => (
            <li key={a.title} style={{ "--lgc-i": i } as React.CSSProperties}>
              <span className="lgc-n data" aria-hidden="true">
                {i + 1}
              </span>
              <b>{a.title}</b>
            </li>
          ))}
        </ol>
      </div>

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
            {/* GEREKENLER · kalem başına ayrı ikon, üç sütun (18.09). Dosya
                yaprakları "biraz garip" bulundu ve silindi. */}
            <div className="lgc-gerek-alan">
              <p className="lgc-alt-h" data-dark="">
                {S.needsTitle}
              </p>
              <Gerekenler dark />
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
              {/* GEREKENLER · G2'de aynı ikonlu liste, iki sütun. */}
              <Gerekenler dark />
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
