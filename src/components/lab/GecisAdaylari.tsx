import {
  CalendarCheck,
  ClipboardList,
  FileText,
  FolderInput,
  KeyRound,
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

   17.09.2026 · Burak: "muhasebeni mi değişmek istiyorsun kısmı çok fazla
   texte boğulmuş çok hoşuma gitmedi buraya labda alternatif sun."

   Canlıdaki bölüm üç hâlden geçti (uzun satırlar → dört eş hücre "sıradan"
   → zaman çizgisi + kart "texte boğulmuş"). Üç hâlin ortak sorunu yükü
   CÜMLEYE vermesiydi. Buradaki üç aday yükü GÖRSELE veriyor ve ekranda
   adım başına tek başlıktan fazlası yok; adımların açıklama cümleleri
   (switchover.steps[].line) hiçbir adayda basılmıyor.

     G1 · DEVİR HATTI   önceki muhasebeci → hat üstünde dört durak → Ortac.
                        Belge ikonu hat boyunca akıyor; gerekenler hattın
                        altında çip.
     G2 · DÖRT İKON     solda başlık + çıkış, sağda 2×2 ikon karosu (numara +
                        başlık), gerekenler çip satırı.
     G3 · GECE DOSYA    gece bant; sağda "devir dosyası" kartı, dört adımın
                        onay daireleri sırayla doluyor.

   VERİ TEK KAYNAK: başlık, adım adları, gerekenler ve çıkış
   accountingDubai.ts · switchover'dan okunuyor; lab metin yazmıyor. Tek
   ek adımların İKONU (aşağıda) ve düğümlerin iki kelimelik adları.

   HAREKET (tuzaklar.md · K): iki sürekli döngü, periyotlar asal ve birbirine
   bölünmüyor: G1 belge 7.919 ms, G3 onay turu 9.001 ms. `alternate` yok,
   ikisi de prefers-reduced-motion: no-preference kapısının içinde; hareket
   kapalıyken G1'de belge ilk durakta, G3'te dört daire dolu duruyor. */

const ADIM_IKON: LucideIcon[] = [ClipboardList, FolderInput, KeyRound, CalendarCheck];

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

function Cipler({ dark = false }: { dark?: boolean }) {
  const S = C.switchover;
  return (
    <ul className="lgc-cip" data-dark={dark ? "" : undefined} aria-label={S.needsTitle}>
      {S.needs.map((n) => (
        <li key={n}>
          <FileText size={13} strokeWidth={2} aria-hidden="true" />
          {n}
        </li>
      ))}
    </ul>
  );
}

/* ================================================================ G1 · HAT */
export function GecisG1() {
  const S = C.switchover;
  return (
    <section className="sec-pad svm-sec">
      <div className="container-o">
        <Baslik />
        <FadeUp delay={0.1}>
          <div className="lgc1">
            <div className="lgc1-uc">
              <span className="lgc1-disk" aria-hidden="true">
                <UserRound size={22} strokeWidth={1.8} />
              </span>
              <b>Önceki muhasebeciniz</b>
            </div>

            {/* Belge <ol>'un DIŞINDA: <ol>'un doğrudan çocuğu yalnız <li>
                olabilir. Hat çizgisi ve akan belge .lgc1-hat'ın katmanları. */}
            <div className="lgc1-hat">
              <span className="lgc1-belge" aria-hidden="true">
                <FileText size={15} strokeWidth={2} />
              </span>
              <ol className="lgc1-durak">
                {S.steps.map((a, i) => (
                  <li key={a.title}>
                    <span className="lgc1-n data" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="lgc1-t">{a.title}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lgc1-uc" data-biz="">
              <span className="lgc1-disk" aria-hidden="true">
                <Stamp size={22} strokeWidth={1.8} />
              </span>
              <b>Ortac ekibi</b>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="lgc-alt">
            <div>
              <p className="lgc-alt-h">{S.needsTitle}</p>
              <Cipler />
            </div>
            <AskCta label={S.askLabel} href={S.askHref} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ============================================================== G2 · İKON */
export function GecisG2() {
  const S = C.switchover;
  return (
    <section className="sec-pad svm-sec">
      <div className="container-o lgc2">
        <div className="lgc2-sol">
          <Baslik lead />
          <FadeUp delay={0.26}>
            <AskCta label={S.askLabel} href={S.askHref} />
          </FadeUp>
        </div>
        <div>
          <ol className="lgc2-karo">
            {S.steps.map((a, i) => {
              const Ikon = ADIM_IKON[i] ?? ClipboardList;
              return (
                <li key={a.title}>
                  <FadeUp className="lgc2-karo-in" delay={0.06 + i * 0.06}>
                    <span className="lgc2-disk" aria-hidden="true">
                      <Ikon size={22} strokeWidth={1.8} />
                    </span>
                    <span className="lgc2-n data" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b>{a.title}</b>
                  </FadeUp>
                </li>
              );
            })}
          </ol>
          <FadeUp delay={0.3}>
            <p className="lgc-alt-h">{S.needsTitle}</p>
            <Cipler />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ============================================================= G3 · DOSYA */
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
              {S.steps.map((a, i) => {
                const Ikon = ADIM_IKON[i] ?? ClipboardList;
                return (
                  <li key={a.title} style={{ "--lgc3-i": i } as React.CSSProperties}>
                    <span className="lgc3-onay" aria-hidden="true" />
                    <Ikon size={17} strokeWidth={1.9} aria-hidden="true" />
                    <b>{a.title}</b>
                  </li>
                );
              })}
            </ol>
            <Cipler dark />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
