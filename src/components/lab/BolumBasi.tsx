"use client";

import { useState } from "react";
import {
  Building2,
  CalendarCheck,
  ChartColumn,
  Check,
  Handshake,
  History,
  Landmark,
  RotateCcw,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { ACCOUNTING_DUBAI } from "@/lib/accountingDubai";
import { BASIS } from "@/lib/about";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { COUNTRY_LABELS } from "@/lib/store";

/* /lab/bolum-basi — bölüm açılışı için üç alternatif desen.
   Stil: src/app/css/lab-bbasi.css (.bbs-). Gerekçeler orada, blok blok.

   METİN UYDURULMADI: üç bölümün başlığı, alt satırı ve gövdesi sırasıyla
   accountingDubai.ts · gains, about.ts · BASIS ve countryContent.ts ·
   dubai.docs'tan okunuyor. Bu dosyada ekrana çıkan tek serbest metin lab
   künyeleridir (page.tsx). */

/* ------------------------------------------------------------------ İÇERİK */

const GAINS = ACCOUNTING_DUBAI.gains;
const DOCS = COUNTRY_CONTENT.dubai.docs;

const FAY_IKON: Record<string, LucideIcon> = {
  calendar: CalendarCheck,
  chart: ChartColumn,
  bank: Landmark,
  stamp: Stamp,
};

const DAY_IKON: Record<string, LucideIcon> = {
  stamp: Stamp,
  handshake: Handshake,
  office: Building2,
  history: History,
};

/* ------------------------------------------------------------------ GÖVDELER

   Üçü de canlı karşılığının düzenini devralıyor; yeni bir biçim icat
   edilmedi. Dört blokta da BİREBİR aynı gövdeler basılıyor, çünkü kıyasta
   tek değişken açılışın kendisi olmalı.

   FADEUP SAYISI: her gövdede TEK tane ve ızgaranın kendisini sarıyor, kartları
   tek tek değil. Bu turun önerdiği kural bu ve sayfanın birinci yarısı da o
   kurala uyuyor; kuralın kendisi aşağıda `FadeUpKarsilastirma`da gösteriliyor. */

function GovdeFayda() {
  return (
    <FadeUp className="bbs-govde">
      <div className="bbs-fay">
        {GAINS.items.map((g) => {
          const Icon = FAY_IKON[g.icon] ?? Stamp;
          return (
            <div className="bbs-fay-r" key={g.title}>
              <span className="bbs-fay-ic" aria-hidden="true">
                <Icon size={15} strokeWidth={2.1} />
              </span>
              <b>{g.title}</b>
              <span>{g.line}</span>
            </div>
          );
        })}
      </div>
    </FadeUp>
  );
}

function GovdeDayanak() {
  return (
    <FadeUp className="bbs-govde">
      <div className="bbs-day">
        {BASIS.cards.map((c) => {
          const Icon = DAY_IKON[c.icon] ?? Stamp;
          return (
            <article className="bbs-day-k" key={c.t}>
              <span className="bbs-day-ic" aria-hidden="true">
                <Icon size={17} strokeWidth={1.9} />
              </span>
              <h3>{c.t}</h3>
              <p>{c.s}</p>
            </article>
          );
        })}
      </div>
    </FadeUp>
  );
}

function GovdeEvrak() {
  return (
    <FadeUp className="bbs-govde">
      <div>
        <div className="bbs-evr">
          {DOCS.groups.map((g) => (
            <section className="bbs-evr-g" key={g.title}>
              <h3>{g.title}</h3>
              <p className="bbs-evr-h">{g.hint}</p>
              <ul className="bbs-evr-l">
                {g.items.map((it) => (
                  <li key={it}>
                    <Check size={13} strokeWidth={1.9} aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="bbs-evr-n">{DOCS.note}</p>
      </div>
    </FadeUp>
  );
}

/* --------------------------------------------------------------- BÖLÜM VERİSİ

   `etiket` DESEN C İÇİN. Üçü de uydurma değil: bölümün kendi çapa adı
   (#fayda · #evrak) ya da kendi başlığındaki kelime (BASIS · "Neye
   DAYANARAK çalışıyoruz"). Yeni bir iddia kurmuyor.

   `no` bu lab bloğundaki sıra; canlı sayfada bölümün gerçek sırası olur. */

type Bolum = {
  no: string;
  etiket: string;
  baslik: string;
  accent: string;
  lead: string;
  Govde: () => React.ReactElement;
};

const BOLUMLER: Bolum[] = [
  {
    no: "01",
    etiket: "Karşılık",
    baslik: GAINS.heading,
    accent: GAINS.accent,
    lead: GAINS.lead,
    Govde: GovdeFayda,
  },
  {
    no: "02",
    etiket: "Dayanak",
    baslik: BASIS.heading,
    accent: BASIS.accent,
    /* BASIS.lead veride boş; desenlerin hepsi bu durumu da göstermeli, çünkü
       sitede alt satırsız bölüm de var. */
    lead: BASIS.lead,
    Govde: GovdeDayanak,
  },
  {
    no: "03",
    etiket: "Evrak",
    /* Canlı karşılığı components/CountryDocs.tsx; başlık ve alt satır orada
       yazılı ve buraya birebir alındı (alt satırdaki ülke adı da oradaki gibi
       COUNTRY_LABELS'tan geliyor, elle yazılmadı). */
    baslik: "Şirket kurmak için nelere ihtiyacınız var?",
    accent: "nelere ihtiyacınız var?",
    lead: `${COUNTRY_LABELS.dubai} için sizde olanı işaretleyin, süreç tarafını biz yürütüyoruz.`,
    Govde: GovdeEvrak,
  },
];

/* ==========================================================================
   DÖRT AÇILIŞ

   Dördü de aynı kabı kullanıyor: <section className="sec-pad"> +
   .container-o. Bölüm dolgusu (--sec-pad-d 112px) ve başlık-içerik aralığı
   (--space-head 48px) dört desende de aynı; değişen yalnızca açılışın
   geometrisi ve neyin yazıldığı.
   ========================================================================== */

/* ---------------------------------------------------- BUGÜNKÜ HÂLİ · taban
   51 `.sec-head` bloğunun 46'sı birebir bu: SplitWords h2 + son kelimelerde
   accent + FadeUp'a sarılmış tek satır .sec-lead. Karşılaştırmanın tabanı
   olduğu için birebir kopyalandı, sadeleştirilmedi. */
function AcilisBugun({ b }: { b: Bolum }) {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={b.baslik}
            accent={b.accent}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>{b.lead ? <p className="sec-lead">{b.lead}</p> : null}</FadeUp>
        </div>
        <b.Govde />
      </div>
    </section>
  );
}

/* ------------------------------------------------------- DESEN A · "EŞİK" */
function AcilisA({ b }: { b: Bolum }) {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="bbs-a">
          <SplitWords
            as="h2"
            text={b.baslik}
            accent={b.accent}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          {b.lead ? <p className="sec-lead bbs-a-lead">{b.lead}</p> : null}
        </div>
        <b.Govde />
      </div>
    </section>
  );
}

/* ---------------------------------------------------- DESEN B · "SESSİZ"
   Accent yok: SplitWords'e `accent` geçilmiyor, kelime kelime giriş duruyor.
   Yani değişen ink, hareket dili değil. Alt satır bölümün sonuna iniyor. */
function AcilisB({ b }: { b: Bolum }) {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={b.baslik} className="h2" style={{ color: "var(--text-900)" }} />
        </div>
        <b.Govde />
        {b.lead ? <p className="bbs-b-not">{b.lead}</p> : null}
      </div>
    </section>
  );
}

/* ---------------------------------------------------- DESEN C · "KÜNYE"
   Künye satırı bölümün yerini söylüyor, o yüzden başlıkta accent yok. */
function AcilisC({ b }: { b: Bolum }) {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* KÜNYE SATIRI DÜZ METİN, `aria-label` YOK. İlk yazımda satır tek
              bir okuma birimi olsun diye <p aria-label="03, Evrak"> yazılmış ve
              iki span aria-hidden yapılmıştı; bu SESSİZ bir bölüm başlığı
              üretiyor, çünkü ARIA `paragraph` rolünde yazardan ad almayı
              yasaklıyor — etiket hiç yayımlanmazdı. Tuzak G'nin aynısı: rolsüz
              ya da yanlış rollü bir kapta aria ile ad kurmak tutmuyor.
              Şimdi numara ve ad gerçek metin, ekran okuyucu "01 Evrak" diyor.
              Yalnızca ayraç gizli; bir şeyi GİZLEMEK güvenilir, GÖSTERMEK değil. */}
          <p className="bbs-c-kicker">
            <span className="bbs-c-no">{b.no}</span>
            <span className="bbs-c-ay" aria-hidden="true">
              ·
            </span>
            <span className="bbs-c-ad">{b.etiket}</span>
          </p>
          <SplitWords as="h2" text={b.baslik} className="h2" style={{ color: "var(--text-900)" }} />
          {b.lead ? <p className="sec-lead">{b.lead}</p> : null}
        </div>
        <b.Govde />
      </div>
    </section>
  );
}

const ACILIS = {
  bugun: AcilisBugun,
  a: AcilisA,
  b: AcilisB,
  c: AcilisC,
} as const;

export type DesenTip = keyof typeof ACILIS;

/** Bir deseni sitenin üç gerçek bölümüyle art arda basar. Üç kez görülmesi
 *  bilerek: turun teşhisi tek bir açılışın kötü olması değil, AYNI açılışın
 *  sayfada sekiz kez tekrarlanması. Bir desenin kendisi de tekrarlanınca
 *  yoruyor mu, ancak böyle görülüyor. */
export function Desen({ tip }: { tip: DesenTip }) {
  const Acilis = ACILIS[tip];
  return (
    <>
      {BOLUMLER.map((b) => (
        <Acilis key={`${tip}-${b.no}`} b={b} />
      ))}
    </>
  );
}

/* ==========================================================================
   FADEUP KURALI · iki varyant yan yana

   Solda bugünkü kullanım: her kart ayrı FadeUp, 0,05 saniyelik kademe.
   Sağda öneri: ızgaranın kendisi tek FadeUp, kartlar birlikte geliyor.

   `tur` sayacı iki ızgarayı da yeniden monte ediyor. Gerekli, çünkü FadeUp
   `viewport: { once: true }` ile çalışıyor ve giriş sayfa başına bir kez
   görülüyor; kıyas tek seferlik olsaydı yapılamazdı.
   ========================================================================== */
export function FadeUpKarsilastirma() {
  const [tur, setTur] = useState(0);

  const kartlar = BASIS.cards;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="bbs-fu">
          <div className="bbs-fu-k">
            <p className="bbs-fu-t">
              Kart kart · dört FadeUp
              <span>Bugünkü kullanım: her kart ayrı sarılı, 0,05 sn kademeyle geliyor.</span>
            </p>
            <div className="bbs-fu-g" key={`kart-${tur}`}>
              {kartlar.map((c, i) => {
                const Icon = DAY_IKON[c.icon] ?? Stamp;
                return (
                  <FadeUp key={c.t} delay={0.12 + i * 0.05}>
                    <article className="bbs-day-k">
                      <span className="bbs-day-ic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3>{c.t}</h3>
                      <p>{c.s}</p>
                    </article>
                  </FadeUp>
                );
              })}
            </div>
          </div>

          <div className="bbs-fu-k">
            <p className="bbs-fu-t">
              Izgara · tek FadeUp
              <span>Öneri: ızgaranın kendisi bir kez sarılı, dördü birlikte geliyor.</span>
            </p>
            <FadeUp key={`izgara-${tur}`}>
              <div className="bbs-fu-g">
                {kartlar.map((c) => {
                  const Icon = DAY_IKON[c.icon] ?? Stamp;
                  return (
                    <article className="bbs-day-k" key={c.t}>
                      <span className="bbs-day-ic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3>{c.t}</h3>
                      <p>{c.s}</p>
                    </article>
                  );
                })}
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="bbs-fu-bar">
          <button type="button" className="bbs-fu-btn" onClick={() => setTur((t) => t + 1)}>
            <RotateCcw size={15} strokeWidth={1.9} aria-hidden="true" />
            Girişi yeniden oynat
          </button>
        </div>
      </div>
    </section>
  );
}
